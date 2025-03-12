import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user_routes.js'; // Nota el .js al final
import forumRoutes from './routes/forum_routes.js'; // Nota el .js al final
import droneRoutes from './routes/drone_routes.js';
import { corsHandler } from './middleware/corsHandler.js';
import { loggingHandler } from './middleware/loggingHandler.js';
import { routeNotFound } from './middleware/routeNotFound.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Drone from './models/drone_models.js';

dotenv.config(); // Cargamos las variables de entorno desde el archivo .env

const app = express();

const LOCAL_PORT = process.env.SERVER_PORT || 8080;

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'Documentación de la API de Usuarios'
        },
        tags: [
            {
              name: 'Users',
              description: 'Rutas relacionadas con la gestión de usuarios',
            },
            {
              name: 'Forum',
              description: 'Rutas relacionadas con el forum',
            },
            {
              name: 'Main',
              description: 'Rutas principales de la API',
            },
            {
              name: 'Drone',
              description: 'Rutas principales de la API',
              }
          ],
        servers: [
            {
              url: `http://localhost:${LOCAL_PORT}`
            }
        ]
    },
    apis: ['../models/*.js'] // Asegúrate de que esta ruta apunta a tus rutas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());
app.use(loggingHandler);
app.use(corsHandler);

// rutas
app.use('/api', userRoutes);
app.use('/api', forumRoutes);
app.use('/api', droneRoutes);

// Rutes de prova
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// Conexión a MongoDB
// mongoose;
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Skynet-database')
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('DB Connection Error:', error));

// Iniciar el servidor
app.listen(LOCAL_PORT, () => {
    console.log('Server listening on port: ' + LOCAL_PORT);
    console.log(`Swagger disponible a http://localhost:${LOCAL_PORT}/api-docs`);
});