import express from 'express'
import uniqid from 'uniqid';

const router = express.Router()

let courses = []

router.get('/', (req, res) => {
  res.json({ data: courses })
})

router.post('/', (req, res) => {
  const course = req.body
  course.id = uniqid()
  courses.unshift(course)
  res.json(course)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  courses = courses.filter(course => course.id !== id)
  res.json({id})
})


export default router
