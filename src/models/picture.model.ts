import { model, models, Model, Document, Schema } from "mongoose";

const pictureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: String,
    required: true,
  },
});

interface IPicture extends Document {
  name: string;
  data: string;
}

const pictureModel =
  (models.picture as Model<IPicture>) || model("picture", pictureSchema);

export default pictureModel;
