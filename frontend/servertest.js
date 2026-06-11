import { test, describe } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from './server.js';
import { processIncomingMetric } from './utils/metricParser.js';

describe('Fundamental Beast Backend Suite', () => {
  let userToken = '';

  test('POST /api/auth/register should create a new user profile', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'trader1', password: 'securePassword123' });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.message, 'User registered');
  });

  test('POST /api/auth/login should authenticate credentials and issue token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'trader1', password: 'securePassword123' });

    assert.strictEqual(response.status, 200);
    assert.ok(response.body.accessToken);
    userToken = response.body.accessToken;
  });

  test('GET /api/economic/calendar should block request without authorization token', async () => {
    const response = await request(app).get('/api/economic/calendar');
    assert.strictEqual(response.status, 101);
  });

  test('GET /api/economic/calendar should return metrics array when authenticated', async () => {
    const response = await request(app)
      .get('/api/economic/calendar')
      .set('Authorization', `Bearer ${userToken}`);

    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(response.body));
  });

  test('Data Pipeline Engine matches Fundamental Excel logic rules', () => {
    const mockInitialState = {
      AUD: { interestRate: 0, inflationRate: 0, unemploymentRate: 0, gdpGrowth: 0, pmi: 0 }
    };

    const mockApiEvent = {
      currency: 'AUD',
      metricName: 'Judo Bank Manufacturing PMI',
      actual: 51.5
    };

    const result = processIncomingMetric(mockInitialState, mockApiEvent);
    assert.strictEqual(result.AUD.pmi, 51.5);
  });
});