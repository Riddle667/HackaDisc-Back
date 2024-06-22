require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('./database/connection');
const Worker = require('./models/Worker');
const Area = require('./models/Area');
const Company = require('./models/Company');
const Intervention = require('./models/Intervention');
const Multicompany = require('./models/Multicompany');
const Post = require('./models/Post');
const Evaluation = require('./models/Evaluation');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app);

        this.paths = {
            auth: '/api/auth',
            worker: '/api/worker',
            company: '/api/company',
            area: '/api/area',
            post: '/api/post',
            evaluation: '/api/evaluation',
            intervention: '/api/intervention'
        };

        this.dbConnection(); 

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            await Company.sync({ force: false });
            await Multicompany.sync({ force: false });
            await Area.sync({ force: false });
            await Post.sync({ force: false });
            await Worker.sync({ force: false });
            await Evaluation.sync({ force: false });
            await Intervention.sync({ force: false });
            console.log('Database online');
        } catch (error) {
            console.error('Unable to connect to the database:', error); // Imprime el error completo
            throw new Error('Error connecting to the database');
        }
    }
    
    middlewares() {
        // Morgan
        this.app.use(logger('dev'));

        // Read and parse body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }
    
    routes() {
        this.app.use( this.paths.worker, require('./routes/workerRoutes'));
        this.app.use( this.paths.company, require('./routes/companyRoutes'));
        this.app.use( this.paths.evaluation, require('./routes/evaluationRoutes'));
    }
    
    listen() {
        this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
        });
    }

}

module.exports = Server;