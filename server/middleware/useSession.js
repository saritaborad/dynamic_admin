const session = require("express-session");

const useSession = (store) => {
 return (req, res, next) => {
  if (req.path === "/app/addFilter" || req.path === "/app/getAllFilter") {
   session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
   })(req, res, next);
  } else {
   next();
  }
 };
};

module.exports = useSession;
