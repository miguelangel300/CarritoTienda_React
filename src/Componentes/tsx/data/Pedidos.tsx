import { ItemCarrito } from "./Carrito";



export class ItemPedido {
    constructor(public juegoId: number, public nombre: string, public precioPagado: number, public cantidad: number, public imagen: string) { }

    getTotalPrice(): number {
        return this.precioPagado * this.cantidad;
    }
}

export class Pedido {
    constructor(public idPedido: number, public userId: number, public items: ItemPedido[], public fecha: Date, public total: number) { }
}