import {refinesearch} from "../support/refinesearch";
import {JobListing} from "../support/joblisting";


describe("justEatTakeawayTest",()=>{
   let searchKeyword="Test";
   let searchFilter="Country";
   let searchFilterName="Netherlands";

beforeEach(()=>{
   cy.visit("https://careers.justeattakeaway.com/global/en/home");
})

it('verify job locations',()=>{
cy.closeCookiePopup();
cy.searchKeyword(searchKeyword);
cy.confirmMultipleLocation();
cy.applySearchFilter(searchFilter,searchFilterName);
cy.confirmSingleLocations(searchFilterName);
})
})

