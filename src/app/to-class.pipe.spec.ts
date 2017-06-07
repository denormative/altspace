import { ToClassPipe } from './to-class.pipe';

describe('ToClassPipe', () => {
  it('create an instance', () => {
    const pipe = new ToClassPipe();
    expect(pipe).toBeTruthy();
  });
});
