import jwt from 'jsonwebtoken';
import xmlify from 'xmlify';
import config from '../config';

const jwtVerify = (token, secret) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });

export const createTokens = (userId) => {
    try {
        const accessToken = jwt.sign(
            { userId },
            config.ACCESS_TOKEN.secret,
            config.ACCESS_TOKEN.options
        );

        return { accessToken };
    } catch (error) {
        return {};
    }
};

export const jwtMiddleware = async (req, res, next) => {
    const [bearer, token] = (req.headers.authorization ?? '').split(' ');

    try {
        if (bearer && token) {
            jwt.verify(token, config.ACCESS_TOKEN.secret, (err, decoded) => {
                if (err) {
                    throw new Error(err.message);
                } else {
                    req.userId = decoded.userId;
                }
            });
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        res.setHeader('Content-Type', 'text/xml');
        res.status(403).send(xmlify({ message: error.message }));
    } finally {
        next();
    }
};
