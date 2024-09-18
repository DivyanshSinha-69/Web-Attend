const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const md = require("machine-digest");
const utils = require("./license/utils"); // Adjust the path if needed
const config = require("./license/config"); // Adjust the path if needed
const logger = require("./license/logger"); // Adjust the path if needed
const cors = require('cors');

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Define paths
const keyPath = path.join(__dirname, 'key.txt');
const licenseServer = "http://localhost:3002/v1/license";
const publicKeyPath = path.join(__dirname, "license", "sample.public.pem");

let PublicKey;
// Initialize PublicKey
try {
    const publicKeyBuffer = fs.readFileSync(publicKeyPath);
    PublicKey = publicKeyBuffer.toString("utf8");
    logger.info("Public key loaded successfully.");
} catch (err) {
    logger.error(`Failed to read public key file: ${err.message}`);
    process.exit(1); // Exit process if reading fails
}

// Function to check license
const checkLicense = async (licenseKey) => {
    logger.info("Verifying license");

    const machineId = md.get().digest;
    let _license;

    try {
        const params = {
            method: "POST",
            body: JSON.stringify({ id: machineId, key: licenseKey }),
            headers: { "Content-Type": "application/json" },
        };

        logger.info(`Request to license server: ${JSON.stringify(params)}`);
        const res = await fetch(licenseServer, params);
        const resData = await res.json();
        logger.info(`Response from license server: ${JSON.stringify(resData)}`);

        if (resData.status !== 0) {
            logger.error(`License server returned an error. Status code: ${resData.status}`);
            throw new Error(`License server error. Status code: ${resData.status}`);
        }
        _license = resData.license;
    } catch (fetchErr) {
        logger.error(`Failed to fetch license from server: ${fetchErr.message}`);
        throw new Error(`License server fetch error: ${fetchErr.message}`);
    }

    try {
        const buf = Buffer.from(_license, "hex");
        const decryptedLicense = utils.crypt(PublicKey, buf, false).toString();
        const license = JSON.parse(decryptedLicense);

        logger.debug(`Decrypted license: ${JSON.stringify(license)}`);

        const isValid = license.key === licenseKey &&
                        license.machine === machineId &&
                        license.identity === config.identity &&
                        (license.meta.persist || 
                          (license.meta.startDate < Date.now() && 
                          license.meta.endDate > Date.now()));

        logger.debug(`License validation result: ${isValid}`);
        return isValid;
    } catch (decryptErr) {
        logger.error(`Failed to decrypt or validate license: ${decryptErr.message}`);
        throw new Error(`License decryption/validation error: ${decryptErr.message}`);
    }
};

// Check license on server startup
const validateKeyOnStartup = async () => {
    if (fs.existsSync(keyPath)) {
        try {
            const key = fs.readFileSync(keyPath, 'utf8');
            logger.info("Key file found. Validating...");
            const isValid = await checkLicense(key);
            return isValid;
        } catch (error) {
            logger.error(`Failed to validate license on startup: ${error.message}`);
            return false;
        }
    } else {
        logger.info("Key file does not exist.");
        return false;
    }
};

// Routes
app.get("/license/checkkey", async (req, res) => {
    try {
        const isValid = await validateKeyOnStartup();
        res.json({ valid: isValid });
    } catch (error) {
        logger.error(`Failed to check key on startup: ${error.message}`);
        res.status(500).json({ valid: false });
    }
});

app.post("/license/validatekey", async (req, res) => {
    const { key } = req.body;
    if (!key) {
        return res.status(400).json({ success: false, message: 'No key provided' });
    }

    fs.writeFile(keyPath, key, async (err) => {
        if (err) {
            logger.error(`Failed to save key: ${err.message}`);
            return res.status(500).json({ success: false, message: 'Failed to save key' });
        }

        try {
            const isValid = await checkLicense(key);
            if (isValid) {
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'License validation failed' });
            }
        } catch (error) {
            logger.error(`License validation error: ${error.message}`);
            res.status(500).json({ success: false, message: 'License validation error' });
        }
    });
});

// Start Server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});