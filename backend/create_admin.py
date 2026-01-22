import sys
import os

# Add the current directory to sys.path so we can import from app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.core.security import hash_password

def create_admin_user():
    db = SessionLocal()
    try:
        email = "admin@example.com"
        password = "adminpassword"
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"User {email} already exists.")
            return

        new_user = User(
            email=email,
            hashed_password=hash_password(password),
            role=UserRole.ADMIN
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print(f"Admin user created successfully:")
        print(f"Email: {email}")
        print(f"Password: {password}")
        
    except Exception as e:
        print(f"Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user()
