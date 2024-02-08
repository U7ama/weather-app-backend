const express = require("express");
const passport = require("passport");

const router = express.Router();

// Redirect to Google OAuth consent screen
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback handler
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const code = req.query.code;
    console.log("code", code);
    if (code) {
      console.log("DEVELOPMENT", typeof process.env.DEVELOPMENT);
      if (process.env.DEVELOPMENT === "true") {
        res.send(req.user);
      } else {
        res.redirect(
          `${process.env.FRONTEND_URL}?user=${JSON.stringify(req.user)}`
        );
      }
    }
  }
);

module.exports = router;
