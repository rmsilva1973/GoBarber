import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthentication';

const profileRouter = Router();
const profileControlller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  profileControlller.update);
profileRouter.get('/', profileControlller.show);

export default profileRouter;
