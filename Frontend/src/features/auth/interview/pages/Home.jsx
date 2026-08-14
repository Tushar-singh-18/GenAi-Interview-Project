import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useInterview } from '../../hooks/useInterview'

const Home = () => {

  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFileName, setResumeFileName] = useState("")
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data._id}`)
  }

  if (loading) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-[#0a0a0f]'>
        <h1 className='text-slate-200 text-xl font-medium'>Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <div className='min-h-screen bg-[#0a0a0f] text-slate-100 px-6 py-12'>

      {/* Page Header */}
      <header className='text-center max-w-2xl mx-auto mb-10'>
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
          Create Your Custom <span className='text-pink-500'>Interview Plan</span>
        </h1>
        <p className='mt-4 text-slate-400 text-base md:text-lg'>
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </header>

      {/* Main Card */}
      <div className='max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#12121a] overflow-hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10'>

          {/* Left Panel - Job Description */}
          <div className='p-8'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='text-pink-500'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              </span>
              <h2 className='font-semibold text-lg flex-1'>Target Job Description</h2>
              <span className='text-xs font-semibold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 rounded px-2 py-1'>Required</span>
            </div>
            <textarea
              onChange={(e) => { setJobDescription(e.target.value) }}
              className='w-full h-72 md:h-96 resize-none rounded-lg bg-[#0f0f16] border border-white/10 p-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition'
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className='text-right text-xs text-slate-500 mt-2'>0 / 5000 chars</div>
          </div>

          {/* Right Panel - Profile */}
          <div className='p-8'>
            <div className='flex items-center gap-2 mb-5'>
              <span className='text-pink-500'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </span>
              <h2 className='font-semibold text-lg'>Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div>
              <label className='flex items-center justify-between mb-2 text-sm font-medium text-slate-200'>
                Upload Resume
                <span className='text-[10px] font-semibold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 rounded px-2 py-0.5'>Best Results</span>
              </label>
              <label className='flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/15 bg-[#0f0f16] hover:border-white/25 p-8 cursor-pointer transition' htmlFor='resume'>
                <span className='text-pink-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                </span>
                <p className='text-sm font-medium text-slate-100'>{resumeFileName || "Click to upload or drag & drop"}</p>
                <p className='text-xs text-slate-500'>PDF or DOCX (Max 5MB)</p>
                <input
                  ref={resumeInputRef}
                  hidden
                  type='file'
                  id='resume'
                  name='resume'
                  accept='.pdf,.docx'
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) setResumeFileName(file.name)
                  }}
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className='flex items-center gap-3 my-6'>
              <div className='h-px flex-1 bg-white/10' />
              <span className='text-xs text-slate-500 font-medium'>OR</span>
              <div className='h-px flex-1 bg-white/10' />
            </div>

            {/* Quick Self-Description */}
            <div>
              <label className='text-sm font-medium text-slate-200 mb-2 block' htmlFor='selfDescription'>Quick Self-Description</label>
              <textarea
                onChange={(e) => { setSelfDescription(e.target.value) }}
                id='selfDescription'
                name='selfDescription'
                className='w-full h-28 resize-none rounded-lg bg-[#0f0f16] border border-pink-500/40 p-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition'
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* Info Box */}
            <div className='flex items-start gap-2 mt-4 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3'>
              <span className='text-blue-400 mt-0.5 shrink-0'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
              </span>
              <p className='text-sm text-blue-200'>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 px-8 py-5'>
          <span className='text-sm text-slate-500'>AI-Powered Strategy Generation &bull; Approx 30s</span>
          <button
            onClick={handleGenerateReport}
            className='flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold px-6 py-3 transition'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className='max-w-5xl mx-auto mt-12'>
          <h2 className='text-xl font-semibold mb-4'>My Recent Interview Plans</h2>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {reports.map(report => (
              <li
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className='rounded-xl border border-white/10 bg-[#12121a] p-5 cursor-pointer hover:border-white/25 transition'
              >
                <h3 className='font-semibold text-slate-100'>{report.title || 'Untitled Position'}</h3>
                <p className='text-xs text-slate-500 mt-1'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                <p className={`text-sm font-medium mt-3 ${report.matchScore >= 80 ? 'text-emerald-400' : report.matchScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Page Footer */}
      <footer className='max-w-5xl mx-auto flex items-center justify-center gap-6 mt-16 text-sm text-slate-500'>
        <a href='#' className='hover:text-slate-300 transition'>Privacy Policy</a>
        <a href='#' className='hover:text-slate-300 transition'>Terms of Service</a>
        <a href='#' className='hover:text-slate-300 transition'>Help Center</a>
      </footer>
    </div>
  )
}

export default Home