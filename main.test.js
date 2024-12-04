import { validateName } from './main';

describe('validateName', () => {
  let nombres;

  beforeEach(() => {
    nombres = ['ALICE', 'BOB', 'CHARLIE'];
  });

  test ('debe devolver falso si elnombre está vacío', () => {
    const result = validateName('');
    expect(result).toBe(false);
  })
})