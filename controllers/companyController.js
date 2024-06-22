const { response, request } = require("express");
const Company = require("../models/Company");



const createCompany = async (req = request, res = response) => {
    try {
        const { name, main } = req.body;
        const company = await Company.create({
            name,
            main
        });
        res.json({
            success: true,
            company
        });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating company',
            error: error.message
        });
    }
}

const getCompanies = async (req = request, res = response) => {
    try {
        const companies = await Company.findAll(
            {
                where: {
                    main: true
                },
                include: [
                    {
                        model: Company,
                        as: 'SubCompanies'
                    }
                ]
            }
        );
        res.json({
            success: true,
            companies
        });
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching companies',
            error: error.message
        });
    }
}

module.exports = {
    createCompany,
    getCompanies
}