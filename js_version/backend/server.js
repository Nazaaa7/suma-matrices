import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Ruta para sumar matrices
app.post('/sumar-matrices', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    if (!Array.isArray(matriz1) || !Array.isArray(matriz2)) {
        return res.status(400).json({ error: 'Las matrices deben ser arreglos' });
    }

    const filas = matriz1.length;
    const columnas = matriz1[0].length;

    if (filas !== matriz2.length || columnas !== matriz2[0].length) {
        return res.status(400).json({ error: 'Las matrices deben tener el mismo tamaño' });
    }

    const resultado = matriz1.map((fila, i) => fila.map((num, j) => num + matriz2[i][j]));

    res.json({ resultado });
});

// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
