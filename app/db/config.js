const mongoose = require("mongoose");
// here is db connection code -------->
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("\x1b[32m%s\x1b[0m", "✅ Connected to MongoDB ✅"); // \x1b[32m sets the color to green, \x1b[0m resets the color
  } catch (error) {
    console.error("❌ Error connecting to MongoDB: ❌", error);
    throw error; // Rethrow the error to be handled by the calling code ----->
  }
};

// You can export the connectToDatabase function directly
module.exports = connectToDatabase;



