import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  isUser: Boolean,
});

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
