function setCorsHeaders(response: Response) {
    response.headers.set('Content-Type', 'application/json');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS');
    response.headers.set('Access-Control-Max-Age', '86400');
    response.headers.set('Authorization', 'Bearer');
    return response;
}

export { setCorsHeaders };