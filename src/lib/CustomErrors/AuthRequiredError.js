// utils/errors.js
export class AuthRequiredError extends Error {
  constructor(message ) {
    super(message);
    this.name = "AuthRequiredError";
  }
}
