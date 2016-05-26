const should = require('chai').should;
should();

describe('test', () => {
    it('should assert 1 = 1', () => {
        const i = 1;
        i.should.equal(1);
    });
});