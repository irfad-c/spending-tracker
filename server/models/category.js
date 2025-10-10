import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
  },
  { timestamps: true }
);
const CategoryVariable = mongoose.model("Category", CategorySchema);

export { CategoryVariable };
