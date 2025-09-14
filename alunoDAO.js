
import Aluno from "../models/aluno.js";
import pool from "../DB/conexao.js"; 

export default class AlunoDAO {

    async gravar(aluno) {
        if (!(aluno instanceof Aluno)) throw new Error("Parâmetro deve ser um objeto Aluno");

        const { cpf, nome, sobrenome, email, cep, cidade, curso_id } = aluno;
        const comando = `
            INSERT INTO alunos (cpf, nome, sobrenome, email, cep, cidade, curso_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const parametros = [cpf, nome, sobrenome, email, cep, cidade, curso_id];

        await pool.query(comando, parametros);
    }

    async atualizar(aluno) {
        if (!(aluno instanceof Aluno)) throw new Error("Parâmetro deve ser um objeto Aluno");

        const { cpf, nome, sobrenome, email, cep, cidade, curso_id } = aluno;
        const comando = `
            UPDATE alunos
            SET nome = $2, sobrenome = $3, email = $4, cep = $5, cidade = $6, curso_id = $7
            WHERE cpf = $1
        `;
        const parametros = [cpf, nome, sobrenome, email, cep, cidade, curso_id];

        await pool.query(comando, parametros);
    }

    async excluir(cpf) {
        const comando = `DELETE FROM alunos WHERE cpf = $1`;
        const parametros = [cpf];
        await pool.query(comando, parametros);
    }

    async consultarPorCpf(cpf) {
        const comando = `
            SELECT cpf, nome, sobrenome, email, cep, cidade, curso_id
            FROM alunos
            WHERE cpf = $1
        `;
        const parametros = [cpf];

        const res = await pool.query(comando, parametros);
        return res.rows[0];
    }

    async listarTodos() {
        const comando = `
            SELECT cpf, nome, sobrenome, email, cep, cidade, curso_id
            FROM alunos
            ORDER BY nome
        `;
        const res = await pool.query(comando);
        return res.rows;
    }
}
