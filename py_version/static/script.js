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

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const filas = parseInt(document.getElementById('filas').value);
        const columnas = parseInt(document.getElementById('columnas').value);
        
        const matriz1 = [];
        const matriz2 = [];
        
        for (let i = 0; i < filas; i++) {
            matriz1.push([]);
            matriz2.push([]);
            for (let j = 0; j < columnas; j++) {
                const val1 = parseFloat(document.getElementById(`m1-${i}-${j}`).value);
                const val2 = parseFloat(document.getElementById(`m2-${i}-${j}`).value);
                
                if (isNaN(val1) || isNaN(val2)) {
                    alert('Todos los valores deben ser números');
                    return;
                }
                
                matriz1[i].push(val1);
                matriz2[i].push(val2);
            }
        }

        try {
            const response = await fetch('http://localhost:5000/sumar-matrices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matriz1, matriz2 })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                alert(data.error);
                return;
            }
            
            resultContainer.innerHTML = '<h3>Matriz Resultante:</h3>' +
                '<table>' +
                data.resultado.map(row => `<tr>${row.map(val => `<td>${val}</td>`).join('')}</tr>`).join('') +
                '</table>';
        } catch (error) {
            alert('Error al conectar con el servidor: ' + error.message);
        }
    });
});
