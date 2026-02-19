@echo off
echo ============================================
echo   Pushing to GitHub
echo ============================================

cd /d "C:\Users\Uncs\.openclaw\workspace\mission-control"

echo Adding remote...
git remote add origin https://github.com/dree-max/my-mission-control.git 2>nul
echo Remote added.

echo.
echo Pushing code...
git branch -M main
git add .
git commit -m "Mission Control Dashboard"
git push -u origin main

echo.
echo ============================================
echo Done! Your repo should now have the code.
echo ============================================
pause
