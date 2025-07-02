import React, { useState } from 'react';
import { Loader2, Trophy, Calculator, BookOpen } from 'lucide-react';

export const InputForm = ({ onQuery, isLoading }) => {
    const [concept, setConcept] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!concept || !age) {
            // Validación mejorada con mejor UX
            const missingFields = [];
            if (!concept) missingFields.push('el tema que quieres aprender');
            if (!age) missingFields.push('tu edad');
            
            alert(`¡Por favor completa ${missingFields.join(' y ')}! 🧙‍♂️`);
            return;
        }
        onQuery(concept, age);
    };

    return (
        <div className="matemago-card max-w-2xl mx-auto matemago-sparkle">
            {/* Header del formulario */}
            <div className="flex items-center gap-3 mb-6">
                <div className="matemago-icon-primary">
                    <Calculator className="w-5 h-5" />
                </div>
                <h2 className="matemago-subtitle">¡Vamos a Aprender Juntos!</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                    <div>
                        <label className="matemago-label flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-matemago-primary" />
                            ¿Qué quieres aprender hoy?
                        </label>
                        <input
                            type="text"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            placeholder="Ejemplo: suma, resta, multiplicación, fracciones..."
                            disabled={isLoading}
                            className="matemago-input"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            🌟 Puedes preguntarme sobre cualquier tema de matemáticas
                        </p>
                    </div>
                    
                    <div>
                        <label className="matemago-label flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-matemago-accent" />
                            ¿Cuántos años tienes?
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Tu edad"
                            min="5"
                            max="15"
                            disabled={isLoading}
                            className="matemago-input"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            🎨 Adaptaré la explicación perfecta para ti
                        </p>
                    </div>
                </div>
                
                {/* Botón principal mejorado */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`matemago-button-success w-full ${isLoading ? 'matemago-loading' : ''}`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Creando magia...</span>
                        </>
                    ) : (
                        <>
                            <Trophy className="w-5 h-5" />
                            <span>¡Resolver con Magia!</span>
                        </>
                    )}
                </button>
                
                {/* Ejemplos de uso */}
                {!concept && !age && (
                    <div className="bg-purple-50 rounded-2xl p-4 mt-4">
                        <h4 className="font-semibold text-matemago-primary mb-2 text-sm">
                            💡 Ideas para empezar:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>• "Suma de números"
                            <div>• "Tablas de multiplicar"</div>
                            <div>• "División básica"</div>
                            </div>
                            <div>• "Fracciones simples"
                            <div>• "Geometría básica"</div>
                            <div>• "Números pares e impares"</div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
