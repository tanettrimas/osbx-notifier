import { Router } from 'express';

import companyRouteHandler from './companies';

const router: Router = Router();

// Routes are prefixed with /api, e.g GET /api/companies

router.use('/companies', companyRouteHandler);

export default router;
