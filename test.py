import asyncio
from bleak import BleakScanner

async def scan():
    print("Listening for Bluetooth signals...")
    devices = await BleakScanner.discover()
    if devices:
        print(devices)
        print("Bluetooth activity detected!")
    else:
        print("No Bluetooth activity nearby.")

asyncio.run(scan())