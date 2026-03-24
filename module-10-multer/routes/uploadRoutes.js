const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const uploadController = require('../controllers/uploadController');

router.get('/events/uploads', uploadController.setupSSE);
router.post('/upload/avatar', upload.single('avatar'), uploadController.handleSingleUpload);
router.post('/upload/gallery', upload.array('photos', 6), uploadController.handleGalleryUpload);

module.exports = router;