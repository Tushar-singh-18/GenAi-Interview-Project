const { GoogleGenAI, Models } = require("@google/genai")
const { z, config } = require("zod")
const { ztoSchema, default: zodToJsonSchema } = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_AI_KEY,
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("Overall candidate match score 0-100"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in an interview along with their intention and how to answer"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in an interview along with their intention and how to answer"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skills i.e how important is for candidate")
    })).describe("List of skill gap in the candidate's profile along with their skills"),

    preparationPlan: z.array(z.object({
        // matchScore: z.number().describe("a score between o to 100 defining how well candidate has performed in the interview"),
        day: z.number().describe("The day number for preparation plan, starting from day 1"),
        focus: z.string().describe("the main focus of this on preparation which is requried for the interview"),
        tasks: z.array(z.string()).describe("List of tasks for this day")
    })).describe("A proper plan of action for the interview and everything above")
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    prompt = `Generate an interview report for a candidate with the following details:
                        Resume:${resume},
                        Self Description:${selfDescription}
                        Job Description:${jobDescription}`

    console.log(JSON.stringify(zodToJsonSchema(interviewReportSchema, { $refStrategy: "none" }), null, 2))

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema, { $refStrategy: "none" }),
        }
    })

    return JSON.parse(response.text);

}

module.exports = generateInterviewReport