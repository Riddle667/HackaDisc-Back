const { Router } = require("express");
const { check } = require("express-validator");
const { evaluationWorker } = require("../controllers/evaluationController");



const router = Router();

//Crear una evaluacion para un trabajador
router.post("/create_evaluation",[
    check('workerId', 'Worker Id is required').not().isEmpty(),
    check('adaptability', 'Adaptability is required').not().isEmpty(),
    check('safeConduct', 'Safe Conduct is required').not().isEmpty(),
    check('dynamismEnergy', 'Dynamism Energy is required').not().isEmpty(),
    check('personalEffectiveness', 'Personal Effectiveness is required').not().isEmpty(),
    check('iniciative', 'Iniciative is required').not().isEmpty(),
    check('workingUnderPressure', 'Working Under Pressure is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
] , evaluationWorker);


module.exports = router;