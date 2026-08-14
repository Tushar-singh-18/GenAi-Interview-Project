import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useInterview } from '../../hooks/useInterview'


const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
  { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
  { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='rounded-lg border border-white/10 bg-[#12121a] overflow-hidden'>
      <div
        className='flex items-center gap-3 p-4 cursor-pointer hover:bg-white/2 transition'
        onClick={() => setOpen(o => !o)}
      >
        <span className='shrink-0 text-xs font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/30 rounded px-2 py-1'>Q{index + 1}</span>
        <p className='flex-1 text-sm font-medium text-slate-100'>{item.question}</p>
        <span className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </div>
      {open && (
        <div className='px-4 pb-4 flex flex-col gap-3 border-t border-white/10 pt-4'>
          <div>
            <span className='inline-block text-[10px] font-semibold tracking-wide text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded px-2 py-0.5 mb-1.5'>Intention</span>
            <p className='text-sm text-slate-300 leading-relaxed'>{item.intention}</p>
          </div>
          <div>
            <span className='inline-block text-[10px] font-semibold tracking-wide text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-0.5 mb-1.5'>Model Answer</span>
            <p className='text-sm text-slate-300 leading-relaxed'>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => (
  <div className='rounded-lg border border-white/10 bg-[#12121a] p-5'>
    <div className='flex items-center gap-3 mb-3'>
      <span className='text-xs font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/30 rounded px-2 py-1'>Day {day.day}</span>
      <h3 className='font-semibold text-slate-100'>{day.focus}</h3>
    </div>
    <ul className='flex flex-col gap-2'>
      {day.tasks.map((task, i) => (
        <li key={i} className='flex items-start gap-2 text-sm text-slate-300'>
          <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0' />
          {task}
        </li>
      ))}
    </ul>
  </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])



  if (loading || !report) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-[#0a0a0f]'>
        <h1 className='text-slate-200 text-xl font-medium'>Loading your interview plan...</h1>
      </main>
    )
  }

  const scoreColor =
    report.matchScore >= 80 ? 'text-emerald-400 border-emerald-500/40' :
      report.matchScore >= 60 ? 'text-yellow-400 border-yellow-500/40' : 'text-red-400 border-red-500/40'


  return (
    <div className='min-h-screen bg-[#0a0a0f] text-slate-100'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1px_1fr_1px_280px] gap-6 px-6 py-10'>

        {/* ── Left Nav ── */}
        <nav className='flex lg:flex-col justify-between gap-4'>
          <div className="flex lg:flex-col gap-1">
            <p className='hidden lg:block text-xs font-semibold tracking-wide text-slate-500 uppercase mb-2'>Sections</p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 transition ${activeNav === item.id
                  ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                onClick={() => setActiveNav(item.id)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { getResumePdf(interviewId) }}
            className='flex items-center justify-center rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold px-4 py-2.5 transition h-fit' >
            <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
            Download Resume
          </button>
        </nav>

        <div className='hidden lg:block w-px bg-white/10' />

        {/* ── Center Content ── */}
        <main>
          {activeNav === 'technical' && (
            <section>
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-xl font-semibold'>Technical Questions</h2>
                <span className='text-xs text-slate-500'>{report.technicalQuestions.length} questions</span>
              </div>
              <div className='flex flex-col gap-3'>
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'behavioral' && (
            <section>
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-xl font-semibold'>Behavioral Questions</h2>
                <span className='text-xs text-slate-500'>{report.behavioralQuestions.length} questions</span>
              </div>
              <div className='flex flex-col gap-3'>
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === 'roadmap' && (
            <section>
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-xl font-semibold'>Preparation Road Map</h2>
                <span className='text-xs text-slate-500'>{report.preparationPlan.length}-day plan</span>
              </div>
              <div className='flex flex-col gap-3'>
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        <div className='hidden lg:block w-px bg-white/10' />

        {/* ── Right Sidebar ── */}
        <aside className='flex flex-col gap-6'>

          {/* Match Score */}
          <div className='rounded-xl border border-white/10 bg-[#12121a] p-6 text-center'>
            <p className='text-xs font-semibold tracking-wide text-slate-500 uppercase mb-4'>Match Score</p>
            <div className={`inline-flex items-baseline justify-center w-24 h-24 rounded-full border-4 mx-auto ${scoreColor}`}>
              <span className='text-2xl font-bold'>{report.matchScore}</span>
              <span className='text-sm font-medium'>%</span>
            </div>
            <p className='text-xs text-slate-500 mt-4'>Strong match for this role</p>
          </div>

          {/* Skill Gaps */}
          <div className='rounded-xl border border-white/10 bg-[#12121a] p-6'>
            <p className='text-xs font-semibold tracking-wide text-slate-500 uppercase mb-3'>Skill Gaps</p>
            <div className='flex flex-wrap gap-2'>
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium rounded px-2.5 py-1 border ${gap.severity === 'high' ? 'text-red-300 bg-red-500/10 border-red-500/30' :
                    gap.severity === 'medium' ? 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30' :
                      'text-slate-300 bg-white/5 border-white/10'
                    }`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}

export default Interview