import React, { useEffect, useRef, memo } from 'react';
import mermaid from 'mermaid';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Configuración de Mermaid con tema MateMago
mermaid.initialize({
    startOnLoad: false, 
    theme: 'base', 
    themeVariables: { 
        primaryColor: '#706fd3',
        primaryTextColor: '#3d3d3d',
        primaryBorderColor: '#706fd3',
        lineColor: '#ff7e5f',
        sectionBkgColor: '#f9fafb',
        altSectionBkgColor: '#ffffff',
        gridColor: '#e5e7eb',
        secondaryColor: '#ff7e5f',
        tertiaryColor: '#f9fafb',
        background: '#ffffff',
        mainBkg: '#ffffff',
        secondBkg: '#f9fafb',
        tertiaryTextColor: '#3d3d3d'
    }
});

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
            try {
                switch (type) {
                    case 'svg':
                        visualRef.current.innerHTML = code;
                        // Aplicar estilos MateMago a SVG
                        const svgElements = visualRef.current.querySelectorAll('svg');
                        svgElements.forEach(svg => {
                            svg.style.borderRadius = '0.75rem';
                            svg.style.background = '#ffffff';
                        });
                        break;
                        
                    case 'mermaid':
                        try {
                            const { svg } = await mermaid.render('mermaid-graph-' + Date.now(), code);
                            visualRef.current.innerHTML = svg;
                            
                            // Aplicar estilos MateMago al SVG de Mermaid
                            const mermaidSvg = visualRef.current.querySelector('svg');
                            if (mermaidSvg) {
                                mermaidSvg.style.borderRadius = '0.75rem';
                                mermaidSvg.style.background = '#ffffff';
                                mermaidSvg.style.padding = '1rem';
                            }
                        } catch (e) {
                            console.error('Mermaid render error:', e);
                            visualRef.current.innerHTML = `
                                <div class="flex items-center justify-center p-8 bg-red-50 rounded-xl border-2 border-red-200">
                                    <div class="text-center">
                                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span class="text-red-500 text-xl">⚠️</span>
                                        </div>
                                        <p class="text-red-700 font-semibold">Error al dibujar el diagrama</p>
                                        <p class="text-red-600 text-sm mt-1">El formato del diagrama no es válido</p>
                                    </div>
                                </div>
                            `;
                        }
                        break;
                        
                    case 'chartjs':
                        try {
                            const canvas = document.createElement('canvas');
                            canvas.style.borderRadius = '0.75rem';
                            visualRef.current.appendChild(canvas);
                            
                            const config = JSON.parse(code);
                            
                            // Aplicar tema MateMago a Chart.js
                            if (config.options) {
                                config.options = {
                                    ...config.options,
                                    plugins: {
                                        ...config.options.plugins,
                                        legend: {
                                            ...config.options.plugins?.legend,
                                            labels: {
                                                ...config.options.plugins?.legend?.labels,
                                                color: '#3d3d3d',
                                                font: {
                                                    family: 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, sans-serif',
                                                    size: 12,
                                                    weight: '600'
                                                }
                                            }
                                        }
                                    },
                                    scales: config.options.scales ? {
                                        ...config.options.scales,
                                        x: {
                                            ...config.options.scales.x,
                                            ticks: {
                                                ...config.options.scales.x?.ticks,
                                                color: '#64748b',
                                                font: {
                                                    family: 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, sans-serif'
                                                }
                                            },
                                            grid: {
                                                ...config.options.scales.x?.grid,
                                                color: '#e5e7eb'
                                            }
                                        },
                                        y: {
                                            ...config.options.scales.y,
                                            ticks: {
                                                ...config.options.scales.y?.ticks,
                                                color: '#64748b',
                                                font: {
                                                    family: 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, sans-serif'
                                                }
                                            },
                                            grid: {
                                                ...config.options.scales.y?.grid,
                                                color: '#e5e7eb'
                                            }
                                        }
                                    } : undefined
                                };
                            }
                            
                            // Aplicar colores MateMago a datasets si no están definidos
                            if (config.data && config.data.datasets) {
                                const matemagoPalette = ['#706fd3', '#ff7e5f', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
                                config.data.datasets.forEach((dataset, index) => {
                                    if (!dataset.backgroundColor) {
                                        dataset.backgroundColor = matemagoPalette[index % matemagoPalette.length] + '20';
                                    }
                                    if (!dataset.borderColor) {
                                        dataset.borderColor = matemagoPalette[index % matemagoPalette.length];
                                    }
                                    if (!dataset.borderWidth) {
                                        dataset.borderWidth = 2;
                                    }
                                });
                            }
                            
                            chartRef.current = new Chart(canvas.getContext('2d'), config);
                        } catch (e) {
                            console.error('Chart.js render error:', e);
                            visualRef.current.innerHTML = `
                                <div class="flex items-center justify-center p-8 bg-orange-50 rounded-xl border-2 border-orange-200">
                                    <div class="text-center">
                                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span class="text-orange-500 text-xl">📊</span>
                                        </div>
                                        <p class="text-orange-700 font-semibold">Error al dibujar la gráfica</p>
                                        <p class="text-orange-600 text-sm mt-1">Los datos del gráfico no son válidos</p>
                                    </div>
                                </div>
                            `;
                        }
                        break;
                        
                    default:
                        visualRef.current.innerHTML = `
                            <div class="flex items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-gray-200">
                                <div class="text-center">
                                    <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span class="text-gray-500 text-xl">🎨</span>
                                    </div>
                                    <p class="text-gray-700 font-semibold">Visual no disponible</p>
                                    <p class="text-gray-600 text-sm mt-1">Tipo de visualización no reconocido: ${type}</p>
                                </div>
                            </div>
                        `;
                }
            } catch (error) {
                console.error('Visualizer error:', error);
                visualRef.current.innerHTML = `
                    <div class="flex items-center justify-center p-8 bg-red-50 rounded-xl border-2 border-red-200">
                        <div class="text-center">
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span class="text-red-500 text-xl">❌</span>
                            </div>
                            <p class="text-red-700 font-semibold">Error inesperado</p>
                            <p class="text-red-600 text-sm mt-1">No se pudo crear la visualización</p>
                        </div>
                    </div>
                `;
            }
        };

        renderVisual();
    }, [type, code]);

    return (
        <div 
            ref={visualRef} 
            className="visual-content transition-all duration-300 hover:shadow-matemago rounded-2xl"
        ></div>
    );
};

export default memo(Visualizer);
