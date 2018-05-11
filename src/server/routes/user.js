const express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const router = express.Router();

const User = require('../../models/Users');

router.route('/')
    .get((req, res) => {

        User.find((err, users) => {
            if (err)
                return res.json({success: false, error: err});
            return res.json(users)
        });
    })

    .post((req, res) => {
        const user = new User();
        user.name = req.body.name;
        user.id = req.body.id;
        user.socketID = req.body.socketID;
        user.password = req.body.password;

        user.save((err) => {
            if (err) return res.send({success: false, error: err});
            return res.json({success: true, user});
        });
    });


module.exports = router;

// router.post('/', (req, res) => {
//     console.log('user signup');
//
//     const { username, password } = req.body
//     // ADD VALIDATION
//     User.findOne({ username: username }, (err, user) => {
//         if (err) {
//             console.log('User.js post error: ', err)
//         } else if (user) {
//             res.json({
//                 error: `Sorry, already a user with the username: ${username}`
//             })
//         }
//         else {
//             const newUser = new User({
//                 username: username,
//                 password: password
//             })
//             newUser.save((err, savedUser) => {
//                 if (err) return res.json(err)
//                 res.json(savedUser)
//             })
//         }
//     })
// })
//
// router.post(
//     '/login',
//     function (req, res, next) {
//         console.log('routes/user.js, login, req.body: ');
//         console.log(req.body)
//         next()
//     },
//     passport.authenticate('local'),
//     (req, res) => {
//         console.log('logged in', req.user);
//         var userInfo = {
//             username: req.user.username
//         };
//         res.send(userInfo);
//     }
// )
//
// router.get('/', (req, res, next) => {
//     console.log('===== user!!======')
//     console.log(req.user)
//     if (req.user) {
//         res.json({ user: req.user })
//     } else {
//         res.json({ user: null })
//     }
// })
//
// router.post('/logout', (req, res) => {
//     if (req.user) {
//         req.logout()
//         res.send({ msg: 'logging out' })
//     } else {
//         res.send({ msg: 'no user to log out' })
//     }
// });

module.exports = router