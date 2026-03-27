@echo off
echo.
echo ==========================================
echo     AXIAR INTELLIGENCE PLATFORM
echo         DEVELOPMENT MODE
echo ==========================================
echo.
echo Sadece frontend başlatılıyor...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js bulunamadı!
    echo Lütfen Node.js kurun: https://nodejs.org/
    pause
    exit /b 1
)

:: Quick check for dependencies
if not exist "client\node_modules" (
    echo Frontend bağımlılıkları kuruluyor...
    cd client
    npm install
    if %errorlevel% neq 0 (
        echo [HATA] Bağımlılıklar kurulamadı!
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Bağımlılıklar kuruldu.
)

:: Start development server
echo.
echo Development server başlatılıyor...
echo Browser otomatik açılacak: http://localhost:5173
echo.
echo Durdurmak için: CTRL + C
echo.

cd client
npm run dev

pause
