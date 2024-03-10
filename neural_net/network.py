import torch
import torch.nn as nn
from torch import optim
import torch.nn.functional as F

class network(nn.Module):
    def __init__(self):
        super(network, self).__init__()
        self.layer1 = nn.Sequential(
            nn.Linear(22, 32),  
            nn.PReLU(),         
        )
        self.layer2 = nn.Sequential(
            nn.Linear(32, 64),
            nn.ReLU(),          
        )
        self.layer3 = nn.Sequential(
            nn.Linear(64, 64), 
            nn.Tanh(),          
        )
        self.layer4 = nn.Sequential(
            nn.Linear(64, 64),
            nn.PReLU()
        )
        self.layer5 = nn.Sequential(
            nn.Linear(64, 64),  
            nn.ReLU(),          
        )
        self.layer6 = nn.Sequential(
            nn.Linear(64, 32),   
            nn.PReLU(),          
        )
        self.layer7 = nn.Sequential(
            nn.Linear(32, 16),  
            nn.Sigmoid()
        )
        self.layer8 = nn.Sequential(
            nn.Linear(16, 1),  
            nn.Sigmoid()
        )

    def forward(self, x):
        l1 = self.layer1(x)
        l2 = self.layer2(l1)
        l3 = self.layer3(l2)
        l4 = self.layer4(l3)+l2
        l5 = self.layer5(l4)+l3
        l6 = self.layer6(l5)+l1
        l7 = self.layer7(l6)
        l8 = self.layer8(l7)
        return l8
