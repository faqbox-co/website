import { model, models, Model, Document, Schema } from "mongoose";

const pictureSchema = new Schema({
  name: {
    type: String,
  },
  users: [
    {
      type: String,
      default: [],
    },
  ],
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

interface IPicture {
  name: string;
  users: string[];
  hash: string;
  data: Buffer;
  contentType: string;
}

const pictureModel =
  (models.picture as Model<IPicture>) || model("picture", pictureSchema);

export default pictureModel;
