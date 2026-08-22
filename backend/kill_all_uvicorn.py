import psutil
import subprocess

print("Killing all python.exe processes running uvicorn...")
for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
    try:
        if proc.info['name'] == 'python.exe' and proc.info['cmdline']:
            cmdline = ' '.join(proc.info['cmdline'])
            if 'uvicorn' in cmdline or 'app.main' in cmdline:
                print(f"Killing PID {proc.info['pid']}: {cmdline}")
                proc.kill()
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        pass

print("Done killing all uvicorn processes")
