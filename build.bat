@echo off
echo.
echo ==========================================
echo     AXIAR INTELLIGENCE PLATFORM
echo           BUILD MODE
echo ==========================================
echo.
echo Proje build ediliyor...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js bulunamadı!
    echo Lütfen Node.js kurun: https://nodejs.org/
    pause
    exit /b 1
)

:: Install dependencies if needed
if not exist "client\node_modules" (
    echo Bağımlılıklar kuruluyor...
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

:: Clean previous build
echo Önceki build temizleniyor...
if exist "client\dist" (
    rmdir /s /q "client\dist"
    echo ✅ dist klasörü temizlendi.
)

:: Build the project
echo.
echo Build işlemi başlatılıyor...
cd client
npm run build

if %errorlevel% neq 0 (
    echo.
    echo [HATA] Build başarısız oldu!
    echo Lütfen hata mesajlarını kontrol edin.
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Build başarıyla tamamlandı!
echo.
echo Build dosyaları: client\dist\
echo.
echo Preview başlatmak için: npm run preview
echo.

:: Ask if user wants to preview
set /p preview="Preview başlatılsın mı? (E/H): "
if /i "%preview%"=="E" (
    echo.
    echo Preview başlatılıyor...
    cd client
    npm run preview
    cd ..
)

pause
