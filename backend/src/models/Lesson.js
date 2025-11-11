import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);

export default Lesson;
