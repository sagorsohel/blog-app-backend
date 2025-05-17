const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    status:{
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    }
  },
  {
    timestamps: true,
  }
);
const Post = model("Post", postSchema);

module.exports = Post;