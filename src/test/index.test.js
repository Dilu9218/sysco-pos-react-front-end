import add from '../index';

describe('Test index.js file', () => {
    it('Tries to import everything in index.js', (done) => {
        expect(add(1, 2)).toBe(3);
        done();
    })
});