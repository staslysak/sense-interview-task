import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) {
    try {
        this.password = await hashPassword(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password'];
        return ret;
    },
});

export const User = mongoose.model('user', UserSchema);
