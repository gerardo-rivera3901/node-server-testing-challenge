const Chihuahua = require('./chihuahua-model');
const db = require('../../data/dbConfig');

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

describe('Chihuahua Model', () => {
  it('can create a new chihuahua', async () => {
    await db('chihuahuas').insert(Samuel);
    const result = await Chihuahua.getAll();
    expect(result).toHaveLength(1);
  });
  it('can delete a chihuahua', async () => {
    await db('chihuahuas').insert(Juan);
    await db('chihuahuas').insert(Rodrigo);
    await Chihuahua.remove(1);
    const result = await Chihuahua.getAll();
    expect(result).toHaveLength(1);
  });
});