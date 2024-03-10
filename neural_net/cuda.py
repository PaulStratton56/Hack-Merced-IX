import torch

if torch.cuda.is_available():
    print("CUDA is available. GPU support is enabled.")
else:
    print("CUDA is not available. GPU support is not enabled.")

# print(torch.cuda.is_available())
# print(torch.cuda.current_device())
# print(torch.cuda.get_device_name(0))