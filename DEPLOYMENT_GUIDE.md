# 🚀 NetEngineer.io — GitHub Pages Live Deployment Guide

This guide will walk you through deploying your personal network engineering website to **GitHub Pages** so you have a live, publicly accessible website (e.g. `https://yourusername.github.io/ccna-encor-guide/`) with automatic daily updates.

---

## 📋 Prerequisites
1. A free [GitHub Account](https://github.com).
2. Git installed on your computer (already installed on your machine!).

---

## 🛠️ Step-by-Step Deployment Instructions

### Step 1: Initialize Git in your project folder
Open PowerShell in this project folder (`c:\Users\abdul-azeez.sulaimon\Downloads\CCNA`) and run:

```powershell
# Set your Git username and email (if not already set)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: Initial commit for NetEngineer CCNA & ENCOR visual platform"

# Rename branch to main
git branch -M main
```

---

### Step 2: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Choose a repository name, for example:
   - `netengineer-playbook` (or `ccna-encor-visual`, or `netengineer`)
   - *Note*: If you name it `yourusername.github.io`, your site will be hosted directly at `https://yourusername.github.io/`!
3. Leave it **Public** (required for free GitHub Pages).
4. Do **NOT** check "Initialize this repository with a README" (we already have one).
5. Click **Create repository**.

---

### Step 3: Link and Push your code to GitHub
Copy the commands shown on your new GitHub repo page and run them in PowerShell:

```powershell
# Add your GitHub remote (replace YOUR-USERNAME and YOUR-REPO-NAME with yours)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push your files to GitHub
git push -u origin main
```

---

### Step 4: Enable GitHub Pages
1. On your GitHub repository page, click the **Settings** tab (gear icon at the top).
2. On the left sidebar menu, click **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Option A (GitHub Actions - Recommended)**:
     - Set **Source** to `GitHub Actions`.
     - The included `.github/workflows/deploy.yml` workflow will automatically trigger, build, and publish the site!
   - **Option B (Classic Branch)**:
     - Set **Source** to `Deploy from a branch`.
     - Under **Branch**, select `main` and folder `/ (root)`.
     - Click **Save**.
4. Wait 60–90 seconds. Refresh the Settings > Pages page.
5. You will see a banner:
   > **"Your site is live at https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"** 🌐

---

## 🔄 How the "Daily Update" Works

Your website has two layers of daily updating:

1. **Client-Side Real-Time Calendar Engine (`js/daily.js`)**:
   - Whenever any visitor opens the website, the engine automatically checks the current calendar date and displays the corresponding "Daily Concept Spotlight", "Cisco Command of the Day", and "Daily Exam Challenge".
   - Visitors can also click **◀ Prev Day** and **Next Day ▶** to explore any day in the curriculum.

2. **Automated GitHub Action Cron Job (`.github/workflows/daily-update.yml`)**:
   - Runs automatically in the cloud every day at 00:00 UTC.
   - Pushes an automated timestamp commit (`daily-status.json`) to keep your GitHub contribution graph active and ensure your deployment cache is always fresh.

---

## 🎨 How to Personalize Your Website

- **Your Name & Bio**: Open [`index.html`](file:///c:/Users/abdul-azeez.sulaimon/Downloads/CCNA/index.html) and search for `Abdul-Azeez Sulaimon`. You can update your bio, LinkedIn link, and GitHub handle.
- **Add New CCNA Topics**: Open [`js/topics-ccna.js`](file:///c:/Users/abdul-azeez.sulaimon/Downloads/CCNA/js/topics-ccna.js) and add new objects to the `CCNA_TOPICS` array.
- **Add New ENCOR Topics**: Open [`js/topics-encor.js`](file:///c:/Users/abdul-azeez.sulaimon/Downloads/CCNA/js/topics-encor.js) and add new objects to the `ENCOR_TOPICS` array.
- **Add Daily Concepts**: Open [`js/daily.js`](file:///c:/Users/abdul-azeez.sulaimon/Downloads/CCNA/js/daily.js) and append entries to `DAILY_CATALOG`.

---

## 🧪 Testing Locally (Zero Setup)
Because this project uses modern standard ES & SVG architecture with zero build tools required:
- Simply double-click [`index.html`](file:///c:/Users/abdul-azeez.sulaimon/Downloads/CCNA/index.html) in your file manager to open it in Google Chrome, Microsoft Edge, or Firefox. Everything works instantly offline and online!
