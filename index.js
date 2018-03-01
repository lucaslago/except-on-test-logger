module.exports = new Proxy( { }, {
  get: function ( target, prop ) {
    return process.env.NODE_ENV === 'test' ? () => { } : console[prop];
  }
});
