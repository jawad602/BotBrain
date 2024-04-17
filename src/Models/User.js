import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    securityCode: {
        type: Number
    },
    status: {
        type: Number,
        default: 0 // 0 for inActive or 1 for Active
    },
    token: {
        type: String
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
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;