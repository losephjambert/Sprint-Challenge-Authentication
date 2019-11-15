const db = require('../database/dbConfig.js');

const { add } = require('../users/users-model.js');

describe('users model', () => {
  describe('add()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    it('should insert a user', async () => {
      await add({ username: 'sam', password: 'this is a password' });

      const users = await db('users');

      expect(users).toHaveLength(1);
    });

    it('should add the provided user', async () => {
      await add({ username: 'jeff', password: 'password' });
      await add({ username: 'gladys', password: 'password' });

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('jeff');
      expect(users[1].username).toBe('gladys');
    });

    it('should return the added user', async () => {
      let user = await add({ username: 'jeff', password: 'password' });
      expect(user.username).toBe('jeff');
      expect(user.id).toBeDefined();

      user = await add({ username: 'billy', password: 'password' });
      expect(user.username).toBe('billy');
      expect(user.id).toBeDefined();
    });
  });
});
