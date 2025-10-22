@echo off
echo ====================================
echo ABO AMMAR Perfumes - GitHub Deploy
echo ====================================
echo.

cd /d "%~dp0"

echo Initializing Git repository...
git init

echo.
echo Setting up Git configuration...
git config user.name "ABO AMMAR Perfumes"
git config user.email "contact@aboammar.com"

echo.
echo Adding files...
git add .

echo.
echo Creating commit...
git commit -m "Initial commit: ABO AMMAR Perfumes Website - Luxury perfume e-commerce with 2000+ products"

echo.
echo ====================================
echo Git repository initialized!
echo ====================================
echo.
echo Next steps:
echo 1. Create a new repository on GitHub.com
echo 2. Copy the repository URL
echo 3. Run these commands:
echo.
echo    git remote add origin YOUR_GITHUB_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo ====================================
pause
