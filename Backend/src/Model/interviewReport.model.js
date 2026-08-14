const mongoose = require('mongoose')

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        requried: [true, "Technical question is requried"]
    },
    intention: {
        type: String,
        requried: [true, "Intention question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is requried"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        requried: [true, "Technical question is requried"]
    },
    intention: {
        type: String,
        requried: [true, "Intention question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is requried"]
    }
}, {
    _id: false
})

const skillgapSchema = new mongoose.Schema({
    skill: {
        type: String,
        requried: [true, "Skill is requried"]
    },
    severity: {
        type: String,
        enum: ["low", "high", "medium"],
        requried: [true, "Severnity is requried"]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        requried: [true, "Day is requried"]
    },
    focus: {
        type: String,
        requried: [true, "Focus is requried"]
    },
    tasks: {
        type: [String],
        requried: [true, "Task is requried"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job descrition is requried"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },

    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillgapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema)

module.exports = interviewReportModel