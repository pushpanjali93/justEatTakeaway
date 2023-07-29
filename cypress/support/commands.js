// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


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


Cypress.Commands.add('confirmMultipleLocation',()=>{
  let firstCountry="";
  let multipleCountries=false;
  cy.get("[class='job-location']").each(($el,index)=>{
    cy.wrap($el).invoke('text').then((text)=>{
      let elem=text.split(",");
    let loc=elem[elem.length-1].replace("\n","").trim();
      if (index==0)
        firstCountry=loc;
      else if(loc!==firstCountry){
        multipleCountries=true;
        return false;
      }
    })}).then(()=>{
      expect(multipleCountries).to.be.true;
     }) ;
})

Cypress.Commands.add('filterSearch',(searchFilter,searchFilterName)=>{
  cy.get("[aria-label='Refine your search']").should('be.visible').within(()=>{
     cy.contains(`${searchFilter}`).click({scrollBehavior: true}).should('have.attr','aria-expanded','true');
  cy.get(`[placeholder='${searchFilter}']`).type(`${searchFilterName}`,{delay:100});
  cy.get(`[class='result-text']:contains('${searchFilterName}')`).click({force:true});
  })
})


Cypress.Commands.add('confirmSingleLocations',(searchFilterName)=>{
  cy.get("[aria-label='Facet Results block']").within(()=>{
    cy.wait(500);
    cy.get("[class='job-info']").each(($el,index)=>{
      cy.wrap($el).invoke('text').then((text)=>{
        let elem=text.split(",");
        let loc=elem[elem.length-1].replaceAll("\n","").trim();
        let loc2=loc.split(" ");
        cy.get($el).scrollIntoView({duration:500}).should('be.visible');
     expect(loc2[loc2.length-1]).to.equal(`${searchFilterName}`);
    })
   })
})
})

Cypress.Commands.add('clickJobCategory',(keyword)=>{
  cy.get("input[id='keywordSearch']").click();
  cy.get("[aria-label='Search suggestions']").find('li').contains(keyword).scrollIntoView({duration: 2000});
  cy.get("input[id='keywordSearch']").scrollIntoView({ offset: { top: -150, left: 0 } });
  cy.get("[aria-label='Search suggestions']").find('li').contains(keyword).click();
})


Cypress.Commands.add('verifyCategoryClick',(searchFilter,searchFilterName)=>{
  cy.get("[aria-label='Refine your search']").scrollIntoView({duration:3000}).should('be.visible').within(()=>{
    cy.contains(`${searchFilter}`).should('have.attr','aria-expanded','true');
    cy.wait(500);
  cy.get(`[placeholder='${searchFilter}']`).type(`${searchFilterName}`);
})
})

Cypress.Commands.add('verifyJobsNumber',(searchFilterName)=>{
cy.get(`[data-ph-at-id='facet-results-item']:contains('${searchFilterName}')`).within(()=>{
  cy.contains(`${searchFilterName}`).should('be.visible');
  cy.get("[class='checkbox']").should('have.attr','aria-hidden','true');
  cy.get("[class='result-jobs-count']").then(($el)=>{
  let jobsNumber=$el.text();
  jobsNumber=jobsNumber.split("(")[1].split(")")[0].trim();
    return jobsNumber;
  }).as('jobsNumber');
})

cy.get('@jobsNumber').then((jobsNumber) =>{
  cy.get("[aria-label='Facet Results block']").within(()=>{
    cy.wait(500);
    cy.get("[class='result-count']").then(($el)=>{
   let jobNumberResults=$el.text();
     expect(jobsNumber).to.equal(jobNumberResults);
    })
  });
});
})

Cypress.Commands.add('confirmSingleJobCategory',(jobCategory)=>{
  cy.get("[aria-label='Facet Results block']").within(()=>{
    cy.get("[class='job-info']").each(($el,index)=>{
      cy.wrap($el).invoke('text').then((text)=>{
        let elem=text.split("Category");
        let result=elem[elem.length-1].trim();
        cy.get($el).scrollIntoView({duration:500}).should('be.visible');
     expect(result).to.equal(`${jobCategory}`);
    })
   })
      })
})
