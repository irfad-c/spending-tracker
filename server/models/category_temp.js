import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const CategoryVariable = mongoose.model("Category", CategorySchema);

export { CategoryVariable };
