@echo off
echo.
echo ==========================================
echo     AXIAR INTELLIGENCE PLATFORM
echo ==========================================
echo.
echo Proje başlatılıyor...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js bulunamadı!
    echo Lütfen Node.js kurun: https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] npm bulunamadı!
    echo Lütfen npm kurun veya güncelleyin.
    pause
    exit /b 1
)

:: Install dependencies if node_modules doesn't exist
if not exist "client\node_modules" (
    echo [1/3] Frontend bağımlılıkları kuruluyor...
    cd client
    npm install
    if %errorlevel% neq 0 (
        echo [HATA] Frontend bağımlılıkları kurulamadı!
        pause
        exit /b 1
    )
    cd ..
    echo ✅ Frontend bağımlılıkları kuruldu.
)

if not exist "node_modules" (
    echo [2/3] Root bağımlılıkları kuruluyor...
    npm install
    if %errorlevel% neq 0 (
        echo [HATA] Root bağımlılıkları kurulamadı!
        pause
        exit /b 1
    )
    echo ✅ Root bağımlılıkları kuruldu.
)

:: Start Supabase (optional)
echo [3/3] Supabase başlatılıyor...
start "Supabase" cmd /k "supabase start"

:: Wait a bit for Supabase to start
timeout /t 5 /nobreak >nul

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
