import express from 'express';

const router = express.Router();

router.post("/signup" , (req , res) => {
    res.send("Signup Route");
});

router.post("/login" , (req , res) => {
    res.send("login Route");
});

router.post("/logout" , (req , res) => {
    res.send("logout Route");
});


export default router;