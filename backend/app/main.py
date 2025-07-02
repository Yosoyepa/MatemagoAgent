from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import tutor

app = FastAPI(title="MateMago API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Allow Vite's default dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(tutor.router, prefix="/api/v1/tutor", tags=["tutor"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the MateMago API"}