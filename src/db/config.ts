import mongoose from 'mongoose'

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('Successfully Connected')
    })

    connection.on('error', (err) => {
      console.log('Error ' + err)
    })
  } catch (error) {
    console.log('Something went wrong ' + error)
  }
}
