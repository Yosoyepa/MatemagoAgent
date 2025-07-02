import React from 'react';
import { BookOpen, Palette, Sparkles, Star, CheckCircle, Trophy } from 'lucide-react';
import Visualizer from './Visualizer';

export const ResponseDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Mensaje de éxito */}
            <div className="matemago-success-card">
                <div className="flex items-center gap-3">
                    <div className="matemago-icon-success">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-matemago-success">¡Perfecto! ✨</h3>
                        <p className="text-sm text-gray-600">He preparado una explicación especial para ti</p>
                    </div>
                </div>
            </div>
            
            {/* Explicación principal */}
            <div className="matemago-card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="matemago-icon-primary float-animation">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="matemago-subtitle">La Explicación Mágica</h2>
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-sparkle" />
                </div>
                
                <div className="matemago-text space-y-4">
                    <p className="text-lg leading-relaxed">{data.explanation}</p>
                </div>
                
                {/* Decoración inferior */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <div className="w-12 h-1 bg-gradient-to-r from-matemago-primary to-matemago-accent rounded-full"></div>
                        <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                </div>
            </div>
            
            {/* Visualización */}
            <div className="matemago-card">
                <div className="flex items-center gap-3 mb-6">
                    <div className="matemago-icon-accent float-animation" style={{animationDelay: '0.5s'}}>
                        <Palette className="w-5 h-5" />
                    </div>
                    <h2 className="matemago-subtitle">El Dibujo Mágico</h2>
                    <Sparkles className="w-5 h-5 text-orange-400 animate-sparkle" style={{animationDelay: '1s'}} />
                </div>
                
                <div className="visual-content">
                    <Visualizer type={data.visual_type} code={data.visual_code} />
                </div>
                
                {/* Información del tipo de visualización */}
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                        <div className="w-2 h-2 bg-matemago-accent rounded-full"></div>
                        Visualización: {data.visual_type.toUpperCase()}
                    </div>
                </div>
            </div>
            
            {/* Call to action para seguir aprendiendo */}
            <div className="matemago-card bg-gradient-to-br from-purple-50 to-orange-50 border-2 border-dashed border-matemago-primary border-opacity-30">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-matemago-primary to-matemago-accent rounded-full flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="matemago-subtitle text-matemago-primary mb-2">¡Excelente trabajo!</h3>
                        <p className="matemago-text text-center max-w-md mx-auto">
                            Has aprendido algo nuevo hoy. ¿Te gustaría explorar otro tema de matemáticas?
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="matemago-button-outline"
                        >
                            <Sparkles className="w-4 h-4" />
                            ¡Aprender más magia!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
