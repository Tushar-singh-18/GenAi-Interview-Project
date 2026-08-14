const express = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../Controller/interview.controller")


const upload = require('../middleware/file.middleware')

const interviewRouter = express.Router()

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)




module.exports = interviewRouter