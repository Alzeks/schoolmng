import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

const teacherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20, },
    password: { type: String, required: true, },
    lastname: { type: String, },
    img: { type: String, },
    isActive: { type: Boolean, default: true, },
    phone: { type: String, },
    address: { type: String, },
    subject: { type: String, },
  },
  { timestamps: true }
);

const subjectSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, unique: true, min: 3, max: 20, },
    teacher: {type: String},
    img: { type: String, },
  },
  { timestamps: true }
);

// export const User = mongoose.models.User || mongoose.model("User", userSchema);
//export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
export const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
