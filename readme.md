# LabGrown

LabGrown is a collection of **hand-crafted, reusable modules** that are built from scratch to replace heavy or restrictive third-party libraries.  
This repo is where I experiment, refine, and maintain lightweight alternatives for common project needs.

---

## Repository Structure

```

LabGrown/
└── Auth/
  └── JWT.py   # Custom implementation of JWT

```

- **Auth/JWT.py** – A simplified and reusable implementation of JSON Web Tokens (JWT).  
  Designed for projects where full-blown libraries are overkill, or where more control and customizability are required.

---

## JWT Module

### Features

- Encode and decode JWTs without external dependencies.
- Support for customizable headers, payloads, and signing algorithms.
- Built with simplicity and clarity in mind for learning and extension.
- Drop-in ready for new projects – just import and use.

### Example Usage

```python
from Auth.JWT import JWT
import time

# Initialize with a secret key
jwt = JWT(secretKey="super-secret-key")

# --- Create a token ---
token, ttl = jwt.createJWT(
    payloadPartials={"user_id": 123, "role": "admin"},
    age=5  # token valid for 5 seconds
)

print("Generated Token:", token)
print("Token TTL (seconds):", ttl)

# --- Verify the token immediately ---
is_valid, data = jwt.verifyJWT(token)
print("Immediate Verification:", is_valid, data)

# --- Wait for token to expire ---
time.sleep(6)

# --- Verify again after expiration ---
is_valid, data = jwt.verifyJWT(token)
print("Post-Expiration Verification:", is_valid, data)
```

---

## Vision

LabGrown is intended to grow into a **toolkit of DIY modules** for:

- Authentication systems (JWT, SWT, custom token formats).
- Application primitives (plans, configs, utilities).
- Other building blocks I rewrite for clarity, learning, and reusability.

Every component here follows the same philosophy:

- **Simplicity over complexity**
- **Control over black boxes**
- **Reusability across projects**

---

## Future Plans

- Add `SWT.py` (Simple Web Tokens).

---

## Contributions

This project is experimental but evolving. Contributions are welcome and appreciated—whether it’s improving code quality, adding new features, writing tests, or enhancing documentation. Feel free to fork the repo, open issues, or submit pull requests.

## ⚖️ License

This project is personal and experimental.
You are free to read, learn, and adapt the code at your own risk.
