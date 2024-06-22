const { Router } = require("express");
const { createCompany, getCompanies, createSubCompany } = require("../controllers/companyController");
const { check } = require("express-validator");



const router = Router();

//Obtener todas las compañias
router.get("/company", getCompanies)

//Crear una compañia
router.post("/create_company",[
    check('name', 'Name is required').not().isEmpty(),
    check('main', 'Main is required').not().isEmpty(),
], createCompany );

//Crear una subcompañia
router.post("/create_subcompany",[
    check('name', 'Name is required').not().isEmpty(),
    check('main', 'Main is required').not().isEmpty(),
    check('companyId', 'Main company Id is required').not().isEmpty(),
], createSubCompany );

module.exports = router;