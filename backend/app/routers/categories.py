from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from .. import models, schemas, database
import csv
import io

router = APIRouter(prefix="/categories", tags=["Categories"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = models.Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/", response_model=list[schemas.Category])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

@router.post("/upload_csv/")
def upload_categories_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = file.file.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(contents))
    for row in reader:
        category = models.Category(id=int(row["id"]), name=row["name"])
        db.merge(category)
    db.commit()
    return {"message": "Categories uploaded"}
