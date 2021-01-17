import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import xmlparser from 'express-xml-bodyparser';
import mongoose from 'mongoose';
import cors from 'cors';

import { authRoutes, userRoutes } from './routes';
import config from './config';

const app = express();

mongoose.connect(config.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(cors({ origins: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(xmlparser());

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(config.PORT, () =>
    console.log(`Server running at http://localhost:${config.PORT}`)
);
