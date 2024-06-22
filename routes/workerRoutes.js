const { Router } = require("express");
const { getWorkers, createWorker, evaluationWorker } = require("../controllers/workerController");
const { check } = require("express-validator");



const router = Router();

router.get("/",[
    check('name', 'Name is required').not().isEmpty(),
    check('companyId', 'Company Id is required').not().isEmpty(),
    check('postId', 'Post Id is required').not().isEmpty(),
] , getWorkers);

router.post("/create_worker",[
    check('name', 'Name is required').not().isEmpty(),
    check('companyId', 'Company Id is required').not().isEmpty(),
    check('postId', 'Post Id is required').not().isEmpty(),
] , createWorker);

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