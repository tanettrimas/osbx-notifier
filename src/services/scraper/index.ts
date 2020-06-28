import cheerio from 'cheerio';
import httpRequester from '../../lib/http';

// TODO: Refactor CheerioElement to a type with only the props needed. E.g only data, name, tag and children
export interface ScraperService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrape: (url: string, scrapeFunc: (rows: CheerioElement[]) => any) => any;
}

function Scraper({ webscraper }: { webscraper: CheerioAPI }): ScraperService {
  async function getHTML(url: string) {
    try {
      const response = await httpRequester.get({
        url,
        headers: {
          'Content-Type': 'text/html',
        },
        method: 'GET',
      });

      if (response.error) {
        throw new Error('Something went wrong during scraping');
      }

      const html = await webscraper.load(response.body);
      return html;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function scrape(url: string, scrapeFunc: (rows: CheerioElement[]) => any) {
    const $ = await getHTML(url);
    const table = $('tbody');
    const [, ...rows] = table.children().toArray();
    if (!rows) {
      return [];
    }
    return scrapeFunc(rows);
  }

  return Object.freeze({
    scrape,
  });
}

export default Scraper({ webscraper: cheerio });
