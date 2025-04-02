from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite peticiones desde cualquier origen

@app.route('/sumar-matrices', methods=['POST'])
def sumar_matrices():
    try:
        data = request.get_json()
        matriz1 = data.get('matriz1')
        matriz2 = data.get('matriz2')

        if not matriz1 or not matriz2:
            return jsonify({"error": "Las matrices son necesarias"}), 400

        # Verificar si las matrices tienen las mismas dimensiones
        if len(matriz1) != len(matriz2) or len(matriz1[0]) != len(matriz2[0]):
            return jsonify({"error": "Las matrices deben tener las mismas dimensiones"}), 400

        resultado = [[matriz1[i][j] + matriz2[i][j] for j in range(len(matriz1[0]))] for i in range(len(matriz1))]
        
        return jsonify({"resultado": resultado})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
