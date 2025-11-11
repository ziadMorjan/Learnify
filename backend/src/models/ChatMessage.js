import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    role: { type: String, enum: ['user', 'assistant', 'system'], default: 'user' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const ChatMessage =
  mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
