
import AlunoDAO from "../DB/alunoDAO.js";

export default class Aluno {
    #cpf;
    #nome;
    #sobrenome;
    #email;
    #cep;
    #cidade;
    #curso_id

    constructor(cpf, nome, sobrenome, email, cep, cidade, curso_id = null) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#email = email;
        this.#cep = cep;
        this.#cidade = cidade;
        this.#curso_id = curso_id;
    }

  
    get cpf() { return this.#cpf; }
    set cpf(value) { this.#cpf = value; }

    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }

    get sobrenome() { return this.#sobrenome; }
    set sobrenome(value) { this.#sobrenome = value; }

    get email() { return this.#email; }
    set email(value) { this.#email = value; }

    get cep() { return this.#cep; }
    set cep(value) { this.#cep = value; }

    get cidade() { return this.#cidade; }
    set cidade(value) { this.#cidade = value; }
    get curso_id() { return this.#curso_id; }
    set curso_id(value) { this.#curso_id = value; }

    
    toString() {
        return `CPF: ${this.#cpf}
Nome Completo: ${this.#nome}
Sobrenome: ${this.#sobrenome}
Email: ${this.#email}
Cidade: ${this.#cidade}
CEP: ${this.#cep}
Curso ID: ${this.#curso_id}`;
    }

    
    toJSON() {
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            email: this.#email,
            cep: this.#cep,
            cidade: this.#cidade,
            curso_id: this.#curso_id
            
        };
    }

    
    async gravar() {
        const dao = new AlunoDAO();
        return await dao.gravar(this);
    }

    async atualizar() {
        if (!this.#cpf) throw new Error("O aluno precisa ter um CPF para alterar.");
        const dao = new AlunoDAO();
        return await dao.atualizar(this);
    }

    async excluir() {
        if (!this.#cpf) throw new Error("O aluno precisa ter um CPF para excluir.");
        const dao = new AlunoDAO();
        return await dao.excluir(this.#cpf);
    }

    static async consultarPorCpf(cpf) {
        const dao = new AlunoDAO();
        const alunoObj = await dao.consultarPorCpf(cpf);
        if (!alunoObj) return null;
        return new Aluno(
            alunoObj.cpf,
            alunoObj.nome,
            alunoObj.sobrenome,
            alunoObj.email,
            alunoObj.cep,
            alunoObj.cidade,
            alunoObj.curso_id

        );
    }
    static async listarTodos() {
        const dao = new AlunoDAO();
        const alunosArray = await dao.listarTodos();
        return alunosArray.map(alunoObj => new Aluno(
            alunoObj.cpf,
            alunoObj.nome,
            alunoObj.sobrenome,
            alunoObj.email,
            alunoObj.cep,
            alunoObj.cidade,
            alunoObj.curso_id
        ));
    }
};
