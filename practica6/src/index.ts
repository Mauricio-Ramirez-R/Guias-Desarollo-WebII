import express from 'express';
import routes from './routes';
import { connectBD } from './config/db';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/', routes);

const startServer = async () => {
    await connectBD(); 

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};

startServer();

export default app;
