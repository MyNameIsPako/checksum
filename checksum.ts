/**
 * @description Calcula el checksum de un ticket en base a su payload y firma.
 * @param ticketPayload - El contenido del ticket.
 * @param signature - La firma del ticket.
 * @returns El checksum generado.
 */
export async function calcularChecksum(ticketPayload: string, signature: string): Promise<string> {
    const textoBase: string =
        ticketPayload.slice(10, 20) +
        Buffer.from("RG9uJ3RNZXNzV2l0aE1NUw==", "base64").toString("utf-8") +
        signature.slice(2, 10);

    const datos: Buffer = Buffer.from(textoBase, "utf16le");
    const sha1: Buffer = crypto.createHash("sha1").update(datos).digest();
    const checksumBuffer: Buffer = sha1.subarray(2, 10);
    const checksum: string = checksumBuffer.toString("hex").toUpperCase();
    
    return checksum;
}
