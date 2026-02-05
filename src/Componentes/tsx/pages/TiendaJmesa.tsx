import React, { useState, useEffect } from "react";
import { JuegoM, CatalogoJ } from "../data/JuegoM";
import { ProductCard, CartCard } from "../components/Cards";
import { Carrito } from "../data/Carrito";
import { Pedido } from "../data/Pedidos";
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
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-300 min-h-screen flex flex-col font-body">
      {/* Navbar */}
      <nav className="bg-surface-light dark:bg-surface-dark sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <button className="text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors">
                <span className="material-icons-outlined text-3xl">menu</span>
              </button>
              <a href="#" className="flex items-center gap-3 group">
                <img
                  src="/files/icons/lg_zacatrus.png"
                  alt="Zacatrus"
                  className="w-20"
                />
                <span className="text-2xl font-display font-bold tracking-tight">
                  Zaca
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">

              <button
                className="flex items-center gap-2 text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors"
                onClick={() => setView("pedidos")}
              >
                <span className="material-icons-outlined text-2xl">
                  account_circle
                </span>
                <span className="hidden md:block text-sm font-medium">
                  Pedidos
                </span>
              </button>
              <button
                className="relative p-2 text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors"
                onClick={() => setView("tienda")}
              >
                <span className="material-icons-outlined text-2xl">
                  shopping_cart
                </span>
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {carrito.items.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar Section */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 py-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-icons-outlined text-text-muted-light dark:text-text-muted-dark group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-800 transition-all shadow-sm"
              placeholder="Busca juegos, expansiones o accesorios..."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Grid */}
          <main className="flex-grow lg:w-3/4">
            <div className="flex justify-between items-end mb-8">
              <h1 className="text-3xl font-display font-bold text-text-main-light dark:text-text-main-dark">
                Juegos de Mesa
              </h1>
              {/* Filter tabs example */}
              <div className="hidden sm:flex gap-2 text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                <button className="hover:text-primary transition-colors">
                  Populares
                </button>
                <span>/</span>
                <button className="hover:text-primary transition-colors">
                  Nuevos
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {juegos.length === 0 ? (
                <p className="col-span-full text-center py-10 text-text-muted-light">
                  Cargando juegos...
                </p>
              ) : (
                juegos.map((juego) => (
                  <ProductCard
                    key={juego.id}
                    juego={juego}
                    carrito={carrito}
                    onAddToCart={addToCart}
                  />
                ))
              )}
            </div>
          </main>

          {/* Sidebar / Cart */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-text-main-light dark:text-text-main-dark">
                  Carrito
                </h2>
                <span className="bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2 py-1 rounded text-text-muted-light dark:text-text-muted-dark">
                  {carrito.items.length} items
                </span>
              </div>

              {carrito.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-xl mb-6">
                  <span className="material-icons-outlined text-4xl text-gray-300 dark:text-gray-600 mb-2">
                    shopping_bag
                  </span>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                  {carrito.items.map((item) => (
                    <CartCard
                      key={item.juego.id}
                      ItemCarritoJ={item}
                      onRemoveFromCart={removeFromCart}
                    />
                  ))}
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                  <span>Subtotal</span>
                  <span>{carrito.getTotalPrice().toFixed(2)} €</span>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-bold text-lg text-text-main-light dark:text-text-main-dark">
                    Total
                  </span>
                  <span className="font-bold text-2xl text-text-main-light dark:text-text-main-dark">
                    {carrito.getTotalPrice().toFixed(2)} €
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBuy}
                  disabled={carrito.items.length === 0}
                >
                  Comprar
                </button>
                <button
                  className="w-full bg-red-50 dark:bg-red-900/10 text-danger hover:bg-red-100 dark:hover:bg-red-900/20 font-medium py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                  onClick={clearCart}
                  disabled={carrito.items.length === 0}
                >
                  <span className="material-icons-outlined text-sm">
                    delete_outline
                  </span>
                  Eliminar carrito
                </button>
              </div>

              <div className="mt-8 flex justify-center gap-4 text-gray-300 dark:text-gray-600">
                <span className="material-icons-outlined" title="Pago Seguro">
                  lock
                </span>
                <span
                  className="material-icons-outlined"
                  title="Envío Rápido"
                >
                  local_shipping
                </span>
                <span className="material-icons-outlined" title="Garantía">
                  verified
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default TiendaJmesa;
