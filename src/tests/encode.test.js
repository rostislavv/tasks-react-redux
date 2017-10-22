import { encodeParams } from '../lib/encode';

test('/lib/encode encodeParams function test', () => {
  expect(encodeParams({user: 'user', hello: 'world'})).toBe('user=user&hello=world')
});
