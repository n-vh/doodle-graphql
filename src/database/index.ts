import mongoose from 'mongoose';

export namespace Database {
  export async function connect() {
    const url = import.meta.env.VITE_DATABASE_URI;

    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(url);
    } catch (e) {
      console.error(e);
    }
  }
}
