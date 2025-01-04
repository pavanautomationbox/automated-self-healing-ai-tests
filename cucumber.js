export default {
    parallel: 1, // Run scenarios in parallel
    loader: ["ts-node/esm"], // Load TypeScript module
    import: ['src/**/*.ts'], //Load support files
    format: ['html:reports/cucumber-report.html', 'json:reports/cucumber-report.json'], // Generate a rerun.txt file, Generate a reports etc
    features: ['features/*.feature'], // Path to the feature files
    retry: 0, // Retry failed tests up to 0 times
    dryRun: false, // Disable dry run
}