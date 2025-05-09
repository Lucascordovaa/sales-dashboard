from fastapi import FastAPI
from .database import Base, engine
from .routers import products, categories, sales
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(sales.router)

@app.get("/")
def root():
    return {"mensagem": "API Vendas"}
