const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const isRole = require('../middleware/isRole')
const {
  AuthController,
  ApplicationTransferController,
  ApplicationReceiveController,
  UploadController,
  CategoryController,
  PropertyController,
  ThingController,
  UserController,
  RoleController,
  StatusController,
  AccountController
} = require('../../controllers')

router.use('/auth', AuthController)

router.use(checkAuth)

router.use('/app-transfers', isRole(['admin']), ApplicationTransferController)
router.use('/uploads', UploadController)
router.use('/app-receives', isRole(['admin']), ApplicationReceiveController)
router.use('/categories', isRole(['admin']), CategoryController)
router.use('/properties', isRole(['admin']), PropertyController)
router.use('/users', UserController)
router.use('/roles', isRole(['admin']), RoleController)
router.use('/statuses', StatusController)
router.use('/things', isRole(['admin']), ThingController)
router.use('/account', AccountController)

module.exports = router
