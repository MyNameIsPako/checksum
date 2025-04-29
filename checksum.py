def calcular_checksum(ticket_payload: str, signature: str) -> str:
    texto_base = (
        ticket_payload[10:20] +
        base64.b64decode("RG9uJ3RNZXNzV2l0aE1NUw==").decode("utf-8") +
        signature[2:10]
    )
    
    datos = texto_base.encode("utf-16le")
    sha1 = hashlib.sha1(datos).digest()
    checksum_buffer = sha1[2:10]
    checksum = checksum_buffer.hex().upper()
    
    return checksum
