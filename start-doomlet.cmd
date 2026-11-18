@echo off
rem Chay Doomlet o che do nen (khong cua so console). Lan dau se tu cai Electron.
cd /d "%~dp0"
if not exist node_modules\electron\dist\electron.exe (
  echo Dang cai Electron lan dau, doi chut...
  call npm install --no-audit --no-fund
)
start "" "%~dp0node_modules\electron\dist\electron.exe" "%~dp0."
exit
