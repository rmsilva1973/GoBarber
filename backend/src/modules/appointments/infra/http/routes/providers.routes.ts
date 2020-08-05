import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityControllerntroller = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityControllerntroller.index);

export default providersRouter;
