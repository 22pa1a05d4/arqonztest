// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dnx-settings', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;




const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("❌ MONGO_URI is not defined in .env");
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName: 'dnx-settings', // 🚀 force correct DB
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
