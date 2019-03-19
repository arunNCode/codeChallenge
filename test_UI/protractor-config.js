exports.config = {
    // address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // Capabilities to be passed to the webdriver instance, muticapabilities can be added for cross browser testing
    capabilities: {
        browserName: 'chrome'
    },
    getPageTimeout: 70000,
    allScriptsTimeout: 70000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file
    specs: ['./weatherMap.feature'], // feature file written in gherkins 
    cucumberOpts: {
        require: './step/weatherMap_step.js',  // require step definition files before executing features
        tags: false, // tags can be used to control execution of test suites 
    },
    onPrepare: function () {
        browser.manage().window().maximize(); // maximize the browser before executing the feature files
        browser.ignoreSynchronization = true; //protractor won't attempt to synchronize with the page before performing actions
    }


};