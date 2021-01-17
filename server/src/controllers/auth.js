import xmlify from 'xmlify';
import { createTokens } from '../utils';
import { User } from '../models/user';

export const loginController = async (req, res) => {
    const password = req.body.root.password[0];
    const username = req.body.root.username[0];

    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error("User doesn't exists");
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
            throw new Error("Credantials doesn't match");
        }

        const tokens = createTokens(user._id);

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).send(xmlify({ user, ...tokens }));
    } catch (error) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(404).send(xmlify({ message: error.message }));
    }
};

export const signupController = async (req, res) => {
    const password = req.body.root.password[0];
    const username = req.body.root.username[0];

    try {
        const existingUser = await User.findOne({
            username,
        });

        if (existingUser) {
            return res
                .status(404)
                .send(xmlify({ message: 'User already exists' }));
        }

        const newUser = new User({
            username,
            password,
        });

        await newUser.save();

        const tokens = createTokens(newUser._id);

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).send(xmlify({ user: newUser, ...tokens }));
    } catch (error) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(404).send(xmlify({ message: error.message }));
    }
};
