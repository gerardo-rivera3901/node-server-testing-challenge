const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

const Samuel = { name: 'Samuel' };
const Juan = { name: 'Juan' };
const Rodrigo = { name: 'Rodrigo' };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('chihuahuas').truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe('server.js', () => {
  describe('[GET] /', () => {
    it('should return 200 status code', async () => {
      const data = await request(server).get('/');
      expect(data.status).toBe(200);
    });
    it('should be JSON', async () => {
      const data = await request(server).get('/');
      expect(data.type).toBe('application/json');
    });
  });
  describe('[GET] /chihuahuas', () => {
    it('should return 200 status code', async () => {
      await db('chihuahuas').insert(Samuel);
      const data = await request(server).get('/chihuahuas');
      expect(data.status).toBe(200);
    });
    it('should return 404 status code', async () => {
      const data = await request(server).get('/chihuahuas');
      expect(data.status).toBe(404);
    });
    it('should be JSON', async () => {
      const data = await request(server).get('/');
      expect(data.type).toBe('application/json');
    });
  });
  describe('[POST] /chihuahuas', () => {
    it('should return 201 status code', async () => {
      const data = await request(server).post('/chihuahuas').send(Juan);
      expect(data.status).toBe(201);
      expect(data.body.name).toBe('Juan');
    });
    it('should successfully post a new chihuahua', async () => {
      const data = await request(server).post('/chihuahuas').send(Rodrigo);
      expect(data.body.name).toBe('Rodrigo');
    });
    it('should be JSON', async () => {
      const data = await request(server).get('/');
      expect(data.type).toBe('application/json');
    });
  });
  describe('[DELETE] /:id', () => {
    it('should return 200 status code', async () => {
      await db('chihuahuas').insert(Samuel);
      const data = await request(server).delete('/chihuahuas/1');
      expect(data.status).toBe(200);
    });
    it('should return 404 status code', async () => {
      const data = await request(server).delete('/chihuahuas/1234');
      expect(data.status).toBe(404);
    });
    it('should be JSON', async () => {
      const data = await request(server).get('/');
      expect(data.type).toBe('application/json');
    });
  });
});