# MATE-MAGO SCALABLE PROJECT GENERATION PLAN
# Objective: Generate a scalable web application prototype for "MateMago".
# This plan uses a modular structure for both the backend (FastAPI) and frontend (React).

# ====================================================================================================
# PART 1: BACKEND DEVELOPMENT (FastAPI - Modular Structure)
# ====================================================================================================

# ----------------------------------------------------------------------------------------------------
# STEP 1.1: BACKEND PROJECT STRUCTURE
# ----------------------------------------------------------------------------------------------------
# Create the following scalable directory structure inside the `/backend/` folder.

# /backend/
# │
# ├── app/
# │   ├── __init__.py
# │   ├── main.py             # App entry point, creates FastAPI instance
# │   ├── api/
# │   │   ├── __init__.py
# │   │   └── v1/
# │   │       ├── __init__.py
# │   │       └── endpoints/
# │   │           ├── __init__.py
# │   │           └── tutor.py    # Router for the tutor endpoint
# │   ├── core/
# │   │   ├── __init__.py
# │   │   ├── config.py         # Manages settings and environment variables
# │   │   └── services.py       # Business logic (Gemini API interaction)
# │   └── models/
# │       ├── __init__.py
# │       └── tutor.py          # Pydantic models (schemas)
# │
# ├── .env
# └── requirements.txt
#

# ----------------------------------------------------------------------------------------------------
# STEP 1.2: BACKEND DEPENDENCIES (File: /backend/requirements.txt)
# ----------------------------------------------------------------------------------------------------
fastapi
uvicorn[standard]
pydantic
pydantic-settings
python-dotenv
google-generativeai

# ----------------------------------------------------------------------------------------------------
# STEP 1.3: ENVIRONMENT VARIABLES (File: /backend/.env)
# ----------------------------------------------------------------------------------------------------
# Create this file. The API key will be loaded securely.
GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# ----------------------------------------------------------------------------------------------------
# STEP 1.4: CONFIGURATION (File: /backend/app/core/config.py)
# ----------------------------------------------------------------------------------------------------
# Manages application settings using Pydantic for validation.
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    GOOGLE_API_KEY: str
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

# ----------------------------------------------------------------------------------------------------
# STEP 1.5: PYDANTIC MODELS (File: /backend/app/models/tutor.py)
# ----------------------------------------------------------------------------------------------------
# Defines the data structures for API requests and responses.
from pydantic import BaseModel

class QueryRequest(BaseModel):
    concept: str
    age: int

class ExplanationResponse(BaseModel):
    explanation: str
    visual_type: str
    visual_code: str

# ----------------------------------------------------------------------------------------------------
# STEP 1.6: CORE LOGIC / SERVICE (File: /backend/app/core/services.py)
# ----------------------------------------------------------------------------------------------------
# Contains the business logic, isolating the Gemini API interaction.
import google.generativeai as genai
import json
from app.core.config import settings
from app.models.tutor import ExplanationResponse

# Configure the generative AI model
genai.configure(api_key=settings.GOOGLE_API_KEY)

# This is the core instruction set for the AI model.
MATE_MAGO_SYSTEM_PROMPT = """
You are "MateMago", an expert math tutor and graphics programmer for children aged 5-10. Your mission is to provide clear, friendly math explanations accompanied by a dynamically chosen visual aid.

### RULES ###
1.  **Analyze the User's Query**: Understand the mathematical concept and the user's age.
2.  **Adapt Explanation**: Tailor the language, tone, and examples to be perfectly appropriate for the child's age. Be positive, encouraging, and use simple analogies (food, toys, animals).
3.  **Choose the Best Visual Format**: Based on the query, decide which visual format is most effective. Your choices are 'svg', 'mermaid', or 'chartjs'.
    * Use 'svg' for custom creative illustrations and analogies.
    * Use 'mermaid' for processes, flowcharts, or step-by-step instructions.
    * Use 'chartjs' for numerical comparisons, proportions, or data visualization.
4.  **Generate Code**: Create the specific code for the visual format you chose. For 'chartjs', the `visual_code` must be a valid JSON object string.
5.  **Strict JSON Output**: Your entire response MUST be a single, minified JSON object string with no markdown formatting or backticks. It must contain three keys: "explanation", "visual_type", and "visual_code".
"""

