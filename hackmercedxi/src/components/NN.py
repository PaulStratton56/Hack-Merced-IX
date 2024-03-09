from flask import (Flask, request)
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/queryNetwork", methods=["POST"])
def query():
    data = json.loads(request.data)
    print(data)
    return "69"

if __name__ == "__main__":
    app.run()
