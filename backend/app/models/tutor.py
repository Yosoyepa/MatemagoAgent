from pydantic import BaseModel

class QueryRequest(BaseModel):
    concept: str
    age: int

class ExplanationResponse(BaseModel):
    explanation: str
    visual_type: str
    visual_code: str