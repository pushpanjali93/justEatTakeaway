
import './commands'

Cypress.Commands.add('confirmMultipleLocation',()=>{
    let firstCountry="";
    let multipleCountries=false;
    cy.get("[class='job-location']").each(($el,index)=>{
      cy.wrap($el).invoke('text').then((text)=>{
      // Find Country from the Location String
      let elem=text.split(",");
      let loc=elem[elem.length-1].replace("\n","").trim();
      if(multipleCountries==false)
        cy.get($el).scrollIntoView({duration:500}).should('be.visible');
      if (index==0)
        firstCountry=loc;
      else if(loc!==firstCountry){
        multipleCountries=true;
        return false;
        }
      })}).then(()=>{
        expect(multipleCountries).to.be.true;
       }) 
  })


  // Custom Command to Confirm if Results shown belong to a Single Location
Cypress.Commands.add('confirmSingleLocations',(searchFilterName)=>{
  //Waiting for Loading Button to get removed from DOM
  cy.get("[class='ph-loading']").should('not.exist');
    cy.get("[aria-label='Facet Results block']").within(()=>{
      cy.get("[class='job-info']").each(($el)=>{
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
    