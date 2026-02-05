import { API_URL, DEFAULT_USER_ID } from "./config";
import { JuegoM } from "../Componentes/tsx/data/JuegoM";
import { Pedido } from "../Componentes/tsx/data/Pedidos";

const ENDPOINT_PRODUCTOS = `${API_URL}/api/productos`;
const ENDPOINT_PEDIDOS = `${API_URL}/api/pedidos`;
const ENDPOINT_USUARIOS = `${API_URL}/user`;

//  PETICIONES DE PRODUCTOS 

export const obtenerProductos = async (): Promise<JuegoM[]> => {
    const response = await fetch(ENDPOINT_PRODUCTOS);
    if (!response.ok) throw new Error("Error al obtener productos");

    const text = await response.text();
    console.log("Respuesta RAW de obtenerProductos:", text);
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("Error parseando JSON de productos:", e);
        throw e;
    }
};

//  PETICIONES DE PEDIDOS 

export const crearPedido = async (pedido: Pedido): Promise<Pedido> => {
    // Transformamos el pedido al formato que espera el backend (DTO)
    const payload = {
        userId: pedido.userId,
        fecha: pedido.fecha,
        total: pedido.total,
        detalles: pedido.items.map(item => ({
            productoId: item.juegoId,
            cantidad: item.cantidad,
            precioUnitario: item.precioPagado
        }))
    };

    console.log("Enviando pedido al backend:", JSON.stringify(payload, null, 2));

    const response = await fetch(ENDPOINT_PEDIDOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del backend al crear pedido:", errorText);
        throw new Error("Error al crear el pedido: " + errorText);
    }

    const data = await response.json();

    // Mapeamos respuesta: Fecha String -> Date, Detalles -> Items
    return {
        ...data,
        fecha: new Date(data.fecha),
        items: data.detalles ? data.detalles.map((d: any) => ({
            juegoId: d.productoId,
            cantidad: d.cantidad,
            precioPagado: d.precioUnitario,
            nombre: d.productoNombre || d.nombre
        })) : []
    };
};

export const getPedidosByUsuario = async (userId: number = DEFAULT_USER_ID): Promise<Pedido[]> => {
    const response = await fetch(`${ENDPOINT_PEDIDOS}/usuario/${userId}`);
    if (!response.ok) throw new Error("Error al obtener pedidos del usuario");

    const text = await response.text();
    console.log("Respuesta RAW de getPedidosByUsuario:", text);

    try {
        const data = JSON.parse(text);

        // Mapeamos la respuesta del backend al modelo del frontend
        return data.map((p: any) => ({
            ...p,
            fecha: new Date(p.fecha), // Convertimos string ISO a Date
            items: p.detalles ? p.detalles.map((d: any) => ({ // Mapeamos detalles -> items
                juegoId: d.productoId,
                cantidad: d.cantidad,
                precioPagado: d.precioUnitario,
                nombre: d.productoNombre || d.nombre
            })) : []
        }));
    } catch (e) {
        console.error("Error parseando JSON de pedidos:", e);
        throw e;
    }
};
