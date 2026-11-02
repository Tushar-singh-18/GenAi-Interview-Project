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
        const upstreamStatus = error.status || error.response?.status
        console.error("Interview report AI generation failed:", {
            status: upstreamStatus,
            code: error.code,
            message: error.message
        })

        if (error.code === "AI_API_KEY_MISSING") {
            return res.status(503).json({
                message: "Interview generation is not configured. Add a Gemini API key to the backend deployment."
            })
        }

        if (upstreamStatus === 401 || upstreamStatus === 403) {
            return res.status(503).json({
                message: "The Gemini API key is invalid or does not have access. Check the backend deployment's Gemini credentials."
            })
        }

        if (upstreamStatus === 429) {
            return res.status(503).json({
                message: "Gemini's usage quota is currently exhausted. Check the API project's quota or billing, then try again."
            })
        }

        if (upstreamStatus === 400) {
            return res.status(502).json({
                message: "Gemini rejected the generation request. Check the backend logs for the provider's error details."
            })
        }

        if (upstreamStatus === 404) {
            return res.status(503).json({
                message: "The configured Gemini model is unavailable to this API project. Check the model name and project access."
            })
        }

        if (upstreamStatus >= 500) {
            return res.status(503).json({
                message: "Gemini is temporarily unavailable. Please try again shortly."
            })
        }

        return res.status(502).json({
            message: "Interview generation failed before Gemini returned a report. Check the backend logs for the error details."
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