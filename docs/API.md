# 📡 MateMago API Documentation

## Visión General

La API de MateMago está construida con FastAPI y proporciona endpoints para generar explicaciones matemáticas personalizadas con visualizaciones.

## Base URL

```
http://127.0.0.1:8000/api/v1
```

## Autenticación

Actualmente la API no requiere autenticación. En producción se recomienda implementar API keys o OAuth2.

## Endpoints

### POST /tutor/explain

Genera una explicación personalizada de un concepto matemático.

#### Request

```http
POST /api/v1/tutor/explain
Content-Type: application/json

{
  "concept": "string",
  "age": integer
}
```

#### Parameters

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `concept` | string | ✅ | Concepto matemático a explicar |
| `age` | integer | ✅ | Edad del niño (5-10 años) |

#### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "explanation": "string",
  "visual_type": "mermaid" | "svg", 
  "visual_code": "string"
}
```

#### Response Fields

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `explanation` | string | Explicación mágica en español |
| `visual_type` | string | Tipo de visualización ("mermaid" o "svg") |
| `visual_code` | string | Código de la visualización |

#### Example

**Request:**
```json
{
  "concept": "suma de fracciones",
  "age": 8
}
```

**Response:**
```json
{
  "explanation": "¡Hola, joven aprendiz de mago! Hoy vamos a aprender un hechizo súper especial: ¡cómo sumar fracciones! Imagina que las fracciones son como piezas de pizza...",
  "visual_type": "mermaid",
  "visual_code": "graph TD; classDef primary fill:#6366f1,stroke:#4338ca,color:#fff; A(🍕 Pizza Completa) --> B(1/4 + 1/4); B --> C(2/4 = 1/2); class A,C primary;"
}
```

## Error Responses

### 400 Bad Request

Datos de entrada inválidos.

```json
{
  "detail": "Validation error message"
}
```

### 500 Internal Server Error

Error del servidor o servicio de IA.

```json
{
  "detail": "Error message"
}
```

### Códigos de Error Específicos

| Código | Descripción |
|--------|-------------|
| `INVALID_AGE` | Edad fuera del rango 5-10 años |
| `EMPTY_CONCEPT` | Concepto vacío o inválido |
| `AI_SERVICE_ERROR` | Error en el servicio de Google Gemini |
| `JSON_DECODE_ERROR` | Error al procesar respuesta de IA |

## Rate Limits

- **Desarrollo**: Sin límites
- **Producción**: Se recomienda implementar límites por IP/usuario

## Modelos de Datos

### ExplanationRequest

```python
class ExplanationRequest(BaseModel):
    concept: str = Field(..., min_length=1, max_length=200)
    age: int = Field(..., ge=5, le=10)
```

### ExplanationResponse

```python
class ExplanationResponse(BaseModel):
    explanation: str
    visual_type: Literal["mermaid", "svg"]
    visual_code: str
```

## Integración Frontend

### JavaScript/React Example

```javascript
const apiClient = {
  baseURL: 'http://127.0.0.1:8000/api/v1',
  
  async explainConcept(concept, age) {
    const response = await fetch(`${this.baseURL}/tutor/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ concept, age })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
};

// Uso
try {
  const result = await apiClient.explainConcept('multiplicación', 7);
  console.log(result.explanation);
} catch (error) {
  console.error('Error:', error);
}
```

## Configuración CORS

La API está configurada para permitir requests desde:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (Vite alternate port)

Para producción, ajustar en `app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Monitoreo y Logs

### Health Check

```http
GET /
```

Responde con información básica de la API.

### Métricas

- Logs automáticos de FastAPI
- Tiempo de respuesta de requests
- Errores de IA service

## Troubleshooting

### Error "Invalid response from AI service"

**Causa**: Google Gemini no devuelve JSON válido.

**Solución**:
1. Verificar API key
2. Revisar quota de API
3. Simplificar el prompt

### Error CORS

**Causa**: Frontend no permitido en CORS.

**Solución**:
```python
# En app/main.py
allow_origins=["http://localhost:PUERTO_FRONTEND"]
```

### Slow Response Times

**Causa**: Google Gemini puede ser lento.

**Solución**:
- Implementar timeout
- Agregar loading states en frontend
- Considerar caching de respuestas comunes
