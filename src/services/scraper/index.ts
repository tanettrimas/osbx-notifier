import httpRequester from '../../lib/http';

// TODO: Refactor CheerioElement to a type with only the props needed. E.g only data, name, tag and children
export interface ScraperService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrape: (rows: CheerioElement[], scrapeFunc: (rows: CheerioElement[]) => any) => any;
  getHTML: (url: string) => Promise<CheerioStatic>;
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
  function scrape(rows: CheerioElement[], scrapeFunc: (rows: CheerioElement[]) => any) {
    return scrapeFunc(rows);
  }

  return Object.freeze({
    getHTML,
    scrape,
  });
}

export default Scraper;
