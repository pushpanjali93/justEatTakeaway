The project contains Solution to 2 Automation Cases for JustEatTakeAway as per assignment shared.

To run the project, run: npx cypress open

Test Cases are written in 2 files- FirstTest.cy.js & SecondTest.cy.js and implemented via Custom Commands.

TO DO Items to improve this code:
- This code does not support Run Configurations for Tests e.g. Smoke, Sanity etc.
- Pagination is not handled in interest of time as none of the test Cases required that. But the test might fail with certain KeyWords.
- If Search Keywords (Given in Assignment as Test) are random e.g. - "abcdef" resulting in 0 results, the test breaks. This should ideally be another test case to gracefully handle this scenario of verifying >0 Results.

Note-
Some of the code might have Cypress wait(), delay etc which have been used only to provide visibility & animation effects for User to observe test cases while running but the code is written to ensure no waits are needed from Functionality purposes.