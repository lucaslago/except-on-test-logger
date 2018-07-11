module.exports = new Proxy( console, {
  get: function ( target, prop ) {
    // Hotfix for a very specific runtime where "process" is not defined
    if(!process) return target[prop];
    if(process.env.NODE_ENV === 'test') return () => {};
    return target[prop];
  }
});
