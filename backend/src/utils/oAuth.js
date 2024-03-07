import express from "express";
import { OAuth2Client } from "google-auth-library"
import User from "../models/userModel.js"
import Profile from "../models/profileModel.js";
import bcrypt from "bcrypt";
import { sendPassEmail } from "./EmailPass.js";

const router = express.Router();

async function getUserData(access_token) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
}

async function testOpen(id_token) {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`)
    // console.log('response',response)
    const data = await response.json()
    // console.log('Opend ID data',data)
}

async function getKeys() {
    const response = await fetch(`https://accounts.google.com/.well-known/openid-configuration`)
    // console.log('response',response)
    const data = await response.json()
    // console.log('Discovery Doc',data)

    const jwtCerts = await fetch(data.jwks_uri)
    const jwtData = await jwtCerts.json()
    // console.log('Certs',jwtData)

    return jwtData
}

router.get('/', async function(req,res,next) {

    const code = req.query.code;

    try{
        const redirectURL = 'http://127.0.0.1:3000/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        );
        const tokenResponse = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(tokenResponse.tokens);

        const user = oAuth2Client.credentials;

        await getUserData(user.access_token);

        const ticket = await oAuth2Client.verifyIdToken({idToken: user.id_token, audience: process.env.CLIENT_ID});
        const payload = ticket.getPayload();

        const username = payload['name'];
        const email = payload['email'];
        const password = payload['at_hash'];

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
          });

          const newProfile = await Profile.create({
            username: username,
            firstName: "",
            lastName: "",
            birthDate: "",
            phone: "",
            street: "",
            houseNumber: "",
            zip: "",
            city: "",
            country: "",
            state: "",
            profilePicture: "",
            bio: "",
            createdTrips: [],
            joinedTrips: [],
          });

          await sendPassEmail(email, username, password)

          res.redirect(303, 'http://localhost:5173/oauthmessage');
        } catch(error) {
          if (error.code === 11000) {
            res.redirect(303, 'http://localhost:5173/duplicateerror');
          } else {
            res.redirect(303, 'http://localhost:5173/NotFound');
          }
        }
      });

export default router;