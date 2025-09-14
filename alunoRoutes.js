import { Router } from "express";
import AlunoController from "../controllers/alunoController.js";

const router = Router();

const alunoController = new AlunoController();

router.post('/', (req, res) => alunoController.criar(req, res));

router.get('/', (req, res) => alunoController.listar(req, res));
router.put('/:cpf', (req, res) => alunoController.atualizar(req, res));
router.delete('/:cpf', (req, res) => alunoController.excluir(req, res));
router.get('/todos', (req, res) => alunoController.listartodos(req, res));



export default router;
