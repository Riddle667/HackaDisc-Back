const { Router } = require("express");
const { createCompany, getCompanies } = require("../controllers/companyController");
const { check } = require("express-validator");



const router = Router();

router.post("/company", getCompanies)

router.post("/create_company",[
    check('name', 'Name is required').not().isEmpty(),
    check('main', 'Main is required').not().isEmpty(),
], createCompany );

module.exports = router;