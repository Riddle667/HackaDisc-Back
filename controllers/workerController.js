const { request, response } = require("express");
const Worker = require("../models/Worker");
const Evaluation = require("../models/Evaluation");
const Intervention = require("../models/Intervention");
const Post = require("../models/Post");

const createWorker = async (req = request, res = response) => {
    const { name, companyId, postId } = req.body;

    try {
        const worker = await Worker.create({
            name,
            companyId,
            postId
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

const evaluationWorker = async (req = request, res = response) => {
    const { workerId, adapatability, safeConduct, dynamismEnergy, personalEffectiveness, iniciative, workingUnderPressure, date } = req.body;

    try {
        
        const worker = await Worker.findByPk(workerId);
        
        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found'
            });
        }
        
        
        const evaluation = await Evaluation.create({
            worker_id: workerId,
            adaptability_to_change: adapatability,
            safe_conduct: safeConduct,
            dynamism_energy: dynamismEnergy,
            personal_effectiveness: personalEffectiveness,
            initiative: iniciative,
            working_under_pressure: workingUnderPressure,
            date
        });

        // Refrescar el objeto worker para obtener las evaluaciones actualizadas
        await worker.reload({ include: 'evaluations' });

        // Devolver el trabajador con las evaluaciones actualizadas
        res.status(201).json({
            success: true,
            worker
        });

    } catch (error) {
        console.error('Error creating evaluation:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating evaluation',
            error: error.message // Puedes ajustar el mensaje de error según tus necesidades
        });
    }
}

const getWorkers = async (req = request, res = response) => {

    try {
        if (req.body.companyId) {
            
            const workers = await Worker.findAll({
                where: {
                    companyId: req.body.companyId
                },
                include: [
                    {
                        model: Evaluation,
                        as: 'evaluations'
                    },
                    {
                        model: Intervention,
                        as: 'intervencions' 
                    },
                    {
                        model: Post,
                        as: 'post'
                    }
                ]
            });

            return res.json({
                success: true,
                workers
            });
        }
        const workers = await Worker.findAll({
            include: [
                {
                    model: Evaluation,
                    as: 'evaluations'
                },
                {
                    model: Intervention,
                    as: 'intervencions' 
                }
            ]
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
}

module.exports = {
    getWorkers,
    createWorker,
    evaluationWorker
}