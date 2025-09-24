from datetime import datetime
from cryptography.hazmat.primitives import hashes, hmac
from json import dumps, loads
from base64 import urlsafe_b64encode, urlsafe_b64decode
import time
import hmac as stdlib_hmac


class JWT:
    def __init__(self, secretKey="superSecretKey"):
        self.secretKey = secretKey.encode("utf-8")

    def b64url_encode(self, data_dict):
        json_bytes = dumps(data_dict, separators=(",", ":")).encode("utf-8")
        return urlsafe_b64encode(json_bytes).rstrip(b"=").decode("utf-8")

    def b64url_decode(self, encoded_str):
        padding = '=' * (-len(encoded_str) % 4)
        return loads(urlsafe_b64decode(encoded_str + padding).decode("utf-8"))

    def createJWT(self, payloadPartials, age=3600):
        header = {"alg": "HS256", "type": "JWT"}
        now = int(time.time())
        payload = {
            **payloadPartials,
            "iat": now,
            "exp": now + age,
        }

        header_encoded = self.b64url_encode(header)
        payload_encoded = self.b64url_encode(payload)
        header_payload = f"{header_encoded}.{payload_encoded}".encode("utf-8")

        h = hmac.HMAC(self.secretKey, hashes.SHA256())
        h.update(header_payload)
        signature = urlsafe_b64encode(h.finalize()).rstrip(b"=").decode("utf-8")

        return f"{header_encoded}.{payload_encoded}.{signature}",age

    def verifyJWT(self, token):
        try:
            header_encoded, payload_encoded, signature_provided = token.split(".")
            header_payload = f"{header_encoded}.{payload_encoded}".encode("utf-8")

            h = hmac.HMAC(self.secretKey, hashes.SHA256())
            h.update(header_payload)
            expected_signature = urlsafe_b64encode(h.finalize()).rstrip(b"=").decode("utf-8")

            if not stdlib_hmac.compare_digest(expected_signature, signature_provided):
                return False, "Invalid signature"

            payload = self.b64url_decode(payload_encoded)
            if int(time.time()) > payload.get("exp", 0):
                return False, "Token expired"

            return True, payload
        except Exception as e:
            return False, f"Invalid token: {e}"