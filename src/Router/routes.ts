import { Router } from 'express';
import { Controller } from '../controller/controller';

import { Repository } from '../repository/repository';

export const Routers = Router();
const controller = new Controller(Repository.getInstance());

Routers.get('/', controller.query.bind(controller));
Routers.post('/', controller.CreateCandidate.bind(controller));
