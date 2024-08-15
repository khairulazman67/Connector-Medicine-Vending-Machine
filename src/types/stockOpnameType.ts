export interface StockOpnameDetailType {
  id?: number;
  etalaseId: number;
  stock: number;
  realStock: number;
}

export interface StockOpnameType {
  id?: number;
  soCode: string;
  vmId: number;
  note: string;
  soDateTime: Date | string;
  details: StockOpnameDetailType[];
}
