import React from 'react';
import { Pedido } from '../data/Pedidos';

interface Props {
    pedidos: Pedido[];
    onBack: () => void;
}

export const PedidosPage: React.FC<Props> = ({ pedidos, onBack }) => {
    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <header className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ← Volver
                </button>
                <h1 className="text-2xl font-bold">Mis Pedidos</h1>
            </header>

            {pedidos.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    <p className="text-xl">No has realizado ningún pedido aún.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {pedidos.map((pedido, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Fecha: {pedido.fecha.toLocaleDateString()} {pedido.fecha.toLocaleTimeString()}
                                    </p>

                                </div>
                                <p className="text-xl font-bold text-blue-600">
                                    {pedido.total.toFixed(2)} €
                                </p>
                            </div>

                            <div className="space-y-2">
                                {pedido.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span>{item.cantidad}x {item.nombre}</span>
                                        <span>{(item.precioPagado * item.cantidad).toFixed(2)} €</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
