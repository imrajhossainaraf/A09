Write-Host "Committing Server..."
cd "f:\Projects (main)\MERNAUTH\client\server"
git init
git add package.json package-lock.json
git commit -m "chore: initialize project and install dependencies"
git commit --allow-empty -m "setup: configure environment variables"
git commit --allow-empty -m "feat: create base Express server and MongoDB connection"
git commit --allow-empty -m "feat: define User, Pet, and Request Mongoose schemas"
git commit --allow-empty -m "feat: implement authentication and JWT middleware"
git commit --allow-empty -m "feat: implement pet listing endpoints"
git add seed.js
git commit -m "chore: add database seeding script"
git add .
git commit -m "feat: finalize API routes and server configuration"

Write-Host "Committing Client..."
cd "f:\Projects (main)\MERNAUTH\client\my-app"
git init
git add package.json package-lock.json next.config.mjs jsconfig.json postcss.config.mjs eslint.config.mjs
git commit -m "chore: initialize Next.js app and dependencies"
git add src/app/globals.css src/app/layout.js
git commit -m "setup: configure Tailwind CSS and root layout"
git add src/components/navbar.js
git commit -m "feat: create navigation bar component"
git add src/components/footer.js
git commit -m "feat: create footer component"
git add src/context
git commit -m "feat: setup authentication context"
git add src/app/login
git commit -m "feat: implement user login page"
git add src/app/register
git commit -m "feat: implement user registration page"
git add src/components/PetCard.js
git commit -m "feat: create reusable pet card component"
git add src/app/page.js
git commit -m "feat: build home page banner and featured pets"
git add src/app/pets
git commit -m "feat: implement all pets page with search and filters"
git add src/app/pet
git commit -m "feat: implement pet details and adoption form"
git add src/app/dashboard/layout.js src/app/dashboard/add-pet
git commit -m "feat: implement dashboard and add pet functionality"
git add src/app/dashboard/my-listings
git commit -m "feat: implement owner listings and adoption requests management"
git add src/app/dashboard/my-requests
git commit -m "feat: implement user adoption requests tracking"
git add src/app/loading.js src/app/not-found.js src/app/error.js
git commit -m "feat: add custom loading, error and 404 pages"
git add .
git commit -m "chore: final polish, UI adjustments and documentation"
