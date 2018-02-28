const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('.');

describe('ExceptOnTestLogger', () => {
  let consoleLogStub;

  beforeEach(() => {
    consoleLogStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    consoleLogStub.restore();
  });

  describe('.log()', () => {
    context('when environment is "test"', () => {
      it('does not invoke console.log', () => {
        process.env.NODE_ENV = 'test';
        logger.log('Hello world.');
        sinon.assert.notCalled(consoleLogStub);
      });
    });
    context('when environment is different than "test"', () => {
      it('invokes console.log', () => {
        process.env.NODE_ENV = 'production';
        logger.log('Hello world.');
        sinon.assert.calledWith(consoleLogStub, 'Hello world.');
      });
    })
  });
})
