from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from sqlalchemy.orm import Session
from .. import models, schemas, database
from datetime import datetime, date
import csv
import io

router = APIRouter(prefix="/sales", tags=["Sales"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Sale)
def create_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    db_sale = models.Sale(**sale.model_dump())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

@router.get("/", response_model=list[schemas.Sale])
def list_sales(db: Session = Depends(get_db)):
    return db.query(models.Sale).all()

@router.put("/{sale_id}", response_model=schemas.Sale)
def update_sale(sale_id: int, sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    db_sale = db.query(models.Sale).filter(models.Sale.id == sale_id).first()
    if not db_sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    for attr, value in sale.model_dump().items():
        setattr(db_sale, attr, value)
    db.commit()
    db.refresh(db_sale)
    return db_sale

@router.get("/by_month/", response_model=list[schemas.Sale])
def get_sales_by_month(month: int = Query(..., ge=1, le=12), year: int = Query(...), db: Session = Depends(get_db)):
    return db.query(models.Sale).filter(
        models.Sale.date >= date(year, month, 1),
        models.Sale.date < date(year + (month // 12), ((month % 12) + 1), 1)
    ).all()

@router.post("/upload_csv/")
def upload_sales_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = file.file.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(contents))
    for row in reader:
        sale = models.Sale(
            product_id=int(row["product_id"]),
            quantity=int(row["quantity"]),
            total_price=float(row["total_price"]),
            date=datetime.strptime(row["date"], "%Y-%m-%d").date(),
        )
        db.add(sale)
    db.commit()
    return {"message": "Sales uploaded"}
