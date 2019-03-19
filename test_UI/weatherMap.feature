
Feature: As a user i should be able access the open weather map and can use the website to view weather information

    Scenario Outline: Validate that all the menu and label items are displayed on the open weather map home page
        Given I open the weather map url <url>
        When I am displayed with open weather map home page
        Then I verify that all the home page labels are available and displayed
        And  I verify that all the menu options are displayed in the page
        Examples:
            | url                         |
            | https://openweathermap.org/ |

    @OpenURL
    Scenario Outline: Validate that user is displayed with no results error when searching using an invalid city name
        Given I am on weather map home page
        When I enter an invalid city name <invalidCity> and search for the weather
        Then I am displayed with Not found message
        Examples:
            | invalidCity |
            | 87arT       |

    @OpenURL
    Scenario Outline: Validate that user is displayed with weather details result when searching using a city name
        Given I am on weather map home page
        When I enter a valid city name <validCity> and search for the weather
        Then I verify that the weather details for the city is displayed successfully

        Examples:
            | validCity |
            | Bangalore |

    @OpenURL
    Scenario: Validate that user is able to use signup menu to navigate to Create new Account page
        Given I am on weather map home page
        When I select signup menu from navigation bar
        Then I verify that create new account page is displayed with username,email and password fields
        # There are similar important test scenarios inlcuding download report, support center 
    

