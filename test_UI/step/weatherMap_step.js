var { Given, Then, When, Before, After } = require('cucumber');
var { setDefaultTimeout } = require('cucumber');
var EC = protractor.ExpectedConditions;
setDefaultTimeout(30 * 1000); // default async-await time out value 
var chai = require('chai')  //chai assertion library 
var assert = chai.assert;
var expect = chai.expect;
// var seleniumWebdriver = require('selenium-webdriver');
// calling the common actions library 
var functionLibrary = require('./../commonFunctions.js')
// assigning locator file to a variable / we can also use page object file 
var pageLocator = require('./../locator/locator.json')

// to open the url before each scenario execution
Before({ tags: "@OpenURL" }, function () {
    return openURL('https://openweathermap.org/')
})
function openURL(url) {
    return browser.get(url, 40000);
}
// Only the element locators can be kept sepeartely in a JSON file like pageLocator.homePage 
var weatherMenu = element(by.linkText('Weather'));
var mapsMenu = element(by.linkText('Maps'));
var searchBar = element(by.css('#widget #q'))

// Likewise other menu and submenu options needs to be added and checked 
Given(/^I open the weather map url (.*)$/, function (url) {
    return openURL(url)
});

When('I am displayed with open weather map home page', function () {
    return element(by.css("#main-slideshow .jumbotron__title")).getText()
        .then(function (textValue) {
            return expect(textValue).to.contains('We Deliver 2 Billion Forecasts Per Day')
        })
        .then(function () {
            return element(by.css("#main-slideshow .jumbotron__description")).getText()
                .then(function (textValue2) {
                    // to assert the text displayed in UI
                    return expect(textValue2).to.contains('2,000 new subscribers a day | 1,500,000 customers | 20+ weather APIs')
                })
        })
});
Then('I verify that all the home page labels are available and displayed', function () {
    return element(by.css("#widget .widget__title")).getText() // find by class name
        .then(function (textValue) {
            return expect(textValue).to.contains('Current weather and forecasts in your city')
        })
        .then(function () {
            return functionLibrary.elementVisibilityCheck_ByLinkText('Support Center')  // check support center
                .then(function () {
                    return functionLibrary.elementVisibilityCheck_ByCss('#nav-search') // search icon on top navigation
                })
                .then(function () {
                    return functionLibrary.elementVisibilityCheck_ByLinkText('Sign In') // Waits for the element with link text to be displayed
                })
                .then(function () {
                    return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.homePage.citySearchField) // City search field 
                })

        })


});
Then('I verify that all the menu options are displayed in the page', function () {
    return browser.wait(EC.visibilityOf($('.nav__link.bg-hover-color')), 5000) // $ - element(by.css()) 
        .then(function () {
            return functionLibrary.elementVisibilityCheck_ByLinkText('Price') // Waits for the element with link text to be displayed
        })
// similar way as the above steps,
// other menu items(including top navigation,current location,weather data,Daily,Hourly,Chart,download) displayed in the page should be coded and validated.
});

// function to do search input and button selection 
function enterAndSearchCity(keyword) {
    return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.homePage.citySearchField)
        .then(function () {
            return functionLibrary.inputText(pageLocator.homePage.citySearchField, keyword)
                .then(function () {
                    return functionLibrary.click(pageLocator.homePage.searchButton)
                })
        })
}

Given('I am on weather map home page', function () {
    // Waits for the element to be visible on the dom
    return browser.wait(EC.visibilityOf(element(by.css('#main-slideshow'))), 20000)
})


When(/^I enter an invalid city name (.*) and search for the weather$/, function (invalidCity) {
    return enterAndSearchCity(invalidCity);
})

Then('I am displayed with Not found message', function () {
    return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.homePage.noResultError)
        .then(function () {
            return functionLibrary.getText(pageLocator.homePage.noResultError)
                .then(function (textValueNoText) {
                    return expect(textValueNoText).to.contains('Not found') // validating the error message displayed ,various flavours of chai assertion can be used
                })
                .then(function () {
                    return functionLibrary.click(pageLocator.homePage.closeError)
                })
        })
})
var cityValue; // to store the city value which is test input for further validation
When(/^I enter a valid city name (.*) and search for the weather$/, function (validCity) {
    cityValue = validCity;
    return enterAndSearchCity(validCity);
})
Then('I verify that the weather details for the city is displayed successfully', function () {
    return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.homePage.serachResultTemperature)
        .then(function () {
            return functionLibrary.getText(pageLocator.homePage.searchResultCard)
                .then(function (resultValue) {
                    return expect(resultValue).to.contains(cityValue); // validation of city value in the search result 
                })
        })
});

When('I select signup menu from navigation bar', function () {
    return element(by.linkText('Sign Up')).click()
});
Then('I verify that create new account page is displayed with username,email and password fields', function () {
    // Page object can be created which will have all the functions for visibility checks , send keys and check box and button selections 
    return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.createAccount.createNewAccountFormHeader)
        .then(function () {
            return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.createAccount.usernameField)
                .then(function () {
                    return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.createAccount.userEmailField)
                        .then(function () {
                            return functionLibrary.elementVisibilityCheck_ByCss(pageLocator.createAccount.userPassword)
                        })
                })
        })
});

