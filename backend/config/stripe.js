
const STRIPE_SECRET_KEY="sk_test_51QVogBJAkdOajGzVdfsPzKP8S20nR10lJibmgbjrPoz46bwZ8hudf2jtkcp4Ju8Xr8QPyRju7Aq1H8MdkurcHSgk00R8WfxldZ"

const stripe = require('stripe')(STRIPE_SECRET_KEY);
module.exports = stripe;
