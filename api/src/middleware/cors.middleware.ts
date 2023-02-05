import { Injectable, NestMiddleware } from '@nestjs/common';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());


@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
  }
}
