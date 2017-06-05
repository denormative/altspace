import { NiceNumberPipe } from './nice-number.pipe';

describe('NiceNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new NiceNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
