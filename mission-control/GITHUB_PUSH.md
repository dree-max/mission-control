# Push Mission Control to GitHub

## Step 1: Create GitHub Repo
1. Go to: https://github.com/new
2. Repository name: `moonlightai-mission-control`
3. Select: **Public**
4. **Don't** check "Add a README file"
5. Click "Create repository"

## Step 2: Copy this URL:
```
https://github.com/YOUR_USERNAME/moonlightai-mission-control.git
```
(Replace YOUR_USERNAME with your GitHub username)

## Step 3: Run these commands in CMD:

```cmd
cd C:\Users\Uncs\.openclaw\workspace\mission-control

git remote add origin https://github.com/YOUR_USERNAME/moonlightai-mission-control.git

git branch -M main

git push -u origin main
```

## That's it! 🚀

After pushing, go to Vercel:
1. Import the repo
2. Add environment variables:
   - `LINKEDIN_ACCESS_TOKEN` = your token
   - `LINKEDIN_COMPANY_ID` = 110355782
3. Deploy!
