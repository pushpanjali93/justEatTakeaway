import { refinesearch } from "../support/refinesearch";
import { joblisting } from "../support/joblisting";


describe("justEatTakeawayTest", () => {
   let keyword = "Sales";
   let searchFilter = "Category";
   let searchFilterName = "Sales";
   let searchCountry = "Country";
   let searchCountryName = "Germany";

   beforeEach(() => {
      cy.visit("https://careers.justeattakeaway.com/global/en/home");
   })

   it('verify sales category', () => {
      cy.closeCookiePopup();
      cy.clickJobCategory(keyword);
      cy.verifyCategoryClick(searchFilter, searchFilterName);
      cy.verifyJobsNumber(searchFilterName);
      cy.applySearchFilter(searchCountry, searchCountryName);
      cy.verifyJobsNumber(searchCountryName);
      cy.confirmSingleJobCategory(searchFilterName);
   })
})
