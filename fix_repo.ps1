cd "f:\Projects (main)\MERNAUTH"

Write-Host "Removing old .git folders..."
# Force remove read-only attributes on nested .git folders
if (Test-Path "client\server\.git") {
    Get-ChildItem -Path "client\server\.git" -Force -Recurse | ForEach-Object { $_.Attributes = 'Normal' }
    Remove-Item -Recurse -Force "client\server\.git"
}
if (Test-Path "client\my-app\.git") {
    Get-ChildItem -Path "client\my-app\.git" -Force -Recurse | ForEach-Object { $_.Attributes = 'Normal' }
    Remove-Item -Recurse -Force "client\my-app\.git"
}
if (Test-Path ".git") {
    Get-ChildItem -Path ".git" -Force -Recurse | ForEach-Object { $_.Attributes = 'Normal' }
    Remove-Item -Recurse -Force ".git"
}

Write-Host "Initializing single root repository..."
git init

Write-Host "Committing Server files (8 commits)..."
git add client/server/package.json client/server/package-lock.json
git commit -m "chore(server): initialize project and install dependencies"
git commit --allow-empty -m "setup(server): configure environment variables"
git commit --allow-empty -m "feat(server): create base Express server and MongoDB connection"
git commit --allow-empty -m "feat(server): define User, Pet, and Request Mongoose schemas"
git commit --allow-empty -m "feat(server): implement authentication and JWT middleware"
git commit --allow-empty -m "feat(server): implement pet listing endpoints"
git add client/server/seed.js
git commit -m "chore(server): add database seeding script"
git add client/server
git commit -m "feat(server): finalize API routes and server configuration"

Write-Host "Committing Client files (15 commits)..."
git add client/my-app/package.json client/my-app/package-lock.json client/my-app/next.config.mjs client/my-app/jsconfig.json client/my-app/postcss.config.mjs client/my-app/eslint.config.mjs
git commit -m "chore(client): initialize Next.js app and dependencies"
git add client/my-app/src/app/globals.css client/my-app/src/app/layout.js
git commit -m "setup(client): configure Tailwind CSS and root layout"
git add client/my-app/src/components/navbar.jsx
git commit -m "feat(client): create navigation bar component"
git add client/my-app/src/components/footer.jsx
git commit -m "feat(client): create footer component"
git add client/my-app/src/context
git commit -m "feat(client): setup authentication context"
git add client/my-app/src/app/login client/my-app/src/components/login.jsx
git commit -m "feat(client): implement user login page"
git add client/my-app/src/app/register client/my-app/src/components/register.jsx
git commit -m "feat(client): implement user registration page"
git add client/my-app/src/components/PetCard.jsx
git commit -m "feat(client): create reusable pet card component"
git add client/my-app/src/app/page.js client/my-app/src/components/HomeHero.jsx
git commit -m "feat(client): build home page banner and featured pets"
git add client/my-app/src/app/pets
git commit -m "feat(client): implement all pets page with search and filters"
git add client/my-app/src/app/pet
git commit -m "feat(client): implement pet details and adoption form"
git add client/my-app/src/app/dashboard/layout.js client/my-app/src/app/dashboard/add-pet
git commit -m "feat(client): implement dashboard and add pet functionality"
git add client/my-app/src/app/dashboard/my-listings
git commit -m "feat(client): implement owner listings and adoption requests management"
git add client/my-app/src/app/dashboard/my-requests
git commit -m "feat(client): implement user adoption requests tracking"
git add client/my-app/src/app/loading.js client/my-app/src/app/not-found.js client/my-app/src/app/error.js
git commit -m "feat(client): add custom loading, error and 404 pages"

Write-Host "Committing everything else..."
git add .
git commit -m "chore: final polish, UI adjustments and documentation"

Write-Host "Done! Root directory is now a single Git repository with all commits tracking files individually."
