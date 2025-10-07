class User {
    id: number;
    nome: string;
    email: string;

    private static counter = 1;
    constructor(nome: string, email:string) {
        this.id = User.counter++;
        this.nome = nome;
        this.email = email;
    }
}

export default User;