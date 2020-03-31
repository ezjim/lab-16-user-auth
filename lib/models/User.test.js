require('dotenv').config();

const User = require('./User');

describe('user model test', () => {
  it('hashes a pw', () => {
    const user = new User({
      username: 'jim',
      password: 'jimwashere'
    });
  
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });

  it('creates a jwt auth token', () => {
    const user = new User({
      username: 'jim',
      password: 'jimwashere'
    });

    const token = user.authToken();
    expect(token).toBeTruthy();
  });

  it('finds a user by token', () => {
    const user = new User({
      username: 'spot',
      password: 'spotWasHere'
    });

    const token = user.authToken();

    return User
      .findByToken(token)
      .then(foundUser => {
        expect(foundUser.toJSON()).toEqual(user.toJSON());
      });
  });
});
