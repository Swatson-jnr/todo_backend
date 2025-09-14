import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpiredAt: { type: Number, default: 0 },
  isAccountedVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpiredAt: { type: Number, default: 0 },
  todo: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      priority: { type: String, required: true },
      completed: { type: Boolean, default: false },
      dueDate: { type: Date },
    },
  ],
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
