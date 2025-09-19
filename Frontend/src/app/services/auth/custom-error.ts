export class CustomError extends Error {
    constructor(public override name: string, message?: string) {
      super(message); // Calls the parent Error constructor to set the message
      this.name = name; // We explicitly set the `name` property
    }
  }