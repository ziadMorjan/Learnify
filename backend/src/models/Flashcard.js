import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;
