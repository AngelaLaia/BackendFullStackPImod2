import Aluno from "../models/aluno.js";

export default class AlunoController {
    async criar(req, res) {
        try {
            const { cpf, nome, sobrenome, email, cep, cidade, curso_id  } = req.body;
            const aluno = new Aluno(cpf, nome, sobrenome, email, cep, cidade, curso_id);
            await aluno.gravar();
            res.status(201).json({ message: "Aluno criado com sucesso!", aluno });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar aluno", error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const alunos = await Aluno.listarTodos();
            res.status(200).json(alunos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar alunos", error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { cpf } = req.params;
            const { nome, sobrenome, email, cep, cidade,curso_id } = req.body;
            const aluno = new Aluno(cpf, nome, sobrenome, email, cep, cidade, curso_id);
            await aluno.atualizar();
            res.status(200).json({ message: "Aluno atualizado com sucesso!", aluno });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar aluno", error: error.message });
        }
    }

    async excluir(req, res) {
        try {
            const { cpf } = req.params;
            const aluno = new Aluno(cpf);
            await aluno.excluir();
            res.status(200).json({ message: "Aluno excluído com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir aluno", error: error.message });
        }
    }
    async listartodos(req, res) {
        try {
            const alunos = await Aluno.listarTodos();
            res.status(200).json(alunos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar alunos", error: error.message });
        }

    }
};
