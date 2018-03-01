module.exports = new Proxy( console, {
  get: function ( target, prop ) {
    return process.env.NODE_ENV === 'test' ? () => { } : target[prop];
  }
});
