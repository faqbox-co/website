import mongoose from "mongoose";

async function connectMongo() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL!);

    if (connection.readyState === 1) {
      console.debug(`mongoDB connect called`);
      return Promise.resolve(true);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

connectMongo.isConnected = false;

export default async function connect() {
  if (!connectMongo.isConnected) {
    connectMongo.isConnected = true;
    return await connectMongo();
  } else return null;
}
