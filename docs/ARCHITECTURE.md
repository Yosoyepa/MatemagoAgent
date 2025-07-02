# 🏗️ Arquitectura de MateMago

[![GitHub Issues](https://img.shields.io/github/issues/yourusername/MatemagoAgent)](https://github.com/yourusername/MatemagoAgent/issues)
[![GitHub License](https://img.shields.io/github/license/yourusername/MatemagoAgent)](https://github.com/yourusername/MatemagoAgent/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/MatemagoAgent)](https://github.com/yourusername/MatemagoAgent/stargazers)

## 🎯 Visión General

MateMago es una plataforma educativa que utiliza inteligencia artificial para enseñar matemáticas a niños de 5 a 10 años de manera visual e interactiva. La arquitectura está diseñada para ser escalable, mantenible y fácil de desplegar.

## 🏛️ Diagrama de Arquitectura del Sistema

```mermaid
graph TB
    %% Frontend Layer
    subgraph "🎨 Frontend (React + Vite)"
        UI["🖥️ Interfaz de Usuario"] 
        Components["🧩 Componentes React"]
        Visualizer["📊 Sistema de Visualización"]
        State["🔄 Gestión de Estado"]
    end

    %% Backend Layer  
    subgraph "⚙️ Backend (FastAPI + Python)"
        API["🚀 API REST"]
        Services["🧠 Servicios de Negocio"]
        AICore["🤖 Motor de IA (Gemini)"]
        Models["📋 Modelos de Datos"]
    end

    %% External Services
    subgraph "☁️ Servicios Externos"
        Gemini["💎 Google Gemini API"]
        Storage["💾 Almacenamiento"]
    end

    %% Data Flow
    UI --> API
    Components --> Visualizer
    Visualizer --> |"Mermaid, Chart.js, SVG"| UI
    
    API --> Services
    Services --> AICore
    AICore --> Gemini
    
    Services --> Models
    Models --> Storage
    
    %% Response Flow
    Gemini --> AICore
    AICore --> Services
    Services --> API
    API --> UI
    
    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef external fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef data fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#000
    
    class UI,Components,Visualizer,State frontend
    class API,Services,AICore,Models backend
    class Gemini,Storage external
```

## 🏗️ Arquitectura Detallada por Capas

### 📱 Frontend - Capa de Presentación

```mermaid
graph LR
    subgraph "🎨 Componentes UI"
        App["🏠 App.jsx"]
        Chat["💬 ChatInterface.jsx"]
        Response["📄 ResponseDisplay.jsx"]
        Visual["🎭 Visualizer.jsx"]
    end
    
    subgraph "🛠️ Utilidades"
        API["🌐 apiClient.js"]
        Utils["⚡ utils.js"]
    end
    
    subgraph "🎨 Sistemas de Visualización"
        Mermaid["📊 Mermaid Diagrams"]
        Chart["📈 Chart.js"]
        SVG["🖼️ SVG Graphics"]
    end
    
    App --> Chat
    Chat --> Response
    Response --> Visual
    Visual --> Mermaid
    Visual --> Chart
    Visual --> SVG
    
    Chat --> API
    API --> Utils
    
    classDef component fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    classDef utility fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    classDef visual fill:#ffcdd2,stroke:#d32f2f,stroke-width:2px
    
    class App,Chat,Response,Visual component
    class API,Utils utility
    class Mermaid,Chart,SVG visual
```

### ⚙️ Backend - Capa de Lógica de Negocio

```mermaid
graph TB
    subgraph "🚀 API Layer"
        FastAPI["⚡ FastAPI Application"]
        Endpoints["🔗 Endpoints Router"]
        Middleware["🛡️ CORS & Security"]
    end
    
    subgraph "🧠 Service Layer"
        TutorService["👨‍🏫 Tutor Service"]
        AIService["🤖 AI Service"]
        ValidationService["✅ Validation Service"]
    end
    
    subgraph "📊 Data Layer"
        Models["📋 Pydantic Models"]
        Config["⚙️ Configuration"]
    end
    
    FastAPI --> Endpoints
    Endpoints --> Middleware
    Endpoints --> TutorService
    TutorService --> AIService
    TutorService --> ValidationService
    AIService --> Models
    ValidationService --> Models
    Models --> Config
    
    classDef api fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    classDef service fill:#e1f5fe,stroke:#0277bd,stroke-width:2px  
    classDef data fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class FastAPI,Endpoints,Middleware api
    class TutorService,AIService,ValidationService service
    class Models,Config data
```

## 🔄 Flujo de Datos Principal

```mermaid
sequenceDiagram
    participant U as 👶 Usuario (Niño)
    participant F as 🎨 Frontend
    participant A as ⚙️ API Backend
    participant G as 💎 Gemini AI
    
    U->>F: 1. Escribe pregunta matemática
    F->>A: 2. POST /api/v1/tutor/explain
    Note over A: Valida entrada y edad
    A->>G: 3. Solicita explicación personalizada
    Note over G: Genera contenido educativo
    G->>A: 4. Respuesta con explicación + visual
    Note over A: Valida y procesa respuesta
    A->>F: 5. JSON con explanation + visual_code
    Note over F: Renderiza visualización
    F->>U: 6. Muestra explicación interactiva
    
    Note over U,G: 🔄 Proceso completo: ~2-3 segundos
```

## 🎨 Sistema de Visualización

```mermaid
graph TD
    Input["📝 Código de Visual"] --> Decision{"🤔 Tipo de Visual"}
    
    Decision -->|mermaid| Mermaid["📊 Mermaid.js"]
    Decision -->|chartjs| Chart["📈 Chart.js"]
    Decision -->|svg| SVG["🖼️ SVG Nativo"]
    
    Mermaid --> Clean["🧹 Limpieza de Sintaxis"]
    Clean --> Render1["🎨 Renderizado Mermaid"]
    
    Chart --> Parse["📋 Parse JSON"]
    Parse --> Theme["🎭 Aplicar Tema MateMago"]
    Theme --> Render2["📊 Renderizado Chart"]
    
    SVG --> Validate["✅ Validación SVG"]
    Validate --> Style["💄 Aplicar Estilos"]
    Style --> Render3["🖼️ Renderizado SVG"]
    
    Render1 --> Output["✨ Visualización Final"]
    Render2 --> Output
    Render3 --> Output
    
    classDef input fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef process fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    classDef output fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    class Input input
    class Decision,Clean,Parse,Theme,Validate,Style process
    class Render1,Render2,Render3,Output output
```

## 📦 Estructura de Directorios

```
MatemagoAgent/
├── 📁 frontend/                 # Aplicación React
│   ├── 📁 src/
│   │   ├── 📁 components/       # Componentes reutilizables
│   │   ├── 📁 services/         # Clientes API
│   │   └── 📁 styles/           # Estilos Tailwind
│   ├── 📄 package.json
│   └── 📄 vite.config.js
├── 📁 backend/                  # API FastAPI
│   ├── 📁 app/
│   │   ├── 📁 api/              # Endpoints
│   │   ├── 📁 core/             # Servicios principales
│   │   ├── 📁 models/           # Modelos de datos
│   │   └── 📄 main.py
│   └── 📄 requirements.txt
├── 📁 docs/                     # Documentación
└── 📄 README.md
```

## 🚀 Tecnologías Principales

| Categoría | Tecnología | Propósito |
|-----------|------------|----------|
| 🎨 **Frontend** | React 18 + Vite | Framework UI moderno y rápido |
| 🎭 **Estilos** | Tailwind CSS | Sistema de diseño utility-first |
| 📊 **Visualización** | Mermaid.js | Diagramas y mapas conceptuales |
| 📈 **Gráficos** | Chart.js | Gráficos estadísticos interactivos |
| ⚙️ **Backend** | FastAPI + Python | API REST de alto rendimiento |
| 🤖 **IA** | Google Gemini 2.5 | Generación de contenido educativo |
| 🌐 **HTTP** | Axios | Cliente HTTP para comunicación |
| ✅ **Validación** | Pydantic | Validación de datos en Python |

## 📊 Métricas y Rendimiento

```mermaid
graph LR
    subgraph "📈 Métricas Frontend"
        Load["⏱️ Tiempo de Carga < 2s"]
        FCP["🎨 First Contentful Paint < 1.5s"]
        Interactive["🖱️ Time to Interactive < 3s"]
    end
    
    subgraph "⚡ Métricas Backend"
        Response["📊 Tiempo Respuesta < 500ms"]
        AI["🤖 Respuesta IA < 3s"]
        Throughput["🚀 Throughput > 100 req/s"]
    end
    
    classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backend fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    
    class Load,FCP,Interactive frontend
    class Response,AI,Throughput backend
```

## 🔒 Consideraciones de Seguridad

- **🛡️ CORS**: Configurado para permitir solo dominios autorizados
- **🔑 API Keys**: Almacenadas en variables de entorno
- **✅ Validación**: Todas las entradas son validadas con Pydantic
- **🚫 Rate Limiting**: Protección contra abuso de API
- **👶 Contenido Seguro**: Filtros para garantizar contenido apropiado para niños

## 🚀 Enlaces Rápidos

[![🏠 Inicio](https://img.shields.io/badge/🏠-Inicio-blue?style=for-the-badge)](../README.md)
[![📚 API Docs](https://img.shields.io/badge/📚-API_Docs-green?style=for-the-badge)](./API.md)
[![🚀 Deployment](https://img.shields.io/badge/🚀-Deployment-orange?style=for-the-badge)](./DEPLOYMENT.md)
[![💻 Frontend](https://img.shields.io/badge/💻-Frontend-purple?style=for-the-badge)](../frontend/README.md)
[![⚙️ Backend](https://img.shields.io/badge/⚙️-Backend-red?style=for-the-badge)](../backend/)

---

<div align="center">

**🧙‍♂️ MateMago - Haciendo las matemáticas mágicas para los niños**

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/yourusername/MatemagoAgent)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org)

</div>
