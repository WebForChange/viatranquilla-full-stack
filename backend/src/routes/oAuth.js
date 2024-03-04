import express from "express";
import verifyToken from '../middlewares/verifyToken.js';
import { OAuth2Client } from "google-auth-library"

const router = express.Router();

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log('data',data);
}

router.get('/', async function(req,res,next) {
    const code = req.query.code;
    console.log(code);
    try{
        const redirectUrl = 'http://127.0.0.1:3000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const tokenResponse = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(tokenResponse.tokens);
        // res.json('Tokens acquired')
        console.log('Tokens acquired');
        const user = oAuth2Client.credentials;
        // res.json('credentials',user)
        console.log('credentials',user);
        await getUserData(user.access_token);
    } catch(err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    res.redirect(303, 'http://localhost:5173/');
})

export default router;