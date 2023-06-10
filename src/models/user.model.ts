import { model, models, Model, Document, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    google: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

interface IUser extends Document {
  name: string;
  username: string;
  email?: string | undefined;
  password?: string | undefined;
}

const UserModel = (models.user as Model<IUser>) || model("user", userSchema);

export default UserModel;
