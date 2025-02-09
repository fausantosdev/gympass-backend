export class MaxNumbersOfCkeckInsError extends Error {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
