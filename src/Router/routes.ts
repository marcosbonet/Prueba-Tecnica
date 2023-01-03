import { Router } from 'express';
import { Controller } from '../controller/controller.js';

import { Repository } from '../repository/repository.js';

export const Routers = Router();
const controller = new Controller(Repository.getInstance());

Routers.get('/', controller.query.bind(controller));
Routers.post('/', controller.CreateCandidate.bind(controller));
