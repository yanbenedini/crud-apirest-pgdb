export interface Fornecedor {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cnpj: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface FornecedorCreate {
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cnpj: string;
}

export interface FornecedorUpdate {
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cnpj?: string;
}