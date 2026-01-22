import sys
import os
from datetime import datetime, timedelta

# Add path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from jose import jwt, JWTError
from app.core.security import SECRET_KEY, ALGORITHM, create_access_token

def debug_jwt():
    print(f"SECRET_KEY used: {SECRET_KEY}")
    print(f"ALGORITHM used: {ALGORITHM}")

    # 1. Create a token
    data = {"sub": 2} # simulating user id 2
    token = create_access_token(data)
    print(f"Generated Token: {token}")

    # 2. Decode the token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Decoded Payload: {payload}")
        user_id = payload.get("sub")
        print(f"User ID from payload: {user_id} (type: {type(user_id)})")
    except JWTError as e:
        print(f"ERROR Decoding token: {e}")
    except Exception as e:
        print(f"General Error: {e}")

if __name__ == "__main__":
    debug_jwt()
