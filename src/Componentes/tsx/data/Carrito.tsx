import { JuegoM, CatalogoJ } from "./JuegoM";
import { ItemPedido, Pedido } from "./Pedidos";
import { DEFAULT_USER_ID } from "../../../services/config";

export class ItemCarrito {
  constructor(public juego: JuegoM, public cantidad: number) { }
}

export class Carrito {
  constructor(public idCarrito: number, public items: ItemCarrito[]) { }

  addToCart(juegoId: number, Catalogo: JuegoM[] = CatalogoJ): void {
    const itemExist = this.items.find((item) => item.juego.id === juegoId);

    if (itemExist) {
      itemExist.cantidad++;
    } else {
      const itemCatalogo = Catalogo.find((item) => item.id === juegoId);
      if (itemCatalogo) {
        this.items.push(new ItemCarrito(itemCatalogo, 1));
      }
    }
  }

  removeToCart(juegoId: number): void {
    this.items = this.items.filter((item) => item.juego.id !== juegoId);
  }
  clearCart() {
    this.items = [];
  }
  getTotalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.juego.precio * item.cantidad,
      0
    );
  }

  toItemPedido(): ItemPedido[] {
    return this.items.map((item) => new ItemPedido(item.juego.id, item.juego.nombre, item.juego.precio, item.cantidad, item.juego.imagenUrl));
  }

  generarPedido(): Pedido {
    return new Pedido(0, DEFAULT_USER_ID, this.toItemPedido(), new Date(), this.getTotalPrice());
  }

}
