from fastapi import APIRouter, HTTPException
from app.models.tutor import QueryRequest, ExplanationResponse
from app.core.services import get_tutor_response

router = APIRouter()

@router.post("/explain", response_model=ExplanationResponse)
async def explain_concept(request: QueryRequest):
    """
    Receives a math concept and age, and returns a tailored explanation
    with a dynamically generated visual.
    """
    try:
        response = get_tutor_response(concept=request.concept, age=request.age)
        return response
    except ValueError as e:
        raise HTTPException(status_code=502, detail=f"Bad Gateway: Invalid response from AI service. {e}")
    except ConnectionError as e:
        raise HTTPException(status_code=504, detail=f"Gateway Timeout: Could not connect to AI service. {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An internal server error occurred. {e}")