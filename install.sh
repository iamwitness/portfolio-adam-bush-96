#!/usr/bin/env bash
# AdamOS — one-shot installer for macOS + Linux
# Usage: curl -fsSL https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.sh | bash
set -e

REQUIRED_NODE=18

# ── Colours ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

# ── Banner ─────────────────────────────────────────────────────────────────────
echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║       AdamOS — Portfolio Installer        ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""

# ── Helpers ────────────────────────────────────────────────────────────────────

node_version_ok() {
  command -v node &>/dev/null || return 1
  local major
  major=$(node --version 2>/dev/null | sed 's/v//' | cut -d. -f1)
  [ "$major" -ge "$REQUIRED_NODE" ] 2>/dev/null
}

install_via_nvm() {
  echo "  → Installing Node.js via nvm..."
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # Source nvm immediately in this session
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install --lts --no-progress
  nvm use --lts
}

install_macos() {
  if command -v brew &>/dev/null; then
    echo "  → Installing Node.js via Homebrew..."
    brew install node
  else
    install_via_nvm
    # Also append to shell rc so it persists after this session
    for rc in "$HOME/.zshrc" "$HOME/.bashrc"; do
      if [ -f "$rc" ] && ! grep -q 'NVM_DIR' "$rc" 2>/dev/null; then
        {
          echo ''
          echo '# nvm (added by AdamOS installer)'
          echo 'export NVM_DIR="$HOME/.nvm"'
          echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
        } >> "$rc"
      fi
    done
  fi
}

install_linux() {
  if command -v apt-get &>/dev/null; then
    echo "  → Installing Node.js via apt (NodeSource LTS)..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - 2>/dev/null
    sudo apt-get install -y nodejs
  elif command -v dnf &>/dev/null; then
    echo "  → Installing Node.js via dnf..."
    sudo dnf install -y nodejs npm
  elif command -v yum &>/dev/null; then
    echo "  → Installing Node.js via yum (NodeSource LTS)..."
    curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash - 2>/dev/null
    sudo yum install -y nodejs
  elif command -v pacman &>/dev/null; then
    echo "  → Installing Node.js via pacman..."
    sudo pacman -S --noconfirm nodejs npm
  else
    echo "  → No supported package manager found. Falling back to nvm..."
    install_via_nvm
  fi
}

# ── Main ───────────────────────────────────────────────────────────────────────

if node_version_ok; then
  echo -e "  ${GREEN}✓ Node.js $(node --version) already installed.${NC}"
else
  OS="$(uname -s)"
  case "$OS" in
    Darwin*)
      echo "  → macOS detected."
      install_macos
      ;;
    Linux*)
      echo "  → Linux detected."
      install_linux
      ;;
    CYGWIN*|MINGW*|MSYS*)
      echo ""
      echo -e "  ${RED}✗ Windows Git Bash / MSYS detected.${NC}"
      echo "    Please use the PowerShell installer instead:"
      echo ""
      echo "    irm https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.ps1 | iex"
      echo ""
      exit 1
      ;;
    *)
      echo -e "  ${RED}✗ Unknown OS: $OS${NC}"
      echo "    Install Node.js from https://nodejs.org then run: npx adam-os"
      exit 1
      ;;
  esac

  # Re-source nvm in case we just installed it above without brew
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  if ! node_version_ok; then
    echo ""
    echo -e "  ${RED}✗ Node.js installation succeeded but the shell needs a restart.${NC}"
    echo "    Open a new terminal and run: npx adam-os"
    exit 1
  fi
fi

echo ""
echo -e "  ${GREEN}✓ Node.js $(node --version) ready.${NC}"
echo "  → Launching AdamOS..."
echo ""

exec npx adam-os "$@"
