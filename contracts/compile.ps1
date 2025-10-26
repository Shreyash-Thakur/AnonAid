$ErrorActionPreference = "Stop"

# Ensure solcjs is installed
if (-not (Get-Command solcjs -ErrorAction SilentlyContinue)) {
    Write-Host "Installing solcjs globally..."
    npm install -g solc
}

# Create build directory
$buildDir = Join-Path $PSScriptRoot "build"
if (-not (Test-Path $buildDir)) {
    New-Item -Path $buildDir -ItemType Directory | Out-Null
}

# Compile the contract
Write-Host "Compiling DonationPool.sol..."
solcjs --bin --abi --include-path node_modules/ --base-path . -o ./build contracts/DonationPool.sol --optimize

# Rename the output files to be more friendly
$solcOutput = Get-ChildItem -Path $buildDir -Filter "*DonationPool.sol*"
foreach ($file in $solcOutput) {
    if ($file.Name -like "*_bin.bin") { 
        Rename-Item -Path $file.FullName -NewName "DonationPool.bin"
    } elseif ($file.Name -like "*_abi.json") {
        Rename-Item -Path $file.FullName -NewName "DonationPool.abi"
    }
}

Write-Host "Compilation completed. Files saved to ./build directory."