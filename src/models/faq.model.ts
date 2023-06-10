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
    },
  },
  {
    timestamps: true,
  }
);

export type IMFaq = IFaq & Document;

const faqModel = (models.faq as Model<IMFaq>) || model("faq", faqSchema);

export default faqModel;
