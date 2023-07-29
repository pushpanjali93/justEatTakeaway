import {commands} from "../support/commands";

describe("justEatTakeawayTest",()=>{
   let keyword="Test";
   let searchFilter="Country";
   let searchFilterName="Netherlands";

beforeEach(()=>{
   cy.visit("https://careers.justeattakeaway.com/global/en/home");
})

it('searchTest',()=>{
cy.closeCookiePopup();
cy.searchKeyword(keyword);
cy.confirmMultipleLocation();
cy.filterSearch(searchFilter,searchFilterName);
cy.confirmSingleLocations(searchFilterName);
})
})























/*let firstLoc;
cy.visit("https://careers.justeattakeaway.com/global/en/home");
   cy.get("input[id='keywordSearch']").clear();
   cy.get("input[id='keywordSearch']").type("Test");
   cy.get("[aria-label='Search suggestions']").should('be.visible');
 cy.get("[type='submit'][aria-disabled='false']").click();

 cy.get("[aria-label='Facet Results block']").within(()=>{
   cy.contains("Test").scrollIntoView();
     cy.get("[class='job-location']").eq(0).invoke('text').then((text)=>{
          let ele=text.split(",");
          firstLoc=ele[ele.length-1];
     })

    cy.get("[class='job-location']").each(($el,index)=>{
          cy.wrap($el).invoke('text').then((text)=>{
            let elem=text.split(",");
           if(index!==0 && elem[elem.length-1]!== firstLoc){
            cy.get($el).scrollIntoView().should('be.visible');
            cy.wait(500);
            return false;
           }
        })
          })
 })

 cy.get("[aria-label='Refine your search']").should('be.visible').within(()=>{
   cy.wait(5000);
    cy.contains("Country").click().should('have.attr','aria-expanded','true');
 cy.get("[placeholder='Country']").type('Netherlands');
 cy.wait(500);
 cy.get(`[class='result-text']:contains('Netherlands')`).click({force:true});
 cy.wait(1000);
 })

 cy.get("[aria-label='Facet Results block']").within(()=>{
 cy.get("[class='job-location']").each(($el)=>{
   cy.wrap($el).invoke('text').then((text)=>{
     let elem=text.split(",");
     let loc=elem[elem.length-1].replace("\n","");
     let loc2=loc.trim();
     cy.get($el).scrollIntoView().should('be.visible');
  expect(loc2).to.equal('Netherlands');
 })
})
   })
})*/