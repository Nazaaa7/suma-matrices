document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matrix-form');
    const matricesContainer = document.getElementById('matrices');
    const resultContainer = document.getElementById('result');

    window.generarMatricesAleatorias = function () {
        matricesContainer.innerHTML = '';
        resultContainer.innerHTML = '';
        
        const filas = parseInt(document.getElementById('filas').value);
        const columnas = parseInt(document.getElementById('columnas').value);

        if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
            alert('Ingrese valores válidos para filas y columnas');
            return;
        }

        // Generar matrices aleatorias
        const tensor1 = tf.randomUniform([filas, columnas], 1, 10, 'int32');
        const tensor2 = tf.randomUniform([filas, columnas], 1, 10, 'int32');

        // Guardarlas en el formulario para la suma
        window.matriz1 = tensor1;
        window.matriz2 = tensor2;

        Promise.all([tensor1.array(), tensor2.array()]).then(([m1, m2]) => {
            matricesContainer.innerHTML = '';
            [m1, m2].forEach((mat, index) => {
                let html = `<h3>Matriz ${index + 1}</h3><table>`;
                mat.forEach(fila => {
                    html += '<tr>' + fila.map(val => `<td>${val}</td>`).join('') + '</tr>';
                });
                html += '</table>';
                matricesContainer.innerHTML += html;
            });
        });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!window.matriz1 || !window.matriz2) {
            alert('Primero genere las matrices.');
            return;
        }

        const suma = window.matriz1.add(window.matriz2);

        suma.array().then(resultado => {
            let html = '<h3>Matriz Resultante (Suma):</h3><table>';
            resultado.forEach(fila => {
                html += '<tr>' + fila.map(val => `<td>${val}</td>`).join('') + '</tr>';
            });
            html += '</table>';
            resultContainer.innerHTML = html;
        });
    });
});
