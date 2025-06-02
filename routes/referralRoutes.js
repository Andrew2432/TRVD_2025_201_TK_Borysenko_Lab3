const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const multer = require('multer');
const path = require('path');



router.get('/', referralController.getReferrals);
router.post('/', (req, res) => {
  console.log(' POST /referrals отримано');
  referralController.createReferral(req, res);
});
router.get('/:id/edit', referralController.editReferralForm);
router.post('/edit/:id', (req, res) => {
  console.log('POST /referrals/:id/edit отримано');
  referralController.updateReferral(req, res);
});
router.post('/:id/delete', referralController.deleteReferral);


module.exports = router;    