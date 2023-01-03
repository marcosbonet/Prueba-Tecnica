import createDebug from 'debug';
import { NextFunction, Response, Request } from 'express';
import { Error } from 'mongoose';
import { HTTPError } from '../interfaces/error.js';

import { Repository } from '../repository/repository.js';

const debug = createDebug('FP:player:controller');

export class Controller {
    constructor(public repository: Repository) {
        debug('controller');
    }

    async CreateCandidate(req: Request, res: Response, next: NextFunction) {
        try {
            const candidate = await this.repository.create(req.body);

            res.status(201);

            res.json({ candidate });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Services Unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async query(req: Request, res: Response, next: NextFunction) {
        try {
            debug('query');

            const candidates = await this.repository.get();

            res.status(201);
            res.json({ candidates });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Services Unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
}
