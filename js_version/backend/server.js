import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sumar', (req, res) => {
    const { matriz1, matriz2 } = req.body;
    const resultado = matriz1.map((fila, i) => fila.map((num, j) => num + matriz2[i][j]));
    res.json({ resultado });
});

app.listen(5000, () => console.log('Servidor en http://localhost:5000'));