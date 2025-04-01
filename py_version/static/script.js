function generarMatrices() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    const contenedor = document.getElementById('matrices');
    contenedor.innerHTML = '';
    
    ['Matriz 1', 'Matriz 2'].forEach((titulo, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${titulo}</h3>`;
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                div.innerHTML += `<input type='number' id='${titulo}_${i}_${j}' value='0'>`;
            }
            div.innerHTML += '<br>';
        }
        contenedor.appendChild(div);
    });
}

function sumarMatrices() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    let matriz1 = [], matriz2 = [];
    
    for (let i = 0; i < filas; i++) {
        matriz1.push([]);
        matriz2.push([]);
        for (let j = 0; j < columnas; j++) {
            matriz1[i].push(Number(document.getElementById(`Matriz 1_${i}_${j}`).value));
            matriz2[i].push(Number(document.getElementById(`Matriz 2_${i}_${j}`).value));
        }
    }
    
    fetch('http://localhost:5000/sumar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(data => {
        let resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = '';
        if (data.resultado) {
            data.resultado.forEach(fila => {
                resultadoDiv.innerHTML += fila.join(' ') + '<br>';
            });
        } else {
            resultadoDiv.innerHTML = 'Hubo un error al sumar las matrices.';
        }
    })
    .catch(error => {
        console.error('Error al hacer la solicitud:', error);
        let resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = 'Hubo un problema con la solicitud al servidor.';
    });
}
