import { upperCaseFirstLetter, lowerCaseFirstLetter } from './';

describe('UpperCase and lowerCase first letter', () => {
  it('applies upperCasing', () => {
    expect(upperCaseFirstLetter('a text with multiple words.')).toBe(
      'A text with multiple words.',
    );
  });
  it('applies lowerCasing', () => {
    expect(lowerCaseFirstLetter('A text with multiple words.')).toBe(
      'a text with multiple words.',
    );
  });
});
