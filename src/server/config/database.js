import mongoose from 'mongoose';

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error}`);
});

function connect(url) {
  mongoose.connect(url);
}

export default connect;
