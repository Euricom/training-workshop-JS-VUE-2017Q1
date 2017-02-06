export class RequestError extends Error {
  constructor(message = 'The request failed') {
    super()
    this.name = RequestError.name
    this.message = message
  }
}

export class NoNetworkError extends RequestError {
  constructor(message = 'There is no network connection') {
    super(message)
    this.name = NoNetworkError.name
  }
}

export class NotFoundError extends RequestError {
  constructor(message = 'The resource is not found') {
    super(message)
    this.name = NotFoundError.name
  }
}

export class ApiError extends RequestError {
  constructor(status, statusText, response) {
    super()
    this.response = response
    this.status = status
    this.statusText = statusText
    this.name = ApiError.name
    this.message = `Request failed with statusCode: ${status}`
  }
}
