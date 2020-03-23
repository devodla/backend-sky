import 'dotenv/config';
import { connect } from 'mongoose';

beforeAll(async () => {
  this.mongoTestConnection = connect(process.env.MONGO_TEST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

// afterAll(() => setTimeout(() => process.exit(), 1000));
