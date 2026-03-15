@echo off
echo [ELITE BMW] Terminating any existing node processes on port 5001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5001') do taskkill /f /pid %%a
echo [ELITE BMW] Starting fresh backend server...
cd c:\Users\Paresh\cycle\backend
node server.js
pause
