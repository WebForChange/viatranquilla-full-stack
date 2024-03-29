import express from "express";
import { OAuth2Client } from "google-auth-library"

const router = express.Router();

router.post("/", async function(req,res,next) {
    res.header('Access-Controll-Allow-Origin','http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header('Referrer-Policy','no-referrer-when-downgrade');

    const redirectURL = 'http://127.0.0.1:3000/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})
})

export default router;