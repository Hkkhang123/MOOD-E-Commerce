import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import products from "./data/products.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.create({
      name: "admin",
      email: "Admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userId = createdUser._id
    
    const sample = products.map((product) => {
      return {
        ...product, user: userId,
      };
    });

    await Product.insertMany(sample);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();