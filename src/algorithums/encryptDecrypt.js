const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);
const key = loadKey();

function loadKey() {
  return Buffer.from("HsA4VwRroJU/R9lWryEWGPM8aAMgCGaqaHbP7Sy24zA", "base64");
}

const cipheriv = async (message) => {
  const plaintext = Buffer.from(message, "utf8");
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

  return ciphertext;
};

const decipheriv = async (ciphertext) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const plaintextBob = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  const decryptedText = plaintextBob.toString("utf8");

  return decryptedText;
};

module.exports = { cipheriv, decipheriv };
