/**
* @description Calcula el checksum de un ticket en base su payload y firma
* @param {string} ticketPayload
* @param {string} signature
* @returns {Promise<string>}
*/
async function calcularChecksum(ticketPayload, signature) {
    const textoBase =
        ticketPayload.slice(10, 20) +
        Buffer.from("RG9uJ3RNZXNzV2l0aE1NUw==", "base64").toString("utf-8") +
        signature.slice(2, 10);
    const datos = Buffer.from(textoBase, "utf16le");
    const sha1 = crypto.createHash("sha1").update(datos).digest();
    const checksumBuffer = sha1.subarray(2, 10);
    const checksum = checksumBuffer.toString("hex").toUpperCase();
    return checksum;
}