This repository contains a collection of documents related to first experiments for E2E testing with [Cypress.io](https://www.cypress.io/).


# Preparation

I installed Cypress with a direct download on our devleo-support.tde.at server following the [Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#Direct-download) documentation.

The application gets started by executing the following command in the CLI (as described in the [Opening the App](https://docs.cypress.io/guides/getting-started/opening-the-app) documentation):

```
npx cypress open
```

Then I configured the E2E Testing type through the Launchpad, which opened the E2E Testing app in Google Chrome.


# Started to write first tests

I followed the guide for [writing your first E2E test](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) from the online documentation to create my first tests.

The first project contains tests for creating a new scenario and then deleting it via the Admin Tool: [admin-tool-new-scenario.cy.js](E2E%20Tests/admin-tool-new-scenario.cy.js).

> Each test starts with the global `loginProNovaCloud` function to retrieve a valid authentication token from our login server for the test.


# Additional resources

Cypress offers online courses on their learning platform: https://learn.cypress.io/
