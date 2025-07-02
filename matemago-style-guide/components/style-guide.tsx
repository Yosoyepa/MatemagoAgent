"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Star,
  Heart,
  Zap,
  Trophy,
  BookOpen,
  Calculator,
  Wand2,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"

export function StyleGuide() {
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header con MateMago */}
      <header className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Mate<span className="text-purple-500">Mago</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Guía de estilo visual para una experiencia mágica de aprendizaje matemático
        </p>
      </header>

      {/* Paleta de Colores */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
          Paleta de Colores
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ColorCard color="#706fd3" name="Primario" description="Morado Suave - Brand principal" textColor="white" />
          <ColorCard color="#ff7e5f" name="Acento" description="Coral Vibrante - CTAs" textColor="white" />
          <ColorCard color="#2ecc71" name="Éxito" description="Verde Esmeralda - Feedback positivo" textColor="white" />
          <ColorCard color="#e74c3c" name="Error" description="Rojo Alizarin - Feedback negativo" textColor="white" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <ColorCard color="#f4f6f8" name="Fondo Principal" description="Gris muy claro" textColor="black" />
          <ColorCard color="#ffffff" name="Fondo Tarjetas" description="Blanco puro" textColor="black" border={true} />
          <ColorCard color="#3d3d3d" name="Texto Principal" description="Gris oscuro suave" textColor="white" />
        </div>
      </section>

      {/* Tipografía */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-purple-500" />
          Tipografía - Sistema de Fuentes Redondeadas
        </h2>

        <Card className="p-8 bg-white shadow-lg border-0 rounded-3xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Título Principal (H1) - Extra Bold</h1>
              <p className="text-gray-500">font-weight: 800 - Sistema de fuentes redondeadas</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Subtítulo (H2) - Bold</h2>
              <p className="text-gray-500">font-weight: 700</p>
            </div>

            <div>
              <p className="text-lg text-gray-700 mb-2">
                Texto de párrafo regular con excelente legibilidad para niños usando fuentes del sistema con
                características redondeadas.
              </p>
              <p className="text-gray-500">font-weight: 400</p>
            </div>

            <div>
              <span className="text-base font-semibold text-gray-800">Texto para botones y labels - Semi Bold</span>
              <p className="text-gray-500 mt-1">font-weight: 600</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-sm text-purple-700">
                <strong>Nota:</strong> Utilizamos un stack de fuentes del sistema que prioriza fuentes redondeadas
                disponibles en diferentes plataformas: ui-rounded, Hiragino Maru Gothic ProN, Quicksand, Comfortaa, y
                otras fuentes amigables como fallback.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Componentes Soft UI */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Zap className="w-8 h-8 text-orange-500" />
          Componentes Soft UI
        </h2>

        {/* Botones */}
        <Card className="p-8 bg-white shadow-lg border-0 rounded-3xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Botones</h3>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Star className="w-4 h-4 mr-2" />
              Botón Primario
            </Button>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Heart className="w-4 h-4 mr-2" />
              Botón Acento
            </Button>

            <Button
              variant="outline"
              className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 bg-transparent"
            >
              Botón Secundario
            </Button>

            <Button
              onClick={handleLoadingDemo}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  ¡Resolver!
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Inputs */}
        <Card className="p-8 bg-white shadow-lg border-0 rounded-3xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Campos de Entrada</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Respuesta Matemática</label>
              <Input
                type="number"
                placeholder="Escribe tu respuesta..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Mago</label>
              <Input
                type="text"
                placeholder="¿Cómo te llamas?"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all duration-300"
              />
            </div>
          </div>
        </Card>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white shadow-lg border-0 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                ¡Respuesta Correcta!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                ¡Excelente trabajo! Has resuelto el problema matemático correctamente. Continúa con el siguiente
                desafío.
              </p>
              <Badge className="mt-4 bg-green-100 text-green-700 hover:bg-green-200">+10 puntos mágicos</Badge>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white shadow-lg border-0 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-gray-800">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                Inténtalo de Nuevo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                No te preocupes, todos los magos necesitan práctica. Revisa tu cálculo e inténtalo otra vez.
              </p>
              <Badge className="mt-4 bg-orange-100 text-orange-700 hover:bg-orange-200">Pista disponible</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Iconografía */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Iconografía
        </h2>

        <Card className="p-8 bg-white shadow-lg border-0 rounded-3xl">
          <p className="text-gray-600 mb-6">
            Iconos con estilo outline y esquinas redondeadas para mantener la consistencia visual.
          </p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {[
              { icon: Wand2, name: "Varita" },
              { icon: Sparkles, name: "Magia" },
              { icon: Star, name: "Estrella" },
              { icon: Heart, name: "Corazón" },
              { icon: Trophy, name: "Trofeo" },
              { icon: Calculator, name: "Calculadora" },
              { icon: BookOpen, name: "Libro" },
              { icon: Zap, name: "Energía" },
            ].map(({ icon: Icon, name }) => (
              <div key={name} className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2 mx-auto hover:bg-purple-200 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Layout y Espaciado */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Layout y Espaciado</h2>

        <Card className="p-8 bg-white shadow-lg border-0 rounded-3xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sistema de Espaciado</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[8, 16, 24, 32].map((size) => (
                  <div key={size} className="text-center">
                    <div
                      className="bg-purple-200 rounded-lg mx-auto mb-2"
                      style={{ width: `${size}px`, height: `${size}px` }}
                    ></div>
                    <span className="text-sm text-gray-600">{size}px</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contenedor Principal</h3>
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="bg-white rounded-lg p-4 max-w-4xl mx-auto">
                  <p className="text-gray-600 text-center">max-width: 900px - Centrado para óptima legibilidad</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center py-8">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Wand2 className="w-5 h-5" />
          <span>Diseñado con magia para MateMago</span>
          <Sparkles className="w-5 h-5" />
        </div>
      </footer>
    </div>
  )
}

function ColorCard({
  color,
  name,
  description,
  textColor = "white",
  border = false,
}: {
  color: string
  name: string
  description: string
  textColor?: string
  border?: boolean
}) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${border ? "border-2 border-gray-200" : ""}`}
      style={{ backgroundColor: color }}
    >
      <h3 className={`font-bold text-lg mb-2`} style={{ color: textColor }}>
        {name}
      </h3>
      <p className={`text-sm opacity-90`} style={{ color: textColor }}>
        {description}
      </p>
      <code className={`text-xs mt-2 block font-mono`} style={{ color: textColor }}>
        {color}
      </code>
    </div>
  )
}
