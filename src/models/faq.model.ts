import { model, models, Model, Schema, Document } from "mongoose";
import IFaq from "@/interfaces/faq";

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
      default: []
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
      default: []
    },
  },
  {
    timestamps: true,
  }
);

export type IMFaq = IFaq & Document;

const faqModel = (models.faq as Model<IFaq>) || model("faq", faqSchema);

export default faqModel;
