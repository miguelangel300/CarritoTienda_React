import React from "react";
import { JuegoM } from "../data/JuegoM";
import { ItemCarrito, Carrito } from "../data/Carrito";

type Props = {
  juego: JuegoM;
  carrito: Carrito;
  onAddToCart: (juegoId: number) => void;
};

export function ProductCard({ juego, onAddToCart, carrito }: Props) {
  const addToCart = () => {
    onAddToCart(juego.id);
  };

  return (
    <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft hover:shadow-soft-hover border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={juego.imagenUrl}
          alt={juego.nombre}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {juego.nombre}
        </h3>
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-4 line-clamp-2">
          {juego.descripcion || "Sin descripción disponible."}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{juego.precio} €</span>
          <button
            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/30"
            onClick={addToCart}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartCard({
  ItemCarritoJ,
  onRemoveFromCart,
}: {
  ItemCarritoJ: ItemCarrito;
  onRemoveFromCart: (juegoId: number) => void;
}) {
  const remove = () => {
    onRemoveFromCart(ItemCarritoJ.juego.id);
  };

  return (
    <div className="flex gap-4 p-3 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 rounded-xl transition-all hover:shadow-md">
      <img
        src={ItemCarritoJ.juego.imagenUrl}
        alt={ItemCarritoJ.juego.nombre}
        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-medium text-sm text-text-main-light dark:text-text-main-dark line-clamp-1">
            {ItemCarritoJ.juego.nombre}
          </h3>
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
            Cant: {ItemCarritoJ.cantidad}
          </p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-bold text-primary text-sm">
            {ItemCarritoJ.juego.precio} €
          </span>
          <button
            className="text-danger hover:bg-red-50 dark:hover:bg-red-900/10 p-1.5 rounded-lg transition-colors"
            onClick={remove}
            title="Eliminar"
          >
            <span className="material-icons-outlined text-sm">delete_outline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
