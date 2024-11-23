@echo off

set "target=C:\xampp\htdocs\quickmart"

if exist "%target%" (
    rmdir /s /q "%target%"
)

mkdir "%target%"
robocopy ./app "%target%/app" /e /njh /njs /ndl /nc /ns /xd > nul
robocopy ./assets "%target%/assets" /e /njh /njs /ndl /nc /ns /xd > nul
robocopy ./config "%target%/config" /e /njh /njs /ndl /nc /ns /xd > nul
robocopy ./public "%target%/public" /e /njh /njs /ndl /nc /ns /xd > nul

@echo on
