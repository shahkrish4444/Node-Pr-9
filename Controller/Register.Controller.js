// const nodemailer = require('nodemailer');
// const RegisterModel = require("../Model/Register.Schema");
// const bcryptjs = require('bcryptjs')
// const express = require('express');
// const router = express.Router();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'shahkrish497@gmail.com',
//         pass: 'ivgn sawp qovm tzjk'
//     }
// });

// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const sendOTP = async (email, otp) => {
//     try {
//         const mailOptions = {
//             from: 'shahkrish497@gmail.com',
//             to: email,
//             subject: 'Your OTP for registration',
//             text: `Your OTP for registration is: ${otp}`
//         };
//         await transporter.sendMail(mailOptions);
//         console.log('OTP sent successfully to', email);
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         throw new Error('Failed to send OTP');
//     }
// };

// const GetRegister = async (req, res) => {
//     res.render('Pages/Register');
// };

// // const PostRegister = async (req, res) => {
// //     try {
// //         const { email } = req.body;
// //         const otp = generateOTP();
// //         await sendOTP(email, otp);

// //         req.session.otp = otp;

// //         res.status(200).send("OTP sent successfully, please check your email");
// //     } catch (error) {
// //         console.error("Error sending OTP:", error);
// //         res.status(500).send("Failed to send OTP");
// //     }
// // };

// // const VerifyOTPAndRegister = async (req, res) => {
// //     try {
// //         const { username, email, password, otp } = req.body;
// //         const storedOTP = req.session.otp;

// //         if (otp === storedOTP) {
// //             const user = new RegisterModel({ username, email, password });
// //             const result = await user.save();
// //             console.log("User Registered Successfully:", result);
// //             res.redirect('/login');
// //             res.status(200).send("User registered successfully");
// //         } else {
// //             res.status(400).send("Incorrect OTP");
// //         }
// //     } catch (error) {
// //         console.error("Error registering user:", error);
// //         res.status(500).send("User Already Exists..");
// //     }
// // };
// const PostRegister = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const otp = generateOTP();
//         await sendOTP(email, otp);

//         req.session.otp = otp;

//         res.status(200).send("OTP sent successfully, please check your email");
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         res.status(500).send("Failed to send OTP");
//     }
// };

// const VerifyOTPAndRegister = async (req, res) => {
//     try {
//         const { username, email, password, otp } = req.body;
//         const storedOTP = req.session.otp;

//         if (otp === storedOTP) {
//             const user = await RegisterModel.findOne({ email });
//             if (!user) {
//                 const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password
//                 const newUser = new RegisterModel({ username, email, password: hashedPassword }); // Save hashed password
//                 await newUser.save();
//                 console.log("User Registered Successfully:", newUser);
//             }
//             res.redirect('/login');
//         } else {
//             res.status(400).send("Incorrect OTP");
//         }
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).send("Failed to register user");
//     }
// };

// module.exports = { GetRegister, PostRegister, VerifyOTPAndRegister };



const nodemailer = require('nodemailer');
const RegisterModel = require("../Model/Register.Schema");
const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shahkrish497@gmail.com',
        pass: 'ivgn sawp qovm tzjk'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email, otp) => {
    try {
        const mailOptions = {
            from: 'shahkrish497@gmail.com',
            to: email,
            subject: 'Your OTP for registration',
            text: `Your OTP for registration is: ${otp}`
        };
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully to', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};

const GetRegister = async (req, res) => {
    res.render('Pages/Register');
};

const PostRegister = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        await sendOTP(email, otp);

        req.session.otp = otp;

        res.status(200).send("OTP sent successfully, please check your email");
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send("Failed to send OTP");
    }
};

const VerifyOTPAndRegister = async (req, res) => {
    try {
        const { username, email, password, otp } = req.body;
        const storedOTP = req.session.otp;

        if (otp === storedOTP) {
            const user = await RegisterModel.findOne({ email });
            if (!user) {
                const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password
                const newUser = new RegisterModel({ username, email, password: hashedPassword }); // Save hashed password
                await newUser.save();
                console.log("User Registered Successfully:", newUser);
            }
            res.redirect('/login');
        } else {
            res.status(400).send("Incorrect OTP");
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Failed to register user");
    }
};

module.exports = { GetRegister, PostRegister, VerifyOTPAndRegister };

