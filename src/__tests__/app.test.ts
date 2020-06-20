// eslint-disable-next-line node/no-unpublished-import
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('Express app', () => {
  it('should not show stacktrace', async () => {
    process.env.NODE_ENV = 'production';
    const response = await request.get('/something-gibberish');
    expect(response.body.stacktrace).toBe(null);
  });

  it('should return 404 on not found route', async () => {
    process.env.NODE_ENV = 'test';
    const response = await request.get('/something-gibberish');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Route /something-gibberish was not found!');
  });
});
