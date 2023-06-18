import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  label: string;
  width: number;
  renderCell: (row: T) => ReactNode;
}
