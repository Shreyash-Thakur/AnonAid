$ErrorActionPreference = "Stop"

# First compile the contract
& "$PSScriptRoot\compile.ps1"

# Run the deployment script
Write-Host "Deploying contract..."
node scripts/direct-deploy.js