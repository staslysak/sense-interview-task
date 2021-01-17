import xmlify from 'xmlify';
import { User } from '../models/user';
import { hashPassword } from '../utils';

export const getSelfContoller = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId }).select(
            '-password'
        );

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).send(xmlify(user, 'user'));
    } catch (error) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(404).send(xmlify({ message: error.message }));
    }
};

export const updateSelfController = async (req, res) => {
    const updateData = {
        username: req.body.root.username[0],
        password: req.body.root.password[0],
    };

    try {
        if (!Boolean(updateData.password.length)) {
            delete updateData.password;
        } else {
            updateData.password = await hashPassword(updateData.password);
        }

        const user = await User.findOneAndUpdate(
            { _id: req.userId },
            updateData,
            {
                new: true,
            }
        ).select('-password');

        res.setHeader('Content-Type', 'text/xml');
        res.status(200).send(xmlify(user, 'user'));
    } catch (error) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(404).send(xmlify({ message: error.message }));
    }
};

export const deleteSelfController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });

        if (!user) {
            throw new Error("User doesn't exists");
        }

        await User.deleteOne({ _id: user._id });

        res.status(200).send();
    } catch (error) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(404).send(xmlify({ message: error.message }));
    }
};
