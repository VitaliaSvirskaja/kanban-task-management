/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("createBoard", (boardTitle: string) => {
  cy.contains("Create New Board").click();
  cy.focused().type(boardTitle);
  cy.focused().parent().parent().find("button[type=submit]").click();
});

Cypress.Commands.add("deleteBoard", (boardTitle: string) => {
  cy.get("aside")
    .contains(new RegExp("^" + boardTitle + "$", "g"))
    .trigger("mouseover")
    .children()
    .last()
    .trigger("mouseover")
    .click();
  cy.contains("Delete Board").click();
  cy.contains("button", "Delete").click();
});
