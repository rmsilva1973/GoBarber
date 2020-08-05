import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthentication';

const profileRouter = Router();
const profileControlller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileControlller.update);
profileRouter.get('/', profileControlller.show);

export default profileRouter;
