import express from 'express'
import coursesRoutes from './courses.js'

const router = express.Router()

router.use('/courses', coursesRoutes)

export default router