module.exports = function (grunt) {
    grunt.initConfig({
      protractor_webdriver: {
          your_target: {
              options: {
                  path: 'node_modules/protractor/bin/',
                  command: 'webdriver-manager start'
              }
          }
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
          your_target: {
              options: {
                  configFile: "test/conf.js", // Target-specific config file
                  args: {} // Target-specific arguments
              }
          }
      }
  });
  
  grunt.registerTask('default', ['protractor_webdriver','protractor']
  );  
  };