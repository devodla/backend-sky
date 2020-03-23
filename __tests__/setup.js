import mongoose from 'mongoose';

// Load schemas
import '../src/app/schemas/User';

beforeEach(done => {
  function clearDB() {
    mongoose.connection.collections.forEach(collection => {
      collection.remove();
    });
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.MONGO_TEST}`, // <------- IMPORTANT
      function e(err) {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  }
  return clearDB();
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});
