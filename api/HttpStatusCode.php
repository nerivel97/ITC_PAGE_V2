<?php

enum HttpStatusCode: int {
    case OK = 200;
    case Created = 201;
    case Accepted = 202;
    case NoContent = 204;
    case MovedPermanently = 301;
    case Found = 302;
    case NotModified = 304;
    case BadRequest = 400;
    case Unauthorized = 401;
    case Forbidden = 403;
    case NotFound = 404;
    case MethodNotAllowed = 405;
    case InternalServerError = 500;
}
