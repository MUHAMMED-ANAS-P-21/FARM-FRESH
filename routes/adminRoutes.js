const express = require('express');
const router = express.Router();

router.get('/admlog', (req, res) => {
    res.render('admin/admin-login');
});
router.get('/admreg', (req, res) => {
    res.render('admin/admin-register');
});
router.get('/admdash', (req, res) => {
    res.render('admin/admin-dashboard');
});
router.get('/admcat', (req, res) => {
    res.render('admin/admin-category');
});
router.get('/admvart', (req, res) => {
    res.render('admin/admin-variety');
});
// router.get('/admcust', (req, res) => {  
//     res.render('admin/admin-customer');
// });
router.get('/admmark', (req, res) => {
    res.render('admin/admin-marketing');
});
router.get('/admnoti', (req, res) => {
    res.render('admin/admin-notify');
});
router.get('/admord', (req, res) => {
    res.render('admin/admin-order');
});
// router.get('/admprod', (req, res) => {
//     res.render('admin/admin-product');
// });
module.exports = router;
 

