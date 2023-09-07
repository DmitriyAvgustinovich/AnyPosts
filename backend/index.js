const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { User, sequlize, Post } = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(bodyParser.json());
const secret_key_jwt = '2342qewda'

const jwtGen = (id, username, role) => {
    return jwt.sign(
        { id, username, role },
        secret_key_jwt,
        { expiresIn: '60d' }
    )
}

// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.findAll(); // Получить всех пользователей из базы данных
//         return res.json(users);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });

app.use('/registration', (req, res, next) => {
    console.log('Мидлеваре ёпта');
    next();
});

app.post('/registration', async (req, res) => {
    if (!req.body) return res.send('Чел..... Отправлять данные нужно в body ;)')

    try {
        const { username, password } = req.body;
        // const { img } = req.files;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            let hashPass = await bcrypt.hash(password, 5)
            let user = await User.create({ username, password: hashPass });

            const token = jwtGen(user.id, user.username, user.role)
            return res.json({ token, user })
        } else {
            return res.send("Юзверь с таким username уже существует");
        }
    } catch (err) {
        return res.send(err)
    }
});

app.use('/login', (req, res, next) => {
    console.log('Тоже мидлеваре, потом юзану как нить');
    next();
})

app.post('/login', async (req, res) => {
    if (!req.body) return res.send('Надо через боди данные отправлять, чел ! ! !')
    const { username, password } = req.body;

    if (username && password) {
        const user = await User.findOne({ where: { username } })

        if (user) {
            let check_pass = bcrypt.compareSync(password, user.password)
            if (!check_pass) return res.send('Указан неверный пароль');

            const token = jwtGen(user.id, user.username, user.role)
            return res.json({ token, user })
        } else {
            return res.send('Такой емаил не найден')
        }

    } else {
        return res.send('Необходимо ввести логин и пароль')
    }
})

app.post('/refreshJWT', async (req, res) => {
    const { token } = req.body;

    try {
        if (!token) return res.send('Ноу токен провайдер')

        const expiresIn = '60d';

        const user = jwt.verify(token, secret_key_jwt);
        const user1 = await User.findOne({ where: { username: user.username } });

        const newToken = jwt.sign({
            id: user.id, username: user.username, role: user.role
        },
            secret_key_jwt, {
            expiresIn: expiresIn,
        });

        return res.json({ token: newToken, user: user1 });
    } catch (err) {
        console.error(err);
        return res.send('Ошибка шо таке')
    }
})

const decodeToken = (token) => {
    const clearToken = token.split(' ')[1]

    jwt.verify(clearToken, secret_key_jwt, (err, decoded) => {
        err ? ('Ошибка верификации токена:', err) : decoded
    });
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Требуется авторизация.' });

    jwt.verify(token.split(' ')[1], secret_key_jwt, (err, user) => {
        if (err) return res.status(403).json({ error: 'Недействительный токен.' });

        req.user = user;
        next();
    });
};

app.post('/addPost', verifyToken, async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Пользователь не авторизован.' });

        decodeToken(req.headers.authorization)
        const findUser = await User.findOne({ where: { id: req.user.id } })

        const { title, text } = req.body;
        const newPost = await Post.create({ title, text });

        findUser.posts.push(newPost);
        await findUser.save();

        return res.status(201).json({ message: 'Пост успешно создан.', post: newPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера: ' + err.message });
    }
});

const start = async () => {
    await sequlize.authenticate();
    await sequlize.sync();
    app.listen(3000, 'localhost', () => console.log('Server start epta'));
}

start();