from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from .. import models, schemas, database
import csv
import io

router = APIRouter(prefix="/products", tags=["Products"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/", response_model=list[schemas.Product])
def list_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    product_list = []
    for p in products:
        total_qty = sum(s.quantity for s in p.sales)
        profit = round(total_qty * p.price, 2)
        p_data = schemas.Product.model_validate(p).model_dump()
        p_data["sales_quantity"] = total_qty
        p_data["profit"] = profit
        p_data["category_name"] = p.category.name if p.category else "Uncategorized"
        product_list.append(p_data)
    return product_list

@router.post("/upload_csv/")
def upload_products_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = file.file.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(contents))
    for row in reader:
        product = models.Product(
            id=int(row["id"]),
            name=row["name"],
            description=row["description"],
            price=float(row["price"]),
            category_id=int(row["category_id"]),
            brand=row["brand"]
        )
        db.merge(product)
    db.commit()
    return {"message": "Products uploaded"}
