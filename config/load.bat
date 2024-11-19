@echo off

set "target=C:\xampp\htdocs\quickmart"

if exist "%target%" (
    rmdir /s /q "%target%"
)

robocopy . "%target%" /e /njh /njs /ndl /nc /ns /xd .git node_modules resources docs database > nul

@echo on
