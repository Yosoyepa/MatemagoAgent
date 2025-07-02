import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { fetchExplanation } from './services/apiClient';
import { Wand2, Sparkles, AlertCircle } from 'lucide-react';

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-matemago-background">
            <div className="max-w-4xl mx-auto p-6 space-y-10">
                {/* Header mejorado con identidad visual MateMago */}
                <header className="text-center space-y-6 py-8">
                    <div className="flex items-center justify-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-matemago-primary to-purple-600 rounded-full flex items-center justify-center shadow-matemago magic-pulse">
                                <Wand2 className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1">
                                <Sparkles className="w-6 h-6 text-yellow-400 animate-sparkle" />
                            </div>
                        </div>
                        <h1 className="matemago-title text-5xl">
                            Mate<span className="matemago-brand">Mago</span>
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Tu ayudante mágico para aprender matemáticas de manera divertida y fácil
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-matemago-primary to-transparent rounded-full"></div>
                        <div className="w-3 h-3 bg-matemago-accent rounded-full animate-bounce"></div>
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-matemago-accent to-transparent rounded-full"></div>
                    </div>
                </header>
                <main className="space-y-8">
                    <InputForm onQuery={handleQuery} isLoading={isLoading} />
                    
                    {/* Error display mejorado */}
                    {error && (
                        <div className="matemago-error-card">
                            <div className="flex items-center gap-3">
                                <div className="matemago-icon-error">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-matemago-error mb-1">¡Ups! Algo salió mal</h3>
                                    <p className="text-gray-600 text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <ResponseDisplay data={responseData} />
                </main>
                
                {/* Footer con decoración */}
                <footer className="text-center py-8 mt-16">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Wand2 className="w-4 h-4" />
                        <span className="text-sm">Diseñado con magia para el aprendizaje</span>
                        <Sparkles className="w-4 h-4" />
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
