import {commands} from "../support/commands";

describe("justEatTakeawayTest",()=>{
   let keyword="Sales";
   let searchFilter="Category";
   let searchFilterName="Sales";
   let searchCountry="Country";
   let searchCountryName="Germany";

beforeEach(()=>{
   cy.visit("https://careers.justeattakeaway.com/global/en/home");
})

it('searchTest',()=>{
cy.closeCookiePopup();
cy.clickJobCategory(keyword);
cy.verifyCategoryClick(searchFilter,searchFilterName);
cy.verifyJobsNumber(searchFilterName);
cy.filterSearch(searchCountry,searchCountryName);
cy.verifyJobsNumber(searchCountryName);
cy.confirmSingleJobCategory(searchFilterName);
})
})
