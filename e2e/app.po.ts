import { browser, element, by } from 'protractor';

export class ArriaTestPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('arria-root h1')).getText();
  }
}
