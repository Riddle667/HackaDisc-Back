const { request, response } = require("express");
const Worker = require("../models/Worker");
const Evaluation = require("../models/Evaluation");
const Intervention = require("../models/Intervention");
const Post = require("../models/Post");

const createWorker = async (req = request, res = response) => {
    const { name, companyId, postId } = req.body;
    console.log(req.body);

    try {
        const worker = await Worker.create({
            name,
            company_id: companyId,
            post_id: postId
        });

        res.status(201).json({
            success: true,
            worker
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
}

const getWorkers = async (req = request, res = response) => {
    const { companyId } = req.body;
    try {
        const includeOptions = [
            {
                model: Evaluation,
                as: 'evaluations'
            },
            {
                model: Intervention,
                as: 'interventions' 
            }
        ];

        if (companyId) {
            includeOptions.push({
                model: Post,
                as: 'post'
            });

            const workers = await Worker.findAll({
                where: {
                    company_id: companyId
                },
                include: includeOptions
            });

            return res.json({
                success: true,
                workers
            });
        }

        const workers = await Worker.findAll({
            include: includeOptions
        });

        res.json({
            success: true,
            workers
        });
    } catch (error) {
        console.error('Error fetching workers with evaluations and interventions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching workers with evaluations and interventions',
            error: error.message
        });
    }
};

const getWorker = async (req = request, res = response) => {

    const { id } = req.body;
    try {
        const worker = await Worker.findByPk(id, {
            include: [
                {
                    model: Evaluation,
                    as: 'evaluations'
                },
                {
                    model: Intervention,
                    as: 'interventions' 
                }
            ]
        });

        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found'
            });
        }

        res.json({
            success: true,
            worker
        });

    } catch (error) {
        console.error('Error fetching worker with evaluations and interventions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching worker with evaluations and interventions',
            error: error.message
        });
    }

}

module.exports = {
    getWorkers,
    getWorker,
    createWorker,
}