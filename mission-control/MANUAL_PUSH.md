# Manual Push Steps

The automated script didn't work. Please run these commands manually in CMD:

## Step 1: Open CMD
Press Windows + R, type `cmd`, press Enter

## Step 2: Run these commands (one at a time):

```cmd
cd C:\Users\Uncs\.openclaw\workspace\mission-control
```

```cmd
git init
```

```cmd
git add .
```

```cmd
git commit -m "Mission Control Dashboard"
```

```cmd
git remote add origin https://github.com/dree-max/my-mission-control.git
```

```cmd
git branch -M main
```

```cmd
git push -u origin main
```

---

## If git is not found:

Download Git from: https://git-scm.com/download/win

Then run the commands above.
