import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
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
    <article className='overflow-hidden rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] shadow-[0_8px_24px_rgba(54,47,37,0.04)]'>
      <button
        type='button'
        aria-expanded={open}
        className='flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#f5f2eb] sm:p-5'
        onClick={() => setOpen(o => !o)}
      >
        <span className='shrink-0 rounded-lg border border-[#d9c9b9] bg-[#f2e9df] px-2.5 py-1 text-xs font-semibold text-[#8f4d36]'>Q{index + 1}</span>
        <span className='flex-1 text-sm font-medium leading-6 text-[#343a33]'>{item.question}</span>
        <span className={`shrink-0 text-[#85857b] transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </button>
      {open && (
        <div className='flex flex-col gap-4 border-t border-[#e7e1d7] bg-[#fdfcf8] px-5 pb-5 pt-4'>
          <div>
            <span className='mb-1.5 inline-block rounded-full border border-[#dce2d7] bg-[#edf1e9] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#53694e]'>What they’re looking for</span>
            <p className='text-sm leading-6 text-[#686a62]'>{item.intention}</p>
          </div>
          <div>
            <span className='mb-1.5 inline-block rounded-full border border-[#d9c9b9] bg-[#f2e9df] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8f4d36]'>A way to approach it</span>
            <p className='text-sm leading-6 text-[#686a62]'>{item.answer}</p>
          </div>
        </div>
      )}
    </article>
  )
}

const RoadMapDay = ({ day }) => (
  <article className='rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] p-5 shadow-[0_8px_24px_rgba(54,47,37,0.04)]'>
    <div className='mb-3 flex items-center gap-3'>
      <span className='rounded-lg border border-[#dce2d7] bg-[#edf1e9] px-2.5 py-1 text-xs font-semibold text-[#53694e]'>Day {day.day}</span>
      <h3 className='font-semibold text-[#343a33]'>{day.focus}</h3>
    </div>
    <ul className='flex flex-col gap-2'>
      {day.tasks.map((task, i) => (
        <li key={i} className='flex items-start gap-2 text-sm leading-6 text-[#686a62]'>
          <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a45137]' />
          {task}
        </li>
      ))}
    </ul>
  </article>
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



  if (loading) {
    return (
      <main className='flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f3efe7] px-6'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='h-10 w-10 animate-spin rounded-full border-4 border-[#dce2d7] border-t-[#49624d]' />
          <h1 className='text-lg font-medium text-[#343a33]'>Loading your interview plan...</h1>
        </div>
      </main>
    )
  }

  if (!report) {
    return (
      <main className='flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#f3efe7] px-6'>
        <section className='max-w-md rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] p-8 text-center shadow-[0_12px_36px_rgba(54,47,37,0.06)]'>
          <span className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e9df] text-lg font-semibold text-[#8f4d36]'>!</span>
          <h1 className='mt-4 text-xl font-semibold text-[#343a33]'>We couldn’t find this interview plan.</h1>
          <p className='mt-2 text-sm leading-6 text-[#686a62]'>It may have been removed, or the link may no longer be available.</p>
          <Link to='/' className='mt-6 inline-flex rounded-xl bg-[#49624d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b5140]'>Back to your plans</Link>
        </section>
      </main>
    )
  }

  const scoreColor =
    report.matchScore >= 80 ? 'text-[#49624d] border-[#9eaf97]' :
      report.matchScore >= 60 ? 'text-[#9a6b27] border-[#d6bb84]' : 'text-[#a45137] border-[#d9a69a]'


  return (
    <div className='min-h-[calc(100vh-68px)] bg-[#f3efe7] px-5 py-8 text-[#292d29] sm:px-8 sm:py-10'>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-8'>
          <span className='text-xs font-semibold uppercase tracking-[0.16em] text-[#85857b]'>Your preparation space</span>
          <h1 className='mt-2 text-3xl font-semibold tracking-tight text-[#292d29] sm:text-4xl'>Your interview plan</h1>
          <p className='mt-2 max-w-2xl text-sm leading-6 text-[#686a62]'>Take what’s useful, make each answer your own, and use the roadmap at a pace that feels right.</p>
        </header>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)_280px]'>

        {/* ── Left Nav ── */}
        <nav className='flex flex-col justify-between gap-4'>
          <div className="flex flex-wrap gap-1.5 lg:flex-col">
            <p className='hidden text-xs font-semibold uppercase tracking-wide text-[#85857b] lg:mb-2 lg:block'>Your plan</p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${activeNav === item.id
                  ? 'border-[#c9d3c3] bg-[#edf1e9] text-[#49624d]'
                  : 'border-transparent text-[#686a62] hover:border-[#ded8cd] hover:bg-[#fbfaf6]'
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
            className='flex h-fit items-center justify-center rounded-xl bg-[#49624d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3b5140] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49624d]' >
            <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
            Download Resume
          </button>
        </nav>

        {/* ── Center Content ── */}
        <main>
          {activeNav === 'technical' && (
            <section>
              <div className='mb-5 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#85857b]'>Practice prompts</p>
                  <h2 className='mt-1 text-xl font-semibold text-[#343a33]'>Technical questions</h2>
                </div>
                <span className='rounded-full border border-[#ded8cd] bg-[#fbfaf6] px-3 py-1 text-xs font-medium text-[#686a62]'>{report.technicalQuestions.length} questions</span>
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
              <div className='mb-5 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#85857b]'>Practice prompts</p>
                  <h2 className='mt-1 text-xl font-semibold text-[#343a33]'>Behavioral questions</h2>
                </div>
                <span className='rounded-full border border-[#ded8cd] bg-[#fbfaf6] px-3 py-1 text-xs font-medium text-[#686a62]'>{report.behavioralQuestions.length} questions</span>
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
              <div className='mb-5 flex items-end justify-between gap-4'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[#85857b]'>One step at a time</p>
                  <h2 className='mt-1 text-xl font-semibold text-[#343a33]'>Preparation roadmap</h2>
                </div>
                <span className='rounded-full border border-[#ded8cd] bg-[#fbfaf6] px-3 py-1 text-xs font-medium text-[#686a62]'>{report.preparationPlan.length}-day plan</span>
              </div>
              <div className='flex flex-col gap-3'>
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── Right Sidebar ── */}
        <aside className='flex flex-col gap-4'>

          {/* Match Score */}
          <div className='rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] p-6 text-center shadow-[0_8px_24px_rgba(54,47,37,0.04)]'>
            <p className='mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#85857b]'>Role alignment</p>
            <div className={`mx-auto inline-flex h-24 w-24 items-baseline justify-center rounded-full border-4 ${scoreColor}`}>
              <span className='text-2xl font-bold'>{report.matchScore}</span>
              <span className='text-sm font-medium'>%</span>
            </div>
            <p className='mt-4 text-xs leading-5 text-[#77776f]'>A useful starting point for tailoring your preparation.</p>
          </div>

          {/* Skill Gaps */}
          <div className='rounded-2xl border border-[#ded8cd] bg-[#fbfaf6] p-6 shadow-[0_8px_24px_rgba(54,47,37,0.04)]'>
            <p className='mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#85857b]'>Areas to explore</p>
            <div className='flex flex-wrap gap-2'>
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${gap.severity === 'high' ? 'border-[#e8d0ca] bg-[#f8eeeb] text-[#934b3a]' :
                    gap.severity === 'medium' ? 'border-[#e8dfc9] bg-[#f7f1e4] text-[#8a682e]' :
                      'border-[#ded8cd] bg-[#f5f2eb] text-[#686a62]'
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
    </div>
  )
}

export default Interview