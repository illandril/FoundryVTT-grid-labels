import { SocketType } from './sync';

it('has different type ids fro ShowGrid and ShowRulers', () => {
  expect(SocketType.ShowGrid).not.toEqual(SocketType.ShowRulers);
  expect(typeof SocketType.ShowGrid).toBe('number');
  expect(typeof SocketType.ShowRulers).toBe('number');
});
