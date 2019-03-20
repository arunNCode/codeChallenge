module.exports = function (grunt) {
    grunt.initConfig({
        webdrivermanager: {
            out_dir: './selenium',
            capabilities: {
                browserName: 'chrome'
            },
            seleniumArgs: [],
            seleniumPort: 4444,
            ignore_ssl: false,
            proxy: false,
            method: 'GET',
            webdriverVersions: {
                selenium: '2.44.0',
                chromedriver: '2.12',
                iedriver: '2.44.0'
            },
            // options :'start'
        },

        protractor: {
            options: {
                configFile: "./protractor-config.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            your_target: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "test/conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            },
        },
    })


    // to manage webdriver instance and drivers
    grunt.loadNpmTasks('grunt-webdriver-manager');

    // to enable grunt protractor runner
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('pTest', [
        'webdrivermanager',
        'protractor'
    ])

};
