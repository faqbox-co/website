import { model, models, Model, Schema, Document } from "mongoose";
import TypeUserData from "@/types/user-data";

const faqSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    theme: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageHash: {
      type: String,
      default: "",
    },
    image: String,
    email: {
      type: String,
      required: true,
    },
    data: {
      type: [
        {
          id: String,
          q: String,
          a: String,
        },
      ],
      required: true,
      default: [],
    },
    faqs: {
      type: [
        {
          id: String,
          q: String,
          a: String,
        },
      ],
      required: true,
      default: [],
    },
    links: {
      type: [
        {
          id: String,
          url: String,
          title: String,
          urlType: String,
        },
      ],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type IMFaq = TypeUserData & Document;

const faqModel = (models.faq as Model<IMFaq>) || model("faq", faqSchema);

export default faqModel;
