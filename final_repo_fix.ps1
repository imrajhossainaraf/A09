cd "f:\Projects (main)\MERNAUTH"

Write-Host "Fixing submodule issue..."
git rm -r --cached client

Write-Host "Removing hidden client\.git folder..."
Get-ChildItem -Path "client\.git" -Force -Recurse | ForEach-Object { $_.Attributes = 'Normal' }
Remove-Item -Recurse -Force "client\.git"

Write-Host "Re-adding client files directly to the root repo..."
git add client
git commit -m "chore: track all client and server files directly in root repository"

Write-Host "Done! Everything is now tracked in a single repository."
