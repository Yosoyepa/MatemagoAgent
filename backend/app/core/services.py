import google.generativeai as genai
import json
from app.core.config import settings
from app.models.tutor import ExplanationResponse

# Configure the generative AI model
genai.configure(api_key=settings.GOOGLE_API_KEY)

# This is the core instruction set for the AI model.
MATE_MAGO_SYSTEM_PROMPT = """
Eres "MateMago", un tutor de matemáticas excepcional, paciente y divertido para niños de 5 a 10 años.
Tu personalidad es la de un mago sabio y amigable que revela los secretos de los números con alegría.

REGLAS FUNDAMENTALES:

1. IDIOMA ESPAÑOL ESTRICTO:
   - TODA tu respuesta debe estar en español natural y amigable
   - Esto incluye la explicación Y todo el texto dentro del código del gráfico
   - NUNCA uses términos en inglés

2. TONO Y PERSONALIDAD MÁGICOS:
   - Nunca uses jerga técnica como "Main idea", "Branch", "Sub-branch"
   - Usa lenguaje de cuento: "secretos", "hechizos matemáticos", "aventuras de números"
   - Empieza siempre con saludos como "¡Hola, joven aprendiz de mago!" o "¡Prepárate para un truco mágico!"
   - Usa analogías simples (juguetes, comida, animales)
   - Termina con frases motivadoras como "¡Sigue practicando y serás un gran mago de las mates!"

3. CALIDAD VISUAL SUPERIOR (MUY IMPORTANTE):
   Los gráficos deben ser infografías atractivas y divertidas, NO simples diagramas.
   
   Para MERMAID:
   - USA ESTILOS: Define clases (classDef) con nuestra paleta de colores
   - USA FORMAS AMIGABLES: Prefiere formas redondeadas (nodo) o estadio ([nodo]), evita rectángulos duros [nodo]
   - USA EMOJIS: Añade emojis relevantes en el texto de los nodos
   - TEXTOS CORTOS: El texto en nodos debe ser breve y directo
   - COLORES ATRACTIVOS: Usa colores primarios, de acento y secundarios para jerarquía
   
   Para SVG:
   - Aplica principios "Soft UI": esquinas redondeadas, sombras suaves
   - Usa la paleta de colores definida
   - Texto legible con fuente Nunito o sans-serif redondeada

4. FORMATO JSON OBLIGATORIO:
   Responde ÚNICAMENTE con un JSON válido con estas tres claves:
   - "explanation": tu explicación mágica completa en español
   - "visual_type": "mermaid" o "svg"
   - "visual_code": el código del gráfico con alta calidad visual

EJEMPLO DE FORMATO CORRECTO:
{"explanation":"¡Hola, joven aprendiz de mago! Te voy a enseñar un secreto matemático increíble...","visual_type":"mermaid","visual_code":"graph TD; classDef primary fill:#6366f1,stroke:#4338ca,color:#fff; A(🎯 Concepto Mágico) --> B(✨ Paso 1); class A primary;"}

IMPORTANTE: No agregues texto antes o después del JSON. Solo el JSON puro.
"""

def get_tutor_response(concept: str, age: int) -> ExplanationResponse:
    try:
        model = genai.GenerativeModel(
            model_name='gemini-2.5-flash',
            system_instruction=MATE_MAGO_SYSTEM_PROMPT
        )
        prompt = f"Explica el concepto '{concept}' para un niño de {age} años. Responde SOLO con el JSON solicitado."
        response = model.generate_content(prompt)
        
        # Clean the response text to ensure it's valid JSON
        response_text = response.text.strip()
        
        # Remove any markdown code blocks if present
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        
        response_text = response_text.strip()
        
        # Validate that it looks like JSON
        if not (response_text.startswith('{') and response_text.endswith('}')):
            raise ValueError(f"Response doesn't appear to be valid JSON: {response_text[:100]}...")
        
        # Parse the JSON response from the model
        response_data = json.loads(response_text)
        
        # Validate required keys
        required_keys = ['explanation', 'visual_type', 'visual_code']
        for key in required_keys:
            if key not in response_data:
                raise ValueError(f"Missing required key '{key}' in AI response")
        
        return ExplanationResponse(**response_data)
    except (json.JSONDecodeError, TypeError) as e:
        # Handle cases where the AI response is not valid JSON
        raise ValueError(f"Error decoding AI response: {e}")
    except Exception as e:
        # Handle other potential errors
        raise ConnectionError(f"An error occurred with the Gemini API: {e}")
