export interface Produto {
    id?: string;
    nome: string;
    preco: number;
    categoria: 'Pizza' | 'Bebida' | 'Sobremesa';
}
