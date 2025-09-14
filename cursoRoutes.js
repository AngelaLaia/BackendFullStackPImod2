import { Router } from "express";
import CursoController from "../controllers/cursoController.js";

const router = Router();
const cursoController = new CursoController();
router.post('/', (req, res) => cursoController.criar(req, res));
router.get('/', (req, res) => cursoController.listar(req, res));
router.put('/:id', (req, res) => cursoController.atualizar(req, res));
router.delete('/:id', (req, res) => cursoController.excluir(req, res));
router.get('/todos', (req, res) => cursoController.listartodos(req, res));

export default router;
