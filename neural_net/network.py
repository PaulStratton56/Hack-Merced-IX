import torch
import torch.nn as nn
from torch import optim
import torch.nn.functional as F

class network(nn.Module):
    def __init__(self):
        super(network, self).__init__()
        self.something = nn.Sequential(
            nn.Linear(21, 32,dtype=float),  # Input layer to first hidden layer
            nn.PReLU(),         # PReLU activation function
            nn.Linear(32, 16,dtype=float),  # First hidden layer to second hidden layer
            nn.ReLU(),          # ReLU activation function
            nn.Linear(16, 8,dtype=float),   # Second hidden layer to third hidden layer
            nn.Tanh(),          # Tanh activation function
            nn.Linear(8, 4,dtype=float),    # Third hidden layer to fourth hidden layer
            nn.ReLU(),          # ReLU activation function
            nn.Linear(4, 1,dtype=float),     # Fourth hidden layer to fifth hidden layer
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.something(x)
