# GitHub & Vercel Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** button (top right) → **"New repository"**
3. Fill in the details:
   - **Repository name**: `abo-ammar-perfumes`
   - **Description**: `ABO AMMAR Perfumes - Luxury perfume e-commerce website`
   - **Visibility**: Public
   - **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

## Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd "D:\abo ammar\website"

# Add GitHub as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/abo-ammar-perfumes.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository: `abo-ammar-perfumes`
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Click **"Deploy"**

Vercel will automatically:
- Build and deploy your website
- Provide a live URL (e.g., `abo-ammar-perfumes.vercel.app`)
- Auto-deploy on every GitHub push

## Step 4: Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Your Website Features

✅ **2,144 Products** - Complete catalog
✅ **Bilingual** - Arabic & English
✅ **Search & Filter** - By name or brand
✅ **PDF Download** - Full catalog export
✅ **WhatsApp** - Direct contact (+201032637495)
✅ **Responsive** - Mobile & desktop
✅ **Luxury Design** - Gold & black theme

## Support

If you need help, the website is ready to deploy!

### Quick Commands Reference

```bash
# View git status
git status

# Add new changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# View commit history
git log --oneline
```

---

**Your website is ready to go live! 🚀**
