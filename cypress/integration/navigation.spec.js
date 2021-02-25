describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // cy.get("li").contains("Tuesday").click();
    // cy.get("li")
    //   .contains("li", "Tuesday")
    //   .click()
    //   .should("have.css", "background-color", "rgb(242, 242, 242)");
    
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    
      //Where to paste data-testid="day" ?
      // cy.contains("[data-testid=day]", "Tuesday")
      // .click()
      // .should("have.class", "day-list__item--selected");
    
  });

});