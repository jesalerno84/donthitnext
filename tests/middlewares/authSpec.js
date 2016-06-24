const auth = require('../../middlewares/auth');
const sinon = require('sinon');
const should = require('chai').should();

describe('middlewares/auth', () => {
    it('should return the result of next() if res.isAuthenticated() is true', () => {
        const nextResult = {};
        const req = {
            isAuthenticated: sinon.stub()
        };
        const res = {
            redirect: sinon.stub()
        };
        const next = sinon.stub();
        next.returns(nextResult);
        
        req.isAuthenticated.returns(true);
        
        const result = auth(req, res, next);
        
        next.callCount.should.equal(1);
        result.should.deep.equal(nextResult);
        
    });
    it('should call res.redirect() with the appropriate url if res.isAuthenticated() is false', () => {
        const nextResult = {};
        const req = {
            isAuthenticated: sinon.stub()
        };
        const res = {
            redirect: sinon.stub()
        };
        const next = sinon.stub();
        next.returns(nextResult);
        
        req.isAuthenticated.returns(false);
        
        const result = auth(req, res, next);
        
        next.callCount.should.equal(0);
        should.not.exist(result);
        res.redirect.calledWithExactly('/auth/spotify').should.be.true;
    });
});