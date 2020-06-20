import { Router } from 'express';
import cheerio from 'cheerio';
import STRINGS from '../../constants/strings';

import Scraper from '../../services/scraper';

import getCompaniesFromOsloBors from './getCompaniesFromOsloBors';

const router: Router = Router();
const scraper = Scraper({ webscraper: cheerio });

router.get('/:year', async (req, res, next) => {
  try {
    const $ = await scraper.getHTML(`${STRINGS.OSBX_URL}${req.params.year}`);
    const table = $('tbody');
    const [, ...rows] = table.children().toArray();
    if (!rows.length) {
      res.status(422);
      return next(new Error('No companies found. Hint: Check your query'));
    }
    const companyInformation = scraper.scrape(rows, getCompaniesFromOsloBors);
    return res.send({ data: companyInformation });
  } catch (e) {
    return next(e);
  }
});

export default router;
