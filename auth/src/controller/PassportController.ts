import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Logger } from '@rifqioktario/ticketing-common';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { User } from '../models';

const {
    JWT_SECRET,
    GOOGLE_CALLBACK_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env;

const googleAuthentication = async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
) => {
    try {
        const email = profile?.emails?.[0].value;
        const userId = profile.id;

        const findExistingUser = await User.findOne({ email });
        Logger.debug(`[SigninGoogle] Find existing user: ${findExistingUser}`);

        if (findExistingUser) {
            Logger.info(`[SigninGoogle] Logging in as: ${email}`);

            const userJwt = jwt.sign(
                {
                    id: userId,
                    email,
                },
                JWT_SECRET!,
                { expiresIn: '1d' },
            );

            const responseBuilder = {
                data: { user: email, token: userJwt },
                message: 'User created successfully',
            };

            return done(null, responseBuilder);
        }

        await new User({
            email: email!,
            password: 'password',
        }).save();

        const userJwt = jwt.sign({ id: userId, email }, JWT_SECRET!, {
            expiresIn: '1d',
        });

        const responseBuilder = {
            data: {
                user: email,
                token: userJwt,
            },
            message: 'User signin successfully',
        };

        return done(null, responseBuilder);
    } catch (error: any) {
        Logger.error(`[SigninGoogle] Error: ${error.message}`);
        return done(error, null);
    }
};

passport.use(
    new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
            callbackURL: GOOGLE_CALLBACK_URL!,
        },
        googleAuthentication,
    ),
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;
