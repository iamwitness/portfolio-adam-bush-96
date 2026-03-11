# AdamOS — one-shot installer for Windows (PowerShell)
# Usage: irm https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.ps1 | iex
#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$RequiredNodeMajor = 18

# ── Banner ─────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  +==========================================+" -ForegroundColor Cyan
Write-Host "  |       AdamOS - Portfolio Installer       |" -ForegroundColor Cyan
Write-Host "  +==========================================+" -ForegroundColor Cyan
Write-Host ""

# ── Helpers ────────────────────────────────────────────────────────────────────

function Get-NodeMajor {
  try {
    $v = (& node --version 2>$null) -replace 'v','' -split '\.' | Select-Object -First 1
    return [int]$v
  } catch { return 0 }
}

function Refresh-Path {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
              [System.Environment]::GetEnvironmentVariable("Path","User")
}

function Install-NodeWindows {
  # 1. Try winget (ships with Windows 10 1709+ and Windows 11)
  if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Host "  -> Installing Node.js LTS via winget..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements
    Refresh-Path
    return
  }

  # 2. Try Chocolatey
  if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "  -> Installing Node.js LTS via Chocolatey..." -ForegroundColor Yellow
    choco install nodejs-lts -y
    Refresh-Path
    return
  }

  # 3. Download the MSI installer directly from nodejs.org
  Write-Host "  -> Downloading Node.js LTS installer from nodejs.org..." -ForegroundColor Yellow
  $arch = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
  # Resolve latest LTS version number via the index JSON
  try {
    $index = Invoke-RestMethod "https://nodejs.org/dist/index.json"
    $lts   = $index | Where-Object { $_.lts -and ($_.version -replace 'v','' -split '\.')[0] -ge $RequiredNodeMajor } |
             Select-Object -First 1
    $ver   = $lts.version
  } catch {
    $ver = "v22.0.0"   # safe fallback
  }
  $msi  = "node-$ver-$arch.msi"
  $url  = "https://nodejs.org/dist/$ver/$msi"
  $dest = "$env:TEMP\$msi"

  Write-Host "     Downloading $url"
  Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
  Write-Host "     Running installer (requires admin)..."
  Start-Process msiexec.exe -ArgumentList "/i `"$dest`" /quiet /norestart" -Verb RunAs -Wait
  Remove-Item $dest -Force -ErrorAction SilentlyContinue
  Refresh-Path
}

# ── Main ───────────────────────────────────────────────────────────────────────

$currentMajor = Get-NodeMajor

if ($currentMajor -ge $RequiredNodeMajor) {
  Write-Host "  [OK] Node.js v$currentMajor already installed." -ForegroundColor Green
} else {
  if ($currentMajor -gt 0) {
    Write-Host "  [!]  Node.js v$currentMajor found but v$RequiredNodeMajor+ is required." -ForegroundColor Yellow
  }
  Install-NodeWindows

  $currentMajor = Get-NodeMajor
  if ($currentMajor -lt $RequiredNodeMajor) {
    Write-Host ""
    Write-Host "  [X]  Node.js installed but not yet on PATH." -ForegroundColor Red
    Write-Host "       Close this window, open a new terminal, and run:  npx adam-os"
    Read-Host "  Press Enter to exit"
    exit 1
  }
}

Write-Host ""
Write-Host "  [OK] Node.js $(node --version) ready." -ForegroundColor Green
Write-Host "  ->  Launching AdamOS..."
Write-Host ""

npx adam-os $args
