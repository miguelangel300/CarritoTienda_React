export class JuegoM {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public precio: number,
    public imagenUrl: string
  ) { }
}



// ===== CATALOGO LOCAL  =====
export let CatalogoJ: JuegoM[] = [
  new JuegoM(
    1,
    "Paleo",
    "descript",
    18.5,
    "/tiendaJueguitoMesa/jm_paleo.jpg"
  ),
  new JuegoM(
    2,
    "Catan",
    "descript",
    18.5,
    "/tiendaJueguitoMesa/jm_Catan.jpg"
  ),
  new JuegoM(
    3,
    "Arnak",
    "descript",
    18.5,
    "/tiendaJueguitoMesa/jm_arnak.jpg"
  ),
  new JuegoM(
    4,
    "Clank",
    "descript",
    18.5,
    "/tiendaJueguitoMesa/jm_clank.jpg"
  ),
  new JuegoM(
    5,
    "Dead Cells",
    "descript",
    18.5,
    "/tiendaJueguitoMesa/jm_dead.jpg"
  ),
  new JuegoM(
    6,
    "Everdell",
    "descript",
    18.5,
    "/tiendaJueguitoMesa/jm_everdell.jpg"
  ),
];
