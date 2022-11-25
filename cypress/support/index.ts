export {};

declare global {
  namespace Cypress {
    interface Chainable {
      createBoard(boardTitle: string): Chainable<void>;
      deleteBoard(boardTitle: string): Chainable<void>;
    }
  }
}
