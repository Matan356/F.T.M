import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { EventsDocument } from "./events.model";

export interface UserInput {
  name: string;
  lastName: String;
  password: string;
  workerId: string;
  role: string;
  phone: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
  calendar: [EventsDocument["_id"]];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    workerId: { type: String, required: true, unique: true, length: 4 },
    role: { type: String, required: true, enum: ["admin", "employee"] },
    phone: { type: String, required: true, minlength: 9 },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
