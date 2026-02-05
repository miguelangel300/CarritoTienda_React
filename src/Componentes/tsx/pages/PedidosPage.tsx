import React from 'react';
import { Pedido } from '../data/Pedidos';

interface Props {
    pedidos: Pedido[];
    onBack: () => void;
}

export const PedidosPage: React.FC<Props> = ({ pedidos, onBack }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-text-main-light dark:text-text-main-dark antialiased transition-colors duration-200 min-h-screen">
            <header className="bg-surface-light dark:bg-surface-dark shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="group flex items-center text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                        >
                            <span className="material-icons-outlined text-lg mr-1 group-hover:-translate-x-1 transition-transform">
                                arrow_back
                            </span>
                            Volver
                        </button>
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
                        <h1 className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">
                            Mis Pedidos
                        </h1>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shadow-md">
                        MA
                    </div>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {pedidos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <span className="material-icons-outlined text-6xl text-gray-300 dark:text-gray-700 mb-4">
                            shopping_bag
                        </span>
                        <p className="text-xl text-text-muted-light dark:text-text-muted-dark font-medium">
                            No has realizado ningún pedido aún.
                        </p>
                        <button
                            onClick={onBack}
                            className="mt-6 px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
                        >
                            Ir a la tienda
                        </button>
                    </div>
                ) : (
                    pedidos.map((pedido, index) => (
                        <div
                            key={index}
                            className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 dark:border-gray-700 gap-2 sm:gap-0 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-wider font-semibold text-text-muted-light dark:text-text-muted-dark mb-1">
                                        Fecha del pedido
                                    </span>
                                    <div className="flex items-center text-sm font-medium text-text-main-light dark:text-text-main-dark">
                                        <span className="material-icons-outlined text-base mr-1.5 text-text-muted-light dark:text-text-muted-dark">
                                            calendar_today
                                        </span>
                                        {pedido.fecha.toLocaleDateString()}{" "}
                                        <span className="text-text-muted-light dark:text-text-muted-dark mx-2">
                                            •
                                        </span>{" "}
                                        {pedido.fecha.toLocaleTimeString()}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs uppercase tracking-wider font-semibold text-text-muted-light dark:text-text-muted-dark mb-1">
                                        Total
                                    </span>
                                    <span className="text-xl font-bold text-primary">
                                        {pedido.total.toFixed(2)} €
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {pedido.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="py-3 flex justify-between items-center group"
                                        >
                                            <div className="flex items-center">
                                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded mr-3">
                                                    {item.cantidad}x
                                                </span>
                                                <span className="text-text-main-light dark:text-text-main-dark font-medium">
                                                    {item.nombre}
                                                </span>
                                            </div>
                                            <span className="text-text-main-light dark:text-text-main-dark font-semibold">
                                                {(item.precioPagado * item.cantidad).toFixed(2)} €
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-700 flex justify-end transition-colors">
                                <button className="text-sm text-primary font-medium hover:text-secondary transition-colors flex items-center">
                                    Ver detalles
                                    <span className="material-icons-outlined text-sm ml-1">
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};
