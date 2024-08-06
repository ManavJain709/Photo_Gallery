import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

var admin = require("firebase-admin");

var serviceAccount = require("./service.json");



getApps().length === 0 ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://new-2a630-default-rtdb.firebaseio.com"
}) : getApps()[0];

export const admin_auth = getAuth()