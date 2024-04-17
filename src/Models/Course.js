import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    youtubeUrl: {
        type: String,
        required: true,
    },
    author: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        // ref: 'users' ,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});
const Course = mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Course;