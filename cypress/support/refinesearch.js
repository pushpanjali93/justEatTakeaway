
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  console.log("An exception occured. suppressed it");
  return false
}) 

Cypress.Commands.add('closeCookiePopup',()=>{
  cy.get("[data-ph-at-id='cookie-close-link']").eq(1).click();  
})


Cypress.Commands.add('searchKeyword',(keyword)=>{
  cy.get("input[id='keywordSearch']").clear();
  cy.get("input[id='keywordSearch']").type(`${keyword}`,{delay:100});
  cy.get("[aria-label='Search suggestions']").should('be.visible');
cy.get("[type='submit'][aria-disabled='false']").click();
cy.url().should("include", `${keyword}`);
})


//Custom Command to search any of the filter provided in "Refine Your Search" Section based on Filter provided
Cypress.Commands.add('applySearchFilter',(searchFilter,searchFilterName)=>{
  cy.get("[aria-label='Refine your search']").should('be.visible').within(()=>{
    cy.contains(`${searchFilter}`).click({scrollBehavior: true}).should('have.attr','aria-expanded','true');
    cy.get(`[placeholder='${searchFilter}']`).type(`${searchFilterName}`,{delay:100});
    cy.get(`[class='result-text']:contains('${searchFilterName}')`).click({force:true});
    // cy.waitUntil(function() {
    //   return cy.get("[class='ph-loading']").should('not.exist');
    //  })
  })
})



Cypress.Commands.add('clickJobCategory',(keyword)=>{
  cy.get("input[id='keywordSearch']").click();
  cy.get("[aria-label='Search suggestions']").find('li').contains(keyword).scrollIntoView({duration: 2000});
  cy.get("input[id='keywordSearch']").scrollIntoView({ offset: { top: -150, left: 0 } });
  cy.get("[aria-label='Search suggestions']").find('li').contains(keyword).click();
})


Cypress.Commands.add('verifyCategoryClick',(searchFilter,searchFilterName)=>{
  cy.get("[aria-label='Refine your search']").scrollIntoView().should('be.visible').within(()=>{
    cy.contains(`${searchFilter}`).should('have.attr','aria-expanded','true');
    cy.wait(500);
  cy.get(`[placeholder='${searchFilter}']`).type(`${searchFilterName}`);
})
})

