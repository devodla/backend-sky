import { connect } from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.mongoConnection = connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
