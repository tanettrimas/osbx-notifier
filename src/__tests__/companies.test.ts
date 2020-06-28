// eslint-disable-next-line node/no-unpublished-import
import supertest from 'supertest';
import app from '../app';
import companies2018 from './__fixtures__/companies-2018.json';

const request = supertest(app);

describe('GET /api/companies/:year', () => {
  it('should return a 200 status', async () => {
    const response = await request.get('/api/companies/2018');
    expect(response.status).toBe(200);
  });

  it('should return the correct Content-Type', async () => {
    const response = await request.get('/api/companies/2018');
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('should have the correct properties', async () => {
    const response = await request.get('/api/companies/2018');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBeTruthy();
    const randomCompany = response.body.data[Math.floor(Math.random() * response.body.data.length)];
    expect(randomCompany).toHaveProperty('ticket');
    expect(randomCompany).toHaveProperty('date');
    expect(randomCompany).toHaveProperty('company');
    expect(randomCompany).toHaveProperty('marked');
  });

  it('should return an array of companies', async () => {
    const response = await request.get('/api/companies/2018');
    expect(response.body).toEqual(companies2018);
  });

  it('should return error on invalid query', async () => {
    const response = await request.get('/api/companies/notValidYear');
    expect(response.status).toBe(422);
    expect(response.body.message).toBe('No companies found. Hint: Check your query');
  });
});
