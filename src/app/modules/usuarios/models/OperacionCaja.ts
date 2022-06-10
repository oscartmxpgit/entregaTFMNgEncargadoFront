export interface OperacionCaja {
  fecha: Date;
  producto: string;
  cantidad: number;
  importe: number;
  tipoOperacion?:number;
}
