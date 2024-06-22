const { Router } = require("express");
const { getWorkers, createWorker, evaluationWorker, getWorker } = require("../controllers/workerController");
const { check } = require("express-validator");



const router = Router();

//Obtener todos los trabajadores y si se envia la id de compañia, se obtienen los trabajadores de esa compañia
router.get("/",[
    check('name', 'Name is required').not().isEmpty(),
    check('companyId', 'Company Id is required').not().isEmpty(),
    check('postId', 'Post Id is required').not().isEmpty(),
] , getWorkers);

//Obtener un trabajador por id
router.get("/get_worker",[
    check('id', 'Id is required').not().isEmpty(),
], getWorker);

//Crear un trabajador
router.post("/create_worker",[
    check('name', 'Name is required').not().isEmpty(),
    check('companyId', 'Company Id is required').not().isEmpty(),
    check('postId', 'Post Id is required').not().isEmpty(),
] , createWorker);


module.exports = router;