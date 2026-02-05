import React, { useState, useEffect } from "react";
import { JuegoM, CatalogoJ } from "../data/JuegoM";
import { ProductCard, CartCard } from "../components/Cards";
import { Carrito } from "../data/Carrito";
import { Pedido } from "../data/Pedidos";
import { IcSearch } from "../icons/icons";
import { PedidosPage } from "./PedidosPage";
import { obtenerProductos, crearPedido, getPedidosByUsuario } from "../../../services/apiJuegos";
import { DEFAULT_USER_ID } from "../../../services/config";

function TiendaJmesa() {
  const [carrito, setCarrito] = useState(new Carrito(1, []));
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [view, setView] = useState<'tienda' | 'pedidos'>('tienda');
  const [juegos, setJuegos] = useState<JuegoM[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, pedidosData] = await Promise.all([
          obtenerProductos(),
          getPedidosByUsuario(DEFAULT_USER_ID)
        ]);

        console.log("Productos API:", productosData);
        console.log("Pedidos API:", pedidosData);

        const productosCorregidos = productosData.map((prod: JuegoM) => ({
          ...prod,
          imagenUrl: prod.imagenUrl ? prod.imagenUrl.replace("http://localhost:8080", "") : ""
        }));

        setJuegos(productosCorregidos);
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Error cargando datos de API:", error);
        alert("Error de conexión con el backend.");
      }
    };
    fetchData();
  }, []);

  const addToCart = (juegoId: number) => {
    carrito.addToCart(juegoId, juegos);
    setCarrito(new Carrito(carrito.idCarrito, [...carrito.items]));
  };

  const removeFromCart = (juegoId: number) => {
    carrito.removeToCart(juegoId);
    setCarrito(new Carrito(carrito.idCarrito, [...carrito.items]));
  };

  const clearCart = () => {
    carrito.clearCart();
    setCarrito(new Carrito(carrito.idCarrito, []));
  };

  const handleBuy = async () => {
    const pedido = carrito.generarPedido();
    try {
      const pedidoGuardado = await crearPedido(pedido);
      setPedidos([...pedidos, pedidoGuardado]);
      console.log("Pedido guardado en backend:", pedidoGuardado);
      clearCart();
      alert("¡Pedido realizado y guardado con éxito!");
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      alert("Error al guardar el pedido. ¿El backend está activo?");
      setPedidos([...pedidos, pedido]);
    }
  };

  if (view === 'pedidos') {
    return <PedidosPage pedidos={pedidos} onBack={() => setView('tienda')} />;
  }

  return (
    <div className="h-screen">
      <header>
        <nav className="flex justify-between mx-2 p-2">
          <ul className="flex items-center gap-4">
            <li>
              <img src="/files/icons/ic_lines.svg" alt="" className="w-6" />
            </li>
            <li>
              <img
                src="/files/icons/lg_zacatrus.png"
                alt="Zacatrus"
                className="w-20"
              />
            </li>
          </ul>
          <ul className="flex items-center gap-4">
            <li onClick={() => setView('pedidos')} className="cursor-pointer">
              <img src="/files/icons/ic_user.svg" alt="" className="w-8" />
            </li>
            <li onClick={() => setView('tienda')} className="cursor-pointer">
              <img src="/files/icons/ic_cart.svg" alt="" className="w-8" />
            </li>
          </ul>
        </nav>
      </header>

      <div className="flex items-center gap-4 p-2 mx-6 rounded-full bg-slate-200">
        <IcSearch />
        <p className="text-gray-400">Busca!</p>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col m-2 card">
          <h2 className="flex justify-center m-2 text-2xl font-bold ">
            Juegos de Mesa
          </h2>
          <div className="grid justify-center grid-cols-3 gap-2 p-2">
            {juegos.length === 0 ? <p>Cargando juegos...</p> : juegos.map((juego) => (
              <ProductCard
                key={juego.id}
                juego={juego}
                carrito={carrito}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col p-2 m-2 w-100 bg-gray-50 h-100">
          <h2 className="flex justify-center m-2 text-2xl">Carrito</h2>
          <div className="flex items-center ">
            <div>
              <p className="mb-4 text-xs font-bold">
                Total: {carrito.getTotalPrice().toFixed(2)}€
              </p>
            </div>
            <button
              className="w-20 p-2 m-2 text-xs text-white rounded-lg bg-blue-500 hover:bg-blue-400/80"
              onClick={handleBuy}
            >
              Comprar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 overflow-y-auto  h-[50vh]">
            {carrito.items.length === 0 ? (
              <p className="text-gray-500">Carrito vacío</p>
            ) : (
              carrito.items.map((item) => (
                <CartCard
                  key={item.juego.id}
                  ItemCarritoJ={item}
                  onRemoveFromCart={removeFromCart}
                />
              ))
            )}
          </div>
          <div className="flex items-center ">
            <button
              className="w-20 p-2 m-2 text-xs text-white rounded-lg bg-red-500/80 hover:bg-red-400/80"
              onClick={clearCart}
            >
              Eliminar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiendaJmesa;
