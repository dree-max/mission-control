@echo off
set GH_TOKEN=your_github_token_here

echo Creating GitHub repo...

curl -X POST -H "Authorization: token %GH_TOKEN%" -H "Accept: application/vnd.github.v3+json" https://api.github.com/user/repos -d "{\"name\":\"moonlightai-mission-control\",\"description\":\"Mission Control Dashboard for MoonlightAI\",\"private\":false}"

echo.
echo Repo created! Now pushing code...
echo.

cd /d "%~dp0"

git remote add origin https://github.com/dree-max/moonlightai-mission-control.git 2>nul
git branch -M main
git add .
git commit -m "Mission Control Dashboard - Initial commit" 2>nul
git push -u origin main

echo.
echo Done!
pause
