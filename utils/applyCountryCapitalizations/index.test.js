import { applyCountryCapitalizations, applyPeruCapitalizations } from './';
import statusMap from '../../components/BillCard/statusMap';
import { lowerCaseFirstLetter } from '../upperLowerCaseFirstLetter';

describe('Apply country capitalizations with configuration', () => {
  it('applies capitalizations based on a configuration', () => {
    expect(
      applyCountryCapitalizations('an example text.')([
        { keyword: 'example', as: 'Example' },
        { keyword: 'text', as: 'Text' },
      ]),
    ).toBe('an Example Text.');
  });
  it('applies capitalizations with multiple word keywords', () => {
    expect(
      applyCountryCapitalizations('an example text with more words.')([
        { keyword: 'example text', as: 'ExAmPlE tExT' },
        { keyword: 'more', as: 'MoRe' },
      ]),
    ).toBe('an ExAmPlE tExT with MoRe words.');
  });
  it(`doesn't do anything when no configuration is passed`, () => {
    expect(applyCountryCapitalizations('an example text.')()).toBe(
      'an example text.',
    );
  });
});

describe('Apply default country capitalizations', () => {
  it('applies country related capitalizations', () => {
    Object.keys(statusMap).forEach(status =>
      expect(applyPeruCapitalizations(status)).toBe(
        lowerCaseFirstLetter(statusMap[status].capitalized),
      ),
    );
  });
});
