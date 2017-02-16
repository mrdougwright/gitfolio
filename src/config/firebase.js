const Rebase = require('re-base');
const Base = Rebase.createClass({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "gitfolio-7a90c.firebaseapp.com",
  databaseURL: "https://gitfolio-7a90c.firebaseio.com",
  storageBucket: "gitfolio-7a90c.appspot.com",
  messagingSenderId: "186515557528"
})

export default Base;
