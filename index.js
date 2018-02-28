const log = value => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(value);
  }
};

module.exports = { log };
