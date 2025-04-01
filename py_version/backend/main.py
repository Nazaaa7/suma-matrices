from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')  # Asegúrate de que la carpeta 'static' esté en el mismo directorio que este archivo
CORS(app)  # Permite CORS para todas las rutas

@app.route('/')
def home():
    # Redirige a index.html cuando se accede a la raíz
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

@app.route('/sumar', methods=['POST'])
def sumar():
    try:
        datos = request.get_json()
        matriz1 = datos['matriz1']
        matriz2 = datos['matriz2']
        if len(matriz1) != len(matriz2) or len(matriz1[0]) != len(matriz2[0]):
            return jsonify({'error': 'Las matrices deben tener las mismas dimensiones'}), 400
        
        resultado = [[matriz1[i][j] + matriz2[i][j] for j in range(len(matriz1[0]))] for i in range(len(matriz1))]
        return jsonify({'resultado': resultado})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
