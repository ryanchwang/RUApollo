import subprocess

def scan_bluetooth():
    print("Scanning for Bluetooth devices...")
    
    # Run the blueutil scan command
    result = subprocess.run(["blueutil", "--inquiry"], capture_output=True, text=True)

    output = result.stdout.split("\n")
    devices = [line for line in output if line.strip()]

    print(f"Total devices found: {len(devices)}")
    for device in devices:
        print(device)

    return len(devices)

if __name__ == "__main__":
    num_devices = scan_bluetooth()
    print(f"Estimated number of people in the area: {num_devices}")
