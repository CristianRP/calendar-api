import mongoose from 'mongoose';

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_SRV!);

    console.log('DB Connected');
  } catch(error) {
    console.log(error);
    throw new Error('Error init DB');
  }
}

export {
  dbConnection
}
