import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    howToReach: {
      type: String,
      trim: true,
    },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", index: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", index: true },
  },
  { timestamps: true }
);

citySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});
export const City = mongoose.models.City || mongoose.model("City", citySchema);