def get_tutor_response(concept: str, age: int) -> ExplanationResponse:
    try:
        model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            system_instruction=MATE_MAGO_SYSTEM_PROMPT
        )
        prompt = f"User query: '{concept}', User age: {age}"
        response = model.generate_content(prompt)
        
        # Parse the JSON response from the model
        response_data = json.loads(response.text)
        
        return ExplanationResponse(**response_data)
    except (json.JSONDecodeError, TypeError) as e:
        # Handle cases where the AI response is not valid JSON
        raise ValueError(f"Error decoding AI response: {e}")
    except Exception as e:
        # Handle other potential errors
        raise ConnectionError(f"An error occurred with the Gemini API: {e}")

# ----------------------------------------------------------------------------------------------------
# STEP 1.7: API ROUTER (File: /backend/app/api/v1/endpoints/tutor.py)
# ----------------------------------------------------------------------------------------------------
# Defines the API endpoint for the tutor.
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

# ----------------------------------------------------------------------------------------------------
# STEP 1.8: MAIN APP (File: /backend/app/main.py)
# ----------------------------------------------------------------------------------------------------
# Assembles the app, configures CORS, and includes the routers.
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


# ====================================================================================================
# PART 2: FRONTEND DEVELOPMENT (React + Vite - Component-Based Structure)
# ====================================================================================================

# ----------------------------------------------------------------------------------------------------
# STEP 2.1: FRONTEND PROJECT SETUP
# ----------------------------------------------------------------------------------------------------
# In a terminal, outside the /backend directory, run the following commands:
# 1. `npm create vite@latest frontend -- --template react`
# 2. `cd frontend`
# 3. `npm install`
# 4. `npm install mermaid chart.js`
# This creates a new React project in the `/frontend/` directory.

# ----------------------------------------------------------------------------------------------------
# STEP 2.2: FRONTEND PROJECT STRUCTURE
# ----------------------------------------------------------------------------------------------------
# Vite will create most of this structure. You will create the `components` and `services` directories.
#
# /frontend/
# │
# ├── src/
# │   ├── components/
# │   │   ├── InputForm.jsx
# │   │   ├── ResponseDisplay.jsx
# │   │   └── Visualizer.jsx
# │   ├── services/
# │   │   └── apiClient.js
# │   ├── App.jsx
# │   ├── index.css
# │   └── main.jsx
# ... (other Vite files)
#

# ----------------------------------------------------------------------------------------------------
# STEP 2.3: API CLIENT SERVICE (File: /frontend/src/services/apiClient.js)
# ----------------------------------------------------------------------------------------------------
// Handles all communication with the backend API.
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/tutor';

export const fetchExplanation = async (concept, age) => {
    const response = await fetch(`${API_BASE_URL}/explain`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept, age }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An unknown error occurred.');
    }

    return response.json();
};

# ----------------------------------------------------------------------------------------------------
# STEP 2.4: INPUT FORM COMPONENT (File: /frontend/src/components/InputForm.jsx)
# ----------------------------------------------------------------------------------------------------
import React, { useState } from 'react';

export const InputForm = ({ onQuery, isLoading }) => {
    const [concept, setConcept] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!concept || !age) {
            alert('Por favor, completa ambos campos.');
            return;
        }
        onQuery(concept, age);
    };

    return (
        <form onSubmit={handleSubmit} className="input-area">
            <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="¿Qué quieres aprender hoy?"
                disabled={isLoading}
            />
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="¿Cuántos años tienes?"
                min="5"
                max="10"
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Pensando...' : 'Preguntar a MateMago'}
            </button>
        </form>
    );
};

