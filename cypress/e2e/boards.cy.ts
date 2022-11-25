describe("boards", () => {
  const BOARD_TITLE = "Test123";

  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("should add a new board", () => {
    cy.createBoard(BOARD_TITLE);
    cy.contains(BOARD_TITLE);
    cy.contains("ALL BOARDS")
      .siblings()
      .first()
      .children()
      .first()
      .children()
      .last()
      .prev()
      .should("have.text", BOARD_TITLE);
  });

  it("should edit an existing board", () => {
    cy.get("aside")
      .contains(new RegExp("^" + BOARD_TITLE + "$", "g"))
      .trigger("mouseover")
      .children()
      .last()
      .trigger("mouseover")
      .click();
    cy.focused().type("456");
    cy.focused().parent().parent().find("button[type=submit]").click();
    cy.contains(BOARD_TITLE + "456");
  });

  it("should delete an existing board", () => {
    cy.get("aside")
      .contains(new RegExp("^" + BOARD_TITLE + "456" + "$", "g"))
      .trigger("mouseover")
      .children()
      .last()
      .trigger("mouseover")
      .click();
    cy.contains("Delete Board").click();
    cy.contains("button", "Delete").click();
  });

  it("should switch between boards", () => {
    cy.createBoard("Banane");
    cy.createBoard("Ananas");
    cy.get("header").contains("Ananas");
    cy.get("aside").contains("Banane").click();
    cy.get("header").contains("Banane");
    cy.deleteBoard("Ananas");
    cy.deleteBoard("Banane");
    cy.get("main").contains("button", "Add New Board");
  });
});
