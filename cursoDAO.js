import Curso from "../models/curso.js";
import pool from "../DB/conexao.js";

export default class CursoDAO {

    async gravar(curso) {
        if (!(curso instanceof Curso)) throw new Error("Parâmetro deve ser um objeto Curso");

        const { nome, periodo } = curso;
        const comando = `
            INSERT INTO cursos (nome, periodo)
            VALUES ($1, $2)
            RETURNING id
        `;
        const valores = [nome, periodo];

        try {
            const result = await pool.query(comando, valores);
            curso.id = result.rows[0].id; 
        } catch (error) {
            console.error("Erro ao gravar curso:", error);
            throw error;
        }
    }

    async alterar(curso) {
        if (!(curso instanceof Curso)) throw new Error("Parâmetro deve ser um objeto Curso");

        const { id, nome, periodo } = curso;
        const comando = `
            UPDATE cursos
            SET nome = $2, periodo = $3
            WHERE id = $1
        `;
        const parametros = [id, nome, periodo];

        try {
            await pool.query(comando, parametros);
        } catch (error) {
            console.error("Erro ao alterar curso:", error);
            throw error;
        }
    }

    async excluir(id) {
        const comando = `DELETE FROM cursos WHERE id = $1`;
        const parametros = [id];

        try {
            await pool.query(comando, parametros);
        } catch (error) {
            console.error("Erro ao excluir curso:", error);
            throw error;
        }
    }

    async consultar(id) {
        const comando = `
            SELECT id, nome, periodo
            FROM cursos
            WHERE id = $1
        `;
        const parametros = [id];

        try {
            const res = await pool.query(comando, parametros);
            return res.rows[0] || null;
        } catch (error) {
            console.error("Erro ao consultar curso:", error);
            throw error;
        }
    }

    async listarTodos() {
        const comando = `
            SELECT id, nome, periodo
            FROM cursos
            ORDER BY nome
        `;

        try {
            const res = await pool.query(comando);
            return res.rows;
        } catch (error) {
            console.error("Erro ao listar cursos:", error);
            throw error;
        }
    }
}

