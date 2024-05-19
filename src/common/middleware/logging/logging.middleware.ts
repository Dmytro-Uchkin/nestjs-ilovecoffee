import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const t0 = performance.now();

    res.on('finish', () => console.log(
      req.method,
      req.originalUrl,
      `${(performance.now() - t0).toFixed(3)} ms`,
    ));
    next();
  }
}
