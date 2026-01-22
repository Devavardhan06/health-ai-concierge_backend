from sqlalchemy import text
from app.db.session import engine

def migrate():
    with engine.connect() as connection:
        with connection.begin():
            try:
                print("Adding confidence_score column...")
                connection.execute(text("ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS confidence_score FLOAT;"))
                print("Adding reasoning column...")
                connection.execute(text("ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS reasoning TEXT;"))
                print("Migration successful!")
            except Exception as e:
                print(f"Migration failed: {e}")

if __name__ == "__main__":
    migrate()
