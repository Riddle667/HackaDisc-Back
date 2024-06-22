const { request, response } = require("express");
const Worker = require("../models/Worker");
const Evaluation = require("../models/Evaluation");



const evaluationWorker = async (req = request, res = response) => {
    const { workerId, adaptability, safeConduct, dynamismEnergy, personalEffectiveness, iniciative, workingUnderPressure, date } = req.body;
    console.log(req.body);
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
            adaptablity_to_change: adaptability,
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

module.exports = {
    evaluationWorker
}