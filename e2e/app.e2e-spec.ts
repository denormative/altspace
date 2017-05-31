import { AltspacePage } from './app.po';

describe('altspace App', () => {
  let page: AltspacePage;

  beforeEach(() => {
    page = new AltspacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
