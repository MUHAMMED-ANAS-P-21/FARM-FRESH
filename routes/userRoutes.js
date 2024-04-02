const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('user/index');
});
router.get('/about', (req, res) => {
    res.render('user/about');
});
router.get('/service', (req, res) => {
    res.render('user/service');
});
router.get('/product', (req, res) => {
    res.render('user/product');
});
router.get('/contact', (req, res) => {
    res.render('user/contact');
});
router.get('/blog', (req, res) => {
    res.render('user/blog');
});
router.get('/detail', (req, res) => {
    res.render('user/detail');
});
router.get('/feature', (req, res) => {
    res.render('user/feature');
});
router.get('/team', (req, res) => {
    res.render('user/team');
});
router.get('/testimonial', (req, res) => {
    res.render('user/testimonial');
});
module.exports = router;
