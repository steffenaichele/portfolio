# Linear MCP Server Setup

Quick setup guide for integrating Linear with Claude Code.

## Step 1: Get Your Linear API Key

1. Go to: https://linear.app/settings/api
2. Click "Create a personal API key"
3. Name it: "Claude Code MCP"
4. Copy the key (starts with `lin_api_`)

## Step 2: Configure Claude Code

1. **Locate your Claude Code config file**:
   - macOS: `~/.config/claude-code/config.json`
   - Linux: `~/.config/claude-code/config.json`
   - Windows: `%APPDATA%\Claude Code\config.json`

2. **Open the config file** and add the Linear MCP server:

   ```json
   {
     "mcpServers": {
       "linear": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-linear"],
         "env": {
           "LINEAR_API_KEY": "lin_api_YOUR_KEY_HERE"
         }
       }
     }
   }
   ```

   **Note**: Replace `lin_api_YOUR_KEY_HERE` with your actual Linear API key.

3. **If you already have other MCP servers configured**, just add the "linear" entry to the existing `mcpServers` object:

   ```json
   {
     "mcpServers": {
       "existing-server": {
         ...
       },
       "linear": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-linear"],
         "env": {
           "LINEAR_API_KEY": "lin_api_YOUR_KEY_HERE"
         }
       }
     }
   }
   ```

## Step 3: Restart Claude Code

After saving the config file, restart Claude Code for the changes to take effect.

## Step 4: Test the Integration

Try these commands in Claude Code:

```
"Show me all my open Linear issues"
"Create a Linear issue: Implement Lighthouse CI workflow"
"List all high-priority bugs"
```

## Usage Examples

### Creating Issues
```
"Create a Linear issue for implementing bundle size monitoring with high priority"
```

### Searching Issues
```
"Show me all issues assigned to me"
"List all bugs in the portfolio project"
"Find issues tagged with 'accessibility'"
```

### Updating Issues
```
"Update issue ABC-123 status to In Progress"
"Add a comment to issue ABC-123: Completed the implementation"
"Close issue ABC-123"
```

### Linking Code to Issues
When working on code, mention the issue:
```
"I'm working on issue ABC-123, help me implement the feature"
```

## Troubleshooting

**MCP server not found**:
- Restart Claude Code
- Verify config.json syntax (use a JSON validator)
- Check that the API key starts with `lin_api_`

**Permission errors**:
- Verify your Linear workspace access
- Ensure API key has correct scopes
- Try creating a new API key

**Connection issues**:
- Check internet connection
- Verify Linear is not blocked by firewall
- Review Claude Code logs

## Quick Config Template

Save this to `~/.config/claude-code/config.json`:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"],
      "env": {
        "LINEAR_API_KEY": "lin_api_YOUR_ACTUAL_KEY"
      }
    }
  }
}
```

## Next Steps

Once Linear is configured, you can:
1. Create issues directly from Claude Code
2. Track TODOs automatically
3. Link commits to Linear issues
4. Update issue status during development
5. Generate reports from Linear data

See `.github/AUTOMATION_RECOMMENDATIONS.md` for advanced Linear automations.
