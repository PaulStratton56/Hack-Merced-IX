import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Device: {device}")

# Load the CSV file
data = pd.read_csv('diabetes_012_health_indicators_BRFSS2015.csv')

# Split the data into features and labels
X = data.drop(columns=['Diabetes_012'])  # Assuming 'diabetes_risk' is the column to predict
y = data['Diabetes_012']

# Convert data to PyTorch tensors
X_tensor = torch.tensor(X.values, dtype=torch.float32)
y_tensor = torch.tensor(y.values, dtype=torch.float32)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_tensor, y_tensor, test_size=0.2, random_state=42)

# Define the neural network architecture
class DiabetesNN(nn.Module):
    def __init__(self):
        super(DiabetesNN, self).__init__()
        self.fc1 = nn.Linear(X_train.shape[1], 64)  # Input layer to hidden layer
        self.fc2 = nn.Linear(64, 32)  # Hidden layer to output layer
        self.fc3 = nn.Linear(32, 1)  # Output layer (1 output neuron for regression)

    def forward(self, x):
        x = torch.relu(self.fc1(x))  # ReLU activation function for the first layer
        x = torch.relu(self.fc2(x))  # ReLU activation function for the second layer
        x = self.fc3(x)  # No activation function for the output layer (linear activation)
        return x

# Initialize the model, loss function, and optimizer
model = DiabetesNN()
criterion = nn.MSELoss()  # Mean Squared Error loss for regression
optimizer = optim.Adam(model.parameters(), lr=0.001)  # Adam optimizer

# Train the model
epochs = 100000
for epoch in range(epochs):
    optimizer.zero_grad()  # Zero the gradients
    outputs = model(X_train)  # Forward pass
    loss = criterion(outputs, y_train.unsqueeze(1))  # Calculate the loss
    loss.backward()  # Backward pass
    optimizer.step()  # Update weights

    if (epoch+1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

# Evaluate the model
with torch.no_grad():
    predictions = model(X_test)
    test_loss = criterion(predictions, y_test.unsqueeze(1))
    print(f'Test Loss: {test_loss.item():.4f}')
