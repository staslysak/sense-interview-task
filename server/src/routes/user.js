import { Router } from 'express';

import { jwtMiddleware } from '../utils';
import {
    getSelfContoller,
    updateSelfController,
    deleteSelfController,
} from '../controllers';

const router = Router();

router.get('/user', jwtMiddleware, getSelfContoller);

router.put('/user', jwtMiddleware, updateSelfController);

router.delete('/user', jwtMiddleware, deleteSelfController);

export default router;
