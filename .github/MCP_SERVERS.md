# MCP Servers Setup Guide

Model Context Protocol (MCP) servers extend Claude Code's capabilities by connecting to external data sources and services.

## Recommended MCP Servers for Your Portfolio

### 1. Linear MCP Server (Highly Recommended)

**Why**: Perfect for managing TODOs, feature requests, and bug tracking directly from Claude Code.

**Features**:
- Create and update Linear issues from Claude Code
- Search and filter issues
- Update issue status and assignments
- Link code changes to Linear tickets

**Setup**:

1. **Install the Linear MCP Server**:
   ```bash
   npm install -g @modelcontextprotocol/server-linear
   ```

2. **Get your Linear API Key**:
   - Go to https://linear.app/settings/api
   - Create a new Personal API Key
   - Copy the key (starts with `lin_api_`)

3. **Configure in Claude Code**:
   - Open Claude Code Settings
   - Navigate to MCP Servers
   - Add new server:
     ```json
     {
       "linear": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-linear"],
         "env": {
           "LINEAR_API_KEY": "your_linear_api_key_here"
         }
       }
     }
     ```

4. **Usage Examples**:
   - "Create a Linear issue for the accessibility improvements"
   - "Show me all open issues assigned to me"
   - "Update issue ABC-123 status to In Progress"
   - "List all bugs with high priority"

### 2. GitHub MCP Server (Already Available)

**Why**: Already integrated via Vercel plugin.

**Features**:
- Access repository information
- Manage issues and pull requests
- View commit history
- Check workflow runs

**Usage**: Available by default in Claude Code with Vercel plugin.

### 3. Sentry MCP Server

**Why**: Track and debug errors in production.

**Features**:
- View recent errors and exceptions
- Get error details and stack traces
- Link errors to code changes
- Track error trends

**Setup**:
1. Install Sentry in your project:
   ```bash
   npm install @sentry/nextjs
   ```

2. Configure Sentry MCP in Claude Code settings:
   ```json
   {
     "sentry": {
       "command": "npx",
       "args": ["-y", "@modelcontextprotocol/server-sentry"],
       "env": {
         "SENTRY_AUTH_TOKEN": "your_token_here",
         "SENTRY_ORG": "your_org",
         "SENTRY_PROJECT": "portfolio"
       }
     }
   }
   ```

### 4. Vercel MCP Server

**Why**: Enhanced Vercel integration beyond the plugin.

**Features**:
- Detailed deployment analytics
- Environment variable management
- Domain configuration
- Edge config access

**Setup**:
```json
{
  "vercel": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-vercel"],
    "env": {
      "VERCEL_ACCESS_TOKEN": "your_vercel_token"
    }
  }
}
```

### 5. Figma MCP Server

**Why**: Sync design specs with implementation.

**Features**:
- Fetch design tokens (colors, typography, spacing)
- Get component specifications
- Export assets
- Check design-code consistency

**Setup**:
```json
{
  "figma": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-figma"],
    "env": {
      "FIGMA_ACCESS_TOKEN": "your_figma_token"
    }
  }
}
```

## Priority Setup Order

1. **Linear** - For task management and TODOs
2. **Sentry** - For production error tracking
3. **Figma** - If you use Figma for design
4. **Vercel** - For advanced deployment features

## Configuration File Location

All MCP servers are configured in:
- **macOS/Linux**: `~/.config/claude-code/config.json`
- **Windows**: `%APPDATA%\Claude Code\config.json`

## Testing MCP Servers

After setup, test in Claude Code:
```
# For Linear
"Show me all my Linear issues"

# For Sentry
"What are the most recent errors in production?"

# For Figma
"Get the color tokens from our design system"
```

## Troubleshooting

**Server not responding**:
- Check API keys are valid
- Verify server is installed: `npm list -g`
- Restart Claude Code

**Permission errors**:
- Ensure API keys have correct scopes
- Check organization/team access

**Connection issues**:
- Verify internet connection
- Check firewall settings
- Review Claude Code logs
