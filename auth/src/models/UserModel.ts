import { Schema, model } from 'mongoose';
import { Encrypt } from '../helpers';

interface UserAttrs {
    email: string;
    password: string;
}

const userSchema = new Schema<UserAttrs>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                delete ret.password;
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            },
        },
    },
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Encrypt.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

export const User = model('User', userSchema)<UserAttrs>;
