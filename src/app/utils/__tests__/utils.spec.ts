import { getYear } from '../';

describe('Testing utils', () => {
  test('should be the correct year', () => {
    const year = getYear('2005-06-08');
    expect(year).toBe('2005');
  });
});
