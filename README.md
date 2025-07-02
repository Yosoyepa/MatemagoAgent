# 🎩 MateMago - Tutor de Matemáticas con IA

MateMago es una aplicación web que utiliza inteligencia artificial para explicar conceptos matemáticos de manera divertida y visual para niños de 5 a 10 años. La aplicación combina explicaciones personalizadas con visualizaciones interactivas creadas dinámicamente.

## ✨ Características

- 🎭 **Personalidad Mágica**: MateMago actúa como un mago amigable que enseña matemáticas
- 🎨 **Visualizaciones Dinámicas**: Genera gráficos Mermaid personalizados para cada explicación  
- 🌈 **Diseño Atractivo**: Interfaz moderna con identidad visual de "Soft UI"
- 🔧 **Adaptativo**: Ajusta el lenguaje y complejidad según la edad del niño
- 🚀 **Tecnología Moderna**: Backend FastAPI + Frontend React con Vite

## 🏗️ Arquitectura

```
MatemagoAgent/
├── backend/          # API FastAPI + Google Gemini AI
├── frontend/         # React + Vite + Tailwind CSS
├── matemago-style-guide/  # Guía de estilo visual
└── docs/            # Documentación adicional
```

## 🚀 Instalación Rápida

### Prerrequisitos

- **Python 3.8+** para el backend
- **Node.js 16+** para el frontend  
- **API Key de Google Gemini** ([Obtener aquí](https://makersuite.google.com/app/apikey))

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/MatemagoAgent.git
cd MatemagoAgent
```

### 2. Configurar Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
copy .env.example .env
# Edita .env y agrega tu GOOGLE_API_KEY
```

### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install
```

### 4. Ejecutar la Aplicación

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```

🎉 **¡Listo!** Abre tu navegador en `http://localhost:5173`

## 🎮 Uso

1. **Ingresa un concepto matemático** (ej: "suma", "fracciones", "geometría")
2. **Selecciona la edad** del niño (5-10 años)
3. **Haz clic en "¡Enseñar!"**
4. **Disfruta** de la explicación mágica con visualización

## 🎨 Identidad Visual

MateMago utiliza una paleta de colores específica basada en "Soft UI":

- **Primario**: `#6366f1` (Índigo)
- **Secundario**: `#8b5cf6` (Violeta) 
- **Acento**: `#06b6d4` (Cyan)
- **Superficie**: `#f8fafc` (Gris muy claro)
- **Tipografía**: Nunito (redondeada y amigable)

## 🛠️ Desarrollo

### Estructura del Backend

```
backend/
├── app/
│   ├── api/v1/endpoints/    # Endpoints de la API
│   ├── core/               # Configuración y servicios
│   ├── models/             # Modelos Pydantic
│   └── main.py            # Aplicación principal
├── requirements.txt        # Dependencias Python
└── .env.example           # Template de variables
```

### Estructura del Frontend

```
frontend/
├── src/
│   ├── components/        # Componentes React
│   ├── services/          # Cliente API
│   ├── styles/           # Estilos CSS
│   └── App.jsx           # Componente principal
├── package.json          # Dependencias Node.js
└── tailwind.config.js    # Configuración Tailwind
```

### Scripts Útiles

**Backend:**
```bash
# Ejecutar tests
pytest

# Linting
flake8 app/

# Formateo
black app/
```

**Frontend:**
```bash
# Desarrollo
npm run dev

# Build producción  
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 🐛 Solución de Problemas

### Error CORS
- Verifica que el backend esté corriendo en `127.0.0.1:8000`
- Confirma que el frontend esté permitido en `ALLOWED_ORIGINS`

### Error de API Key
- Verifica que `GOOGLE_API_KEY` esté configurada en `.env`
- Asegúrate que la API key sea válida y tenga permisos

### Error de Dependencias
```bash
# Backend
pip install --upgrade -r requirements.txt

# Frontend  
rm -rf node_modules package-lock.json
npm install
```

## 📄 API Documentation

Una vez ejecutando el backend, visita:
- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

### Endpoint Principal

```http
POST /api/v1/tutor/explain
Content-Type: application/json

{
  "concept": "suma",
  "age": 7
}
```

**Respuesta:**
```json
{
  "explanation": "¡Hola, joven aprendiz de mago! ...",
  "visual_type": "mermaid",
  "visual_code": "graph TD; A(🔢 Números) --> B(➕ Suma)"
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👥 Autores

- **Tu Nombre** - *Trabajo inicial* - [TuGitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- Google Gemini AI por el servicio de IA
- React y Vite por el framework frontend
- FastAPI por el framework backend  
- TailwindCSS por el sistema de estilos
- Mermaid por las visualizaciones

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐
