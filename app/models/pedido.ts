import { Cliente } from './cliente';
import { Produto } from './produto';

export interface Pedido {
    id?: string;
    cliente: Cliente;
    itens: Produto[];
    total: number;
    dataPedido: Date;
}
