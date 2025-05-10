# Helm Chart Version Tracker

This project automatically tracks the latest versions of Helm charts from various repositories using GitHub Actions and Playwright MCP (Multi-modal Controller for Playwright).

## Features

- Automatically checks for new Helm chart releases daily
- Creates reports when new versions are detected
- Saves version history for tracking changes over time
- Easily extensible to monitor additional Helm repositories

## Currently Tracked Repositories

- [DataDog Helm Charts](https://github.com/DataDog/helm-charts)

## Setup Instructions

1. **Fork this repository** to your own GitHub account

2. **Set up necessary secrets**:
   - Go to your repository's Settings > Secrets and variables > Actions
   - Add a new repository secret named `OPENAI_API_KEY` with your OpenAI API key

3. **Enable GitHub Actions**:
   - Go to the Actions tab in your repository
   - Enable workflow runs if prompted

4. **Run the workflow**:
   - You can manually trigger the workflow from the Actions tab
   - The workflow will also run automatically according to the schedule (daily by default)

## How It Works

The workflow uses Playwright MCP (Multi-modal Controller for Playwright) to:

1. Visit the Helm chart repositories
2. Extract information about available charts and their versions
3. Compare with previously recorded versions to detect updates
4. Generate reports for any new versions found
5. Commit the updated version information back to the repository

## Output

The workflow generates the following outputs in the `helm-versions/` directory:

- `datadog-helm-versions.json`: Current versions of all DataDog Helm charts
- `datadog-updates.md`: A report of any detected updates (only created when updates are found)

## Adding More Repositories

To track additional Helm chart repositories, modify the `helmRepos` array in the `check-helm-releases.js` script:

```javascript
const helmRepos = [
  {
    name: 'datadog',
    url: 'https://github.com/DataDog/helm-charts',
    chartsPath: '/tree/main/charts',
    outputFile: 'datadog-helm-versions.json'
  },
  // Add new repositories here
  {
    name: 'your-repo-name',
    url: 'https://github.com/org/repo',
    chartsPath: '/path/to/charts', // Path to charts directory within repo
    outputFile: 'your-repo-helm-versions.json'
  }
];
```

## Customizing the Schedule

To change how often the check runs, modify the cron expression in the `.github/workflows/check-helm-releases.yml` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
