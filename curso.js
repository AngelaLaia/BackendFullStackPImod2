import CursoDAO from "../DB/cursoDAO.js";

export default class Curso {
    #id;
    #nome;
    #periodo;

    constructor(id, nome, periodo) {
        this.#id = id;
        this.#nome = nome;
        this.#periodo = periodo;
    }

    
    get id() { return this.#id; }
    set id(value) { this.#id = value; }

    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }

    get periodo() { return this.#periodo; }
    set periodo(value) { this.#periodo = value; }

    toString() {
        return `ID: ${this.#id}\nNome: ${this.#nome}\nPeriodo: ${this.#periodo}`;
    }

    toJSON() {
        return { id: this.#id, nome: this.#nome, periodo: this.#periodo };
    }

    async gravar() {
        const dao = new CursoDAO();
        await dao.gravar(this);
    }

    
    async excluir() {
        if (!this.#id) throw new Error("O curso precisa ter um ID para ser excluído.");
        const dao = new CursoDAO();
        return await dao.excluir(this.#id);
    }
    async consultar() {
        if (!this.#id) throw new Error("O curso precisa ter um ID para ser consultado.");
        const dao = new CursoDAO();
        const curso = await dao.consultar(this.#id);
    }
    async atualizar() {
        if (!this.#id) throw new Error("O curso precisa ter um ID para ser atualizado.");
        const dao = new CursoDAO();
        return await dao.alterar(this);
    }
    static async listarTodos() {
        const dao = new CursoDAO();
        const cursosArray = await dao.listarTodos();
        return cursosArray.map(cursoObj => new Curso(cursoObj.id, cursoObj.nome, cursoObj.periodo));
    }
    
};
