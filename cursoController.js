import Curso from "../models/curso.js";

export default class CursoController {
    async criar(req, res) {
        try {
            const { nome, periodo } = req.body;
            const curso = new Curso(0, nome, periodo);
            await curso.gravar();
            res.status(201).json({ message: "Curso criado com sucesso!", curso });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar curso", error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const cursos = await Curso.listarTodos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar cursos", error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, periodo } = req.body;
            const curso = new Curso(id, nome, periodo);
            await curso.atualizar();
            res.status(200).json({ message: "Curso atualizado com sucesso!", curso });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar curso", error: error.message });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const curso = new Curso(id);
            await curso.excluir();
            res.status(200).json({ message: "Curso excluído com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir curso", error: error.message });
        }
    }
    async listartodos(req, res) {
        try {
            const cursos = await Curso.listarTodos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar cursos", error: error.message });
        }
    }
};
