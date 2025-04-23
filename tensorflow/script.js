document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('matrix-form');
    const matricesContainer = document.getElementById('matrices');
    const resultContainer = document.getElementById('result');

    window.generarInputs = function () {
        matricesContainer.innerHTML = '';
        const filas = parseInt(document.getElementById('filas').value);
        const columnas = parseInt(document.getElementById('columnas').value);

        if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
            alert('Ingrese valores válidos para filas y columnas');
            return;
        }

        for (let m = 1; m <= 2; m++) {
            let matrizHTML = `<h3>Matriz ${m}</h3><table>`;
            for (let i = 0; i < filas; i++) {
                matrizHTML += '<tr>';
                for (let j = 0; j < columnas; j++) {
                    matrizHTML += `<td><input type="number" id="m${m}-${i}-${j}" required></td>`;
                }
                matrizHTML += '</tr>';
            }
            matrizHTML += '</table>';
            matricesContainer.innerHTML += matrizHTML;
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const filas = parseInt(document.getElementById('filas').value);
        const columnas = parseInt(document.getElementById('columnas').value);

        const matriz1 = [];
        const matriz2 = [];

        for (let i = 0; i < filas; i++) {
            const fila1 = [];
            const fila2 = [];
            for (let j = 0; j < columnas; j++) {
                const val1 = parseFloat(document.getElementById(`m1-${i}-${j}`).value);
                const val2 = parseFloat(document.getElementById(`m2-${i}-${j}`).value);

                if (isNaN(val1) || isNaN(val2)) {
                    alert('Todos los valores deben ser números');
                    return;
                }

                fila1.push(val1);
                fila2.push(val2);
            }
            matriz1.push(fila1);
            matriz2.push(fila2);
        }

        // Convertimos a tensores y sumamos
        const tensor1 = tf.tensor2d(matriz1);
        const tensor2 = tf.tensor2d(matriz2);
        const suma = tensor1.add(tensor2);

        // Convertimos a array para mostrar
        suma.array().then(resultado => {
            let html = '<h3>Matriz Resultante:</h3><table>';
            resultado.forEach(fila => {
                html += '<tr>' + fila.map(val => `<td>${val}</td>`).join('') + '</tr>';
            });
            html += '</table>';
            resultContainer.innerHTML = html;
        });
    });
});
