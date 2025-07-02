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