# ----------------------------------------------------------------------------------------------------
# STEP 2.5: VISUALIZER COMPONENT (File: /frontend/src/components/Visualizer.jsx)
# ----------------------------------------------------------------------------------------------------
import React, { useEffect, useRef, memo } from 'react';
import mermaid from 'mermaid';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

mermaid.initialize({ startOnLoad: false, theme: 'base', themeVariables: { primaryColor: '#706fd3' } });

const Visualizer = ({ type, code }) => {
    const visualRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!visualRef.current) return;
        
        // Clean up previous visual
        visualRef.current.innerHTML = '';
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }

        const renderVisual = async () => {
            switch (type) {
                case 'svg':
                    visualRef.current.innerHTML = code;
                    break;
                case 'mermaid':
                    try {
                        const { svg } = await mermaid.render('mermaid-graph', code);
                        visualRef.current.innerHTML = svg;
                    } catch (e) {
                        console.error('Mermaid render error:', e);
                        visualRef.current.innerText = 'Error al dibujar el diagrama.';
                    }
                    break;
                case 'chartjs':
                    try {
                        const canvas = document.createElement('canvas');
                        visualRef.current.appendChild(canvas);
                        const config = JSON.parse(code);
                        chartRef.current = new Chart(canvas.getContext('2d'), config);
                    } catch (e) {
                        console.error('Chart.js render error:', e);
                        visualRef.current.innerText = 'Error al dibujar la gráfica.';
                    }
                    break;
                default:
                    visualRef.current.innerText = 'Visual no disponible.';
            }
        };

        renderVisual();
    }, [type, code]);

    return <div ref={visualRef} className="visual-content"></div>;
};

export default memo(Visualizer);

# ----------------------------------------------------------------------------------------------------
# STEP 2.6: RESPONSE DISPLAY COMPONENT (File: /frontend/src/components/ResponseDisplay.jsx)
# ----------------------------------------------------------------------------------------------------
import React from 'react';
import Visualizer from './Visualizer';

export const ResponseDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div id="response-area">
            <div className="response-box">
                <h2>La Explicación Mágica</h2>
                <p>{data.explanation}</p>
            </div>
            <div className="response-box">
                <h2>El Dibujo Mágico</h2>
                <Visualizer type={data.visual_type} code={data.visual_code} />
            </div>
        </div>
    );
};


# ----------------------------------------------------------------------------------------------------
# STEP 2.7: MAIN APP COMPONENT (File: /frontend/src/App.jsx)
# ----------------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { fetchExplanation } from './services/apiClient';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleQuery = async (concept, age) => {
        setIsLoading(true);
        setError(null);
        setResponseData(null);

        try {
            const data = await fetchExplanation(concept, age);
            setResponseData(data);
        } catch (err) {
            setError(err.message);
            alert(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>✨ MateMago ✨</h1>
                <p>Tu ayudante mágico para las matemáticas</p>
            </header>
            <main>
                <InputForm onQuery={handleQuery} isLoading={isLoading} />
                {isLoading && <div className="loading-spinner"></div>}
                {error && <p className="error-message">Hubo un problema: {error}</p>}
                <ResponseDisplay data={responseData} />
            </main>
        </div>
    );
}

export default App;

# ----------------------------------------------------------------------------------------------------
# STEP 2.8: STYLING (File: /frontend/src/index.css)
# ----------------------------------------------------------------------------------------------------
# Replace the content of index.css with the styles from the previous plan (STEP 5). They are suitable.


# ====================================================================================================
# PART 3: EXECUTION INSTRUCTIONS
# ====================================================================================================
# 1.  **Backend Setup**:
#     - Navigate to the `/backend` directory.
#     - Run `pip install -r requirements.txt`.
#     - Run `uvicorn app.main:app --reload`. The backend will be running on `http://127.0.0.1:8000`.
# 2.  **Frontend Setup**:
#     - Open a new terminal and navigate to the `/frontend` directory.
#     - Run `npm install` if you haven't already.
#     - Run `npm run dev`. The frontend will be running on `http://localhost:5173`.
# 3.  **Usage**:
#     - Open `http://localhost:5173` in your browser to use the application.

# END OF PLAN