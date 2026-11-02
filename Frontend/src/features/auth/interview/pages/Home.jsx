import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useInterview } from '../../hooks/useInterview'

const Home = () => {

  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFileName, setResumeFileName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
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
    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })
      navigate(`/interview/${data._id}`)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || "Unable to generate your interview plan. Please try again.")
    }
  }

  if (loading) {
    return (
      <main className='-m-6 flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f3efe7]'>
        <h1 className='text-xl font-medium text-[#343a33]'>Putting your interview plan together...</h1>
      </main>
    )
  }

  return (
    <div className='-m-6 min-h-[calc(100vh-68px)] bg-[#f3efe7] px-6 py-12 text-[#292d29]'>

      {/* Page Header */}
      <header className='text-center max-w-2xl mx-auto mb-10'>
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
          Get ready for your <span className='text-[#a45137]'>next interview</span>
        </h1>
        <p className='mt-4 text-[#686a62] text-base md:text-lg'>
          Share the role and a little about your experience. We’ll help you prepare for the conversation.
        </p>
      </header>

      {/* Main Card */}
      <div className='max-w-5xl mx-auto overflow-hidden rounded-xl border border-[#ded8cd] bg-[#fbfaf6] shadow-[0_12px_36px_rgba(54,47,37,0.06)]'>
        <div className='grid grid-cols-1 divide-y divide-[#e7e1d7] md:grid-cols-2 md:divide-x md:divide-y-0'>

          {/* Left Panel - Job Description */}
          <div className='p-8'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='text-[#a45137]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              </span>
              <h2 className='font-semibold text-lg flex-1'>Target Job Description</h2>
              <span className='rounded border border-[#d9c9b9] bg-[#f2e9df] px-2 py-1 text-xs font-semibold tracking-wide text-[#8f4d36]'>Required</span>
            </div>
            <textarea
              onChange={(e) => { setJobDescription(e.target.value) }}
              className='h-72 w-full resize-none rounded-md border border-[#d8d2c7] bg-white p-4 text-sm text-[#292d29] placeholder:text-[#99958d] transition focus:border-[#60745e] focus:outline-none focus:ring-2 focus:ring-[#60745e]/20 md:h-96'
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className='mt-2 text-right text-xs text-[#8b887f]'>{jobDescription.length} / 5000 characters</div>
          </div>

          {/* Right Panel - Profile */}
          <div className='p-8'>
            <div className='flex items-center gap-2 mb-5'>
              <span className='text-[#60745e]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </span>
              <h2 className='font-semibold text-lg'>Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div>
              <label className='mb-2 flex items-center justify-between text-sm font-medium text-[#343a33]'>
                Upload Resume
                <span className='rounded border border-[#d7dfd2] bg-[#edf1e9] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#53694e]'>Best Results</span>
              </label>
              <label className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#cfc9bd] bg-white p-8 transition hover:border-[#778a70] hover:bg-[#fdfcf8]' htmlFor='resume'>
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
                className='h-28 w-full resize-none rounded-md border border-[#d8d2c7] bg-white p-4 text-sm text-[#292d29] placeholder:text-[#99958d] transition focus:border-[#60745e] focus:outline-none focus:ring-2 focus:ring-[#60745e]/20'
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
        <div className='flex flex-col items-center justify-between gap-4 border-t border-[#e7e1d7] px-8 py-5 sm:flex-row'>
          <span className='text-sm text-[#77776f]'>A few moments to prepare. Useful ideas to take with you.</span>
          <button
            onClick={handleGenerateReport}
            className='flex items-center gap-2 rounded-md bg-[#49624d] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#3b5140] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49624d] disabled:cursor-wait disabled:opacity-70'
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
            {loading ? "Preparing your plan..." : "Build my interview plan"}
          </button>
        </div>
        {errorMessage && (
          <p role='alert' className='border-t border-[#e8d0ca] bg-[#f8eeeb] px-8 py-3 text-sm text-[#934b3a]'>
            {errorMessage}
          </p>
        )}
      </div>

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className='max-w-5xl mx-auto mt-12'>
          <h2 className='mb-4 text-xl font-semibold text-[#343a33]'>Your recent interview plans</h2>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {reports.map(report => (
              <li
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className='cursor-pointer rounded-lg border border-[#ded8cd] bg-[#fbfaf6] p-5 transition hover:border-[#b8c5b1] hover:bg-white'
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
      <footer className='mx-auto mt-16 flex max-w-5xl items-center justify-center gap-6 text-sm text-[#8b887f]'>
        <a href='#' className='transition hover:text-[#343a33]'>Privacy Policy</a>
        <a href='#' className='transition hover:text-[#343a33]'>Terms of Service</a>
        <a href='#' className='transition hover:text-[#343a33]'>Help Center</a>
      </footer>
    </div>
  )
}

export default Home