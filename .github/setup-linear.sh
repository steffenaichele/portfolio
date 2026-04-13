#!/bin/bash

# Linear MCP Server Setup Script
# Usage: ./setup-linear.sh YOUR_LINEAR_API_KEY

if [ -z "$1" ]; then
    echo "❌ Please provide your Linear API key"
    echo "Usage: ./setup-linear.sh lin_api_YOUR_KEY"
    echo ""
    echo "Get your key from: https://linear.app/settings/api"
    exit 1
fi

LINEAR_KEY="$1"
CONFIG_FILE="$HOME/.config/claude-code/config.json"

echo "🔧 Setting up Linear MCP Server..."
echo ""

# Create config directory if it doesn't exist
mkdir -p "$HOME/.config/claude-code"

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo '{"mcpServers": {}}' > "$CONFIG_FILE"
fi

# Backup existing config
cp "$CONFIG_FILE" "$CONFIG_FILE.backup"
echo "✅ Backed up existing config to $CONFIG_FILE.backup"

# Update config with Linear MCP server
cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"],
      "env": {
        "LINEAR_API_KEY": "$LINEAR_KEY"
      }
    }
  }
}
EOF

echo "✅ Linear MCP server configured!"
echo ""
echo "📋 Configuration saved to: $CONFIG_FILE"
echo ""
echo "🔄 Next steps:"
echo "   1. Restart Claude Code"
echo "   2. Test with: 'Show me all my Linear issues'"
echo ""
echo "✨ Done!"
