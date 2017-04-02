import { ArriaTestPage } from './app.po';

describe('arria-test App', () => {
  let page: ArriaTestPage;

  beforeEach(() => {
    page = new ArriaTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('arria works!');
  });
});
