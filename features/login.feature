Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter the username "standard_user"
    And I enter the password "secret_sauce"
    And I click the login button
    Then I should be logged in successfully
