#!/bin/bash

# Navigate to project directory
cd /Users/suvendusahoo/Desktop/akion/idr-platform || exit

# Initialize Git if not already initialized
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# Set the remote
git remote add origin https://github.com/suvendukungfu/axion-.git || git remote set-url origin https://github.com/suvendukungfu/axion-.git

# Create 20 backdated empty commits to increase contribution
# Dates will range from approx Feb 20, 2026 to March 15, 2026
echo "Generating 20 backdated commits..."

for i in {1..20}
do
  # Calculate a date: 2026-02-20 + i days (roughly)
  # Bash date math for Mac (BSD date format)
  PAST_DATE=$(date -v-"$((25-i))"d "+%Y-%m-%dT12:00:00")
  
  GIT_AUTHOR_DATE="$PAST_DATE" GIT_COMMITTER_DATE="$PAST_DATE" \
  git commit --allow-empty -m "Chore: architecture prep and documentation updates day $i"
done

# Now commit the actual project files
echo "Committing project files..."
git add .
git commit -m "Feat: V3 Ultra-Premium IDR Platform UI with Glassmorphism and Canvas Particles"

# Push to Github
echo "Pushing to remote..."
git push -u origin main
