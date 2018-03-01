const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('.');

describe('ExceptOnTestLogger', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let consoleInfoSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleLogSpy = sinon.spy(console, 'log');
    consoleErrorSpy = sinon.spy(console, 'error');
    consoleInfoSpy = sinon.spy(console, 'info');
    consoleWarnSpy = sinon.spy(console, 'warn');
  });

  afterEach(() => {
    consoleLogSpy.restore();
    consoleErrorSpy.restore();
    consoleInfoSpy.restore();
    consoleWarnSpy.restore();
  });

  describe('.log()', () => {
    context('when environment is "test"', () => {
      it('does not invoke console.log', () => {
        process.env.NODE_ENV = 'test';
        logger.log('Hello world.');
        sinon.assert.notCalled(consoleLogSpy);
      });
    });
    context('when environment is different than "test"', () => {
      it('invokes console.log', () => {
        process.env.NODE_ENV = 'production';
        logger.log('Hello world.');
        sinon.assert.calledWith(consoleLogSpy, 'Hello world.');
      });
    })
  });

  describe('Should respond to any console method', () => {
    it('Should respond to .error', () => {
      process.env.NODE_ENV = 'production';
      logger.error('Puts');
      sinon.assert.calledWith(consoleErrorSpy, 'Puts');
    });

    it('Should respond to .info', () => {
      process.env.NODE_ENV = 'production';
      logger.info('Roses are red');
      sinon.assert.calledWith(consoleInfoSpy, 'Roses are red');
    });

    it('Should respond to .warn', () => {
      process.env.NODE_ENV = 'production';
      logger.warn('Some warn');
      sinon.assert.calledWith(consoleWarnSpy, 'Some warn');
    });
  });
})
