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
    <div className="flex flex-col items-center p-2 bg-white shadow-md rounded-xl">
      <img src={juego.imagenUrl} alt={juego.nombre} className="object-contain h-40" />

      <h3 className="mt-4 text-xs font-semibold">{juego.nombre}</h3>

      <p className="text-xs font-bold text-blue-600">{juego.precio} €</p>
      <div className="bg-red-500 flex-1 items-center justify-center">
      </div>
      <button
        className="px-2 py-2 mt-2 text-white text-xs bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={addToCart}
      >
        Añadir al carrito
      </button>
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
    <div className="flex flex-col items-center p-2 bg-white shadow-md h-60 sm:h-80 rounded-xl">
      <img
        src={ItemCarritoJ.juego.imagenUrl}
        alt={ItemCarritoJ.juego.nombre}
        className="object-contain h-40 "
      />

      <h3 className="mt-4 text-xs font-semibold">{ItemCarritoJ.juego.nombre}</h3>

      <p className="text-xs font-bold text-blue-600">
        {ItemCarritoJ.juego.precio} €
      </p>
      <p className="text-xs">Cantidad: {ItemCarritoJ.cantidad}</p>

      <button
        className=" p-2 text-white text-xs bg-red-500 rounded-lg hover:bg-red-400"
        onClick={remove}
      >
        Eliminar del carrito
      </button>
    </div>
  );
}
