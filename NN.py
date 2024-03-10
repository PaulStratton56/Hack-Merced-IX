from flask import (Flask, request)
import torch
import numpy as np
import torch.nn as nn
from torch import optim
import torch.nn.functional as F
import json
from neural_net.network import network
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/queryNetwork", methods=["POST"])
def query():
    model = network().to("cpu")
    data = torch.tensor(np.array(json.loads(request.data)), dtype=torch.float32)
    model.eval()
    with torch.no_grad():
        data = data.to("cpu")
        output = model(data)

    returnValue = float(output[0])
    print(returnValue)

    return json.dumps({"value": returnValue})

if __name__ == "__main__":
    app.run()
