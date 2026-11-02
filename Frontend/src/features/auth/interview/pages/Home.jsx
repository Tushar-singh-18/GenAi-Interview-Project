import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useInterview } from '../../hooks/useInterview'

const Home = () => {

  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFileName, setResumeFileName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0]

    if (!jobDescription.trim()) {
      setErrorMessage("Please enter the target job description.")
      return
    }

    if (!resumeFile && !selfDescription.trim()) {
      setErrorMessage("Upload a PDF resume or enter a self-description.")
      return
    }

    if (resumeFile && (!resumeFile.name.toLowerCase().endsWith(".pdf") || resumeFile.size > 3 * 1024 * 1024)) {
      setErrorMessage("Please upload a PDF resume no larger than 3 MB.")
      return
    }

    setErrorMessage("")
    setIsGenerating(true)
    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })
      navigate(`/interview/${data._id}`)
    } catch (error) {
      const responseMessage = typeof error.response?.data === "string"
        ? ""
        : error.response?.data?.message
      setErrorMessage(responseMessage || "Unable to generate your interview plan. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  if (isGenerating) {
    return (
      <main className='flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f3efe7] px-6'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='h-10 w-10 animate-spin rounded-full border-4 border-[#dce2d7] border-t-[#49624d]' />
          <h1 className='text-lg font-medium text-[#343a33]'>Putting your interview plan together...</h1>
          <p className='text-sm text-[#77776f]'>This can take a minute. You can stay right here.</p>
        </div>
      </main>
    )
  }

  return (
    <div className='min-h-[calc(100vh-68px)] bg-[#f3efe7] px-5 py-10 text-[#292d29] sm:px-8 sm:py-14'>

      {/* Page Header */}
      <header className='mx-auto mb-10 max-w-5xl text-center md:mb-12'>
        <span className='inline-flex items-center gap-2 rounded-full border border-[#dce2d7] bg-[#edf1e9] px-3 py-1 text-xs font-semibold tracking-wide text-[#53694e]'>
          <span className='h-1.5 w-1.5 rounded-full bg-[#60745e]' />
          YOUR NEXT CHAPTER STARTS HERE
        </span>
        <h1 className='mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl'>
          Get ready for your <span className='text-[#a45137]'>next interview.</span>
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-[#686a62] md:text-lg'>
          A thoughtful plan starts with the role and your experience. Share a little context and we’ll help you prepare for the conversation.
        </p>
      </header>

      {/* Main Card */}
      <div className='mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] shadow-[0_18px_52px_rgba(54,47,37,0.08)]'>
        <div className='grid grid-cols-1 divide-y divide-[#e7e1d7] md:grid-cols-2 md:divide-x md:divide-y-0'>

          {/* Left Panel - Job Description */}
          <div className='p-6 sm:p-8'>
            <div className='mb-4 flex items-center gap-2'>
              <span className='text-[#a45137]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              </span>
              <h2 className='flex-1 text-lg font-semibold'>Target job description</h2>
              <span className='rounded-full border border-[#d9c9b9] bg-[#f2e9df] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#8f4d36]'>Required</span>
            </div>
            <textarea
              onChange={(e) => { setJobDescription(e.target.value) }}
              className='h-72 w-full resize-y rounded-xl border border-[#d8d2c7] bg-white p-4 text-sm leading-6 text-[#292d29] placeholder:text-[#99958d] transition focus:border-[#60745e] focus:outline-none focus:ring-4 focus:ring-[#60745e]/10 md:h-96'
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className='mt-2 text-right text-xs text-[#8b887f]'>{jobDescription.length} / 5000 characters</div>
          </div>

          {/* Right Panel - Profile */}
          <div className='p-6 sm:p-8'>
            <div className='mb-5 flex items-center gap-2'>
              <span className='text-[#60745e]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </span>
              <h2 className='text-lg font-semibold'>A little about you</h2>
            </div>

            {/* Upload Resume */}
            <div>
              <label className='mb-2 flex items-center justify-between text-sm font-medium text-[#343a33]' htmlFor='resume'>
                Upload Resume
                <span className='rounded border border-[#d7dfd2] bg-[#edf1e9] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#53694e]'>Best Results</span>
              </label>
              <label className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#cfc9bd] bg-white p-8 transition hover:border-[#778a70] hover:bg-[#fdfcf8]'>
                <span className='text-[#60745e]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                </span>
                <p className='text-sm font-medium text-[#343a33]'>{resumeFileName || "Choose a PDF resume"}</p>
                <p className='text-xs text-[#8b887f]'>PDF only (Max 3 MB)</p>
                <input
                  ref={resumeInputRef}
                  hidden
                  type='file'
                  id='resume'
                  name='resume'
                  accept='.pdf,application/pdf'
                  onChange={(e) => {
                    const file = e.target.files[0]
                    setResumeFileName(file?.name || "")
                    setErrorMessage("")
                  }}
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className='flex items-center gap-3 my-6'>
              <div className='h-px flex-1 bg-[#e2dcd2]' />
              <span className='text-xs font-medium text-[#8b887f]'>OR</span>
              <div className='h-px flex-1 bg-[#e2dcd2]' />
            </div>

            {/* Quick Self-Description */}
            <div>
              <label className='mb-2 block text-sm font-medium text-[#343a33]' htmlFor='selfDescription'>A little about you</label>
              <textarea
                onChange={(e) => { setSelfDescription(e.target.value) }}
                id='selfDescription'
                name='selfDescription'
                className='h-28 w-full resize-y rounded-xl border border-[#d8d2c7] bg-white p-4 text-sm leading-6 text-[#292d29] placeholder:text-[#99958d] transition focus:border-[#60745e] focus:outline-none focus:ring-4 focus:ring-[#60745e]/10'
                placeholder="A short overview of your experience and strengths, if you aren't uploading a resume."
              />
            </div>

            {/* Info Box */}
            <div className='mt-4 flex items-start gap-2 rounded-md border border-[#dce2d7] bg-[#f1f3ed] p-3'>
              <span className='mt-0.5 shrink-0 text-[#60745e]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
              </span>
              <p className='text-sm leading-5 text-[#596454]'>Add a resume or a short self-description so the questions can reflect your experience.</p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className='flex flex-col items-center justify-between gap-4 border-t border-[#e7e1d7] bg-[#fdfcf8] px-6 py-5 sm:flex-row sm:px-8'>
          <span className='text-sm text-[#77776f]'>A few moments to prepare. Useful ideas to take with you.</span>
          <button
            onClick={handleGenerateReport}
            className='flex items-center gap-2 rounded-xl bg-[#49624d] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#3b5140] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49624d] disabled:cursor-wait disabled:opacity-70'
            disabled={loading || isGenerating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
            {isGenerating ? "Preparing your plan..." : "Build my interview plan"}
          </button>
        </div>
        {errorMessage && (
          <p role='alert' className='border-t border-[#e8d0ca] bg-[#f8eeeb] px-6 py-3 text-sm text-[#934b3a] sm:px-8'>
            {errorMessage}
          </p>
        )}
      </div>

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className='mx-auto mt-14 max-w-5xl'>
          <div className='mb-5 flex items-end justify-between gap-4'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#85857b]'>Saved work</p>
              <h2 className='mt-1 text-xl font-semibold text-[#343a33]'>Your recent plans</h2>
            </div>
            <span className='text-sm text-[#85857b]'>{reports.length} {reports.length === 1 ? 'plan' : 'plans'}</span>
          </div>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {reports.map(report => (
              <li
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className='cursor-pointer rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] p-5 transition hover:-translate-y-0.5 hover:border-[#b8c5b1] hover:bg-white hover:shadow-md'
              >
                <h3 className='font-semibold text-[#343a33]'>{report.title || 'Interview plan'}</h3>
                <p className='mt-1 text-xs text-[#8b887f]'>Created {new Date(report.createdAt).toLocaleDateString()}</p>
                <p className={`mt-3 text-sm font-medium ${report.matchScore >= 80 ? 'text-[#49624d]' : report.matchScore >= 60 ? 'text-[#9a6b27]' : 'text-[#a45137]'}`}>
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Page Footer */}
      <footer className='mx-auto mt-14 max-w-5xl border-t border-[#ded8cd] pt-5 text-center text-xs text-[#8b887f]'>
        Made for more confident conversations.
      </footer>
    </div>
  )
}

export default Home