# Playwright MCP GitHub Action

This GitHub Action uses Playwright with a Model Completion Protocol (MCP) server to perform web tasks based on natural language prompts. It can fetch information from GitHub repositories and optionally process it using OpenAI.

## Features

- Fetch the latest release versions from GitHub repositories
- Extract tag information from repositories
- Use browser automation for more complex tasks
- Process data with OpenAI API (optional)
- Print results directly in GitHub Actions logs

## Setup Instructions

1. **Create the workflow file**:
   
   Create a `.github/workflows/playwright-mcp.yml` file in your repository with the contents from the provided workflow YAML.

2. **Set up secrets**:
   
   In your GitHub repository settings, add the following secrets:
   
   - `OPENAI_API_KEY` - Your OpenAI API key (optional, only needed if using OpenAI integration)
   - GitHub automatically provides `GITHUB_TOKEN` so you don't need to set this up

3. **Running the action**:
   
   Trigger the workflow manually from the "Actions" tab in your GitHub repository and provide the prompt in the input field.

## Example Prompts

- **Fetch releases**: `get the latest 5 release versions of the datadog helm : https://github.com/DataDog/helm-charts`
- **With OpenAI**: `get the latest 5 release versions of the datadog helm : https://github.com/DataDog/helm-charts and use openai to summarize them`
- **Multiple repos**: `get the latest 5 release versions of: https://github.com/DataDog/helm-charts and https://github.com/prometheus/prometheus`

## Extending the Action

The MCP script (`playwright-mcp.js`) can be modified to handle different types of tasks:

1. Add new methods to the `PlaywrightMCP` class for specific web tasks
2. Update the `handlePrompt` method to recognize different prompt patterns
3. Add integrations with other APIs as needed

## Troubleshooting

- Check the GitHub Actions logs for detailed error messages
- Ensure your API keys are correctly set in the repository secrets
- For rate limiting issues with GitHub API, consider using authenticated requests

## Contributing

Feel free to modify the MCP script to add new capabilities or improve existing ones!
