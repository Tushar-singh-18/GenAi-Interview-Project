const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require('../Model/interviewReport.model')

async function generateInterviewReportController(req, res) {

    const { selfDescription, jobDescription } = req.body

    if (!jobDescription?.trim()) {
        return res.status(400).json({ message: "Please provide a job description." })
    }

    if (!req.file && !selfDescription?.trim()) {
        return res.status(400).json({ message: "Upload a PDF resume or provide a self-description." })
    }

    if (req.file && (!req.file.originalname.toLowerCase().endsWith(".pdf") || req.file.mimetype !== "application/pdf")) {
        return res.status(400).json({ message: "Only PDF resumes are supported." })
    }

    let resumeContent = ""
    if (req.file) {
        try {
            resumeContent = (await (new pdfParse.PDFParse(new Uint8Array(req.file.buffer))).getText()).text
        } catch {
            return res.status(400).json({ message: "Unable to read the uploaded PDF. Please upload a valid PDF resume." })
        }
    }

    let reportContent
    try {
        reportContent = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })
    } catch (error) {
        console.error("Interview report AI generation failed:", error)
        return res.status(502).json({
            message: "We couldn't generate your interview plan right now. Please try again in a moment."
        })
    }

    let interviewReport
    try {
        interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...reportContent
        })
    } catch (error) {
        console.error("Saving the generated interview report failed:", error)
        return res.status(500).json({
            message: "Your interview plan was generated but couldn't be saved. Please try again."
        })
    }

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })
}

async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })

}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

async function generateResumePdfController(req, res) {

    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }