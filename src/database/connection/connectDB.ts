const mongoose = require('mongoose')

const connectDB = async (): Promise<void> => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('Database connected'))
    .catch((error: Error) =>
      console.log('Error connecting to database: ', error)
    )
}

export { connectDB }
