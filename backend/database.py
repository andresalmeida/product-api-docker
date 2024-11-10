from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cambiar 'localhost' por 'db' (el nombre del servicio en docker-compose.yml)
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@db:5432/productos_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
