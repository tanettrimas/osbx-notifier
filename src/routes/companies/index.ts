import { Router } from 'express';
import STRINGS from '../../constants/strings';

import scraper from '../../services/scraper';

import getCompaniesFromOsloBors from './getCompaniesFromOsloBors';

const router: Router = Router();

router.get('/:year', async (req, res, next) => {
  try {
    const companyInformation = await scraper.scrape(`${STRINGS.OSBX_URL}${req.params.year}`, getCompaniesFromOsloBors);
    if (!companyInformation.length) {
      throw new RangeError('No companies found. Hint: Check your query');
    }
    return res.send({ data: companyInformation });
  } catch (e) {
    if (e instanceof RangeError) {
      res.status(422);
    }
    return next(e);
  }
});

export default router;
