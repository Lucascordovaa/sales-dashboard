from pydantic import BaseModel
from datetime import date

# Category
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    model_config = {"from_attributes": True}

# Product
class ProductBase(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category_id: int
    brand: str
    sales_quantity: int = 0
    profit: float = 0.0
    category_name: str = ""

    class Config:
        orm_mode = True

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category_id: int
    brand: str

class Product(ProductBase):
    id: int  # Returned by DB
    model_config = {"from_attributes": True}

# Sale
class SaleBase(BaseModel):
    product_id: int
    quantity: int
    total_price: float
    date: date

class SaleCreate(SaleBase):
    pass

class Sale(SaleBase):
    id: int
    model_config = {"from_attributes": True}
