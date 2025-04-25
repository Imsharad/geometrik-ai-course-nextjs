#!/bin/bash

# Add Bun to PATH
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Add aliases for common Bun commands
alias bun="$BUN_INSTALL/bin/bun"
alias bunx="$BUN_INSTALL/bin/bunx"

echo "Bun aliases have been set up. You can now use 'bun' command directly."
echo "For permanent setup, add the following to your ~/.zshrc or ~/.bashrc:"
echo ""
echo "# Bun"
echo 'export BUN_INSTALL="$HOME/.bun"'
echo 'export PATH="$BUN_INSTALL/bin:$PATH"' 