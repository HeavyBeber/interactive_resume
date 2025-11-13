export const state = {
  name: 'Alexandre Bernard',
  photo: 'assets/moi.png',
  balance: 0,
}

export const data = {
  options: [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  experience: [
    {
      role: 'Backend Developer',
      company: 'Apside',
      logo: 'assets/logo_apside.svg',
      range: '2017 — 2022',
      bullets: [
        'Built and maintained the telephony service and IVR flows handling high call volumes',
        'Refactored and restructured a legacy application into modular components for easier maintenance',
        'Introduced monitoring and tooling that reduced incident mean-time-to-repair',
        'Mentored an intern: code reviews, onboarding and hands-on guidance'
      ]
    },
    {
      role: 'Software Developer',
      company: 'Tactill',
      logo: 'assets/logo_tactill.svg',
      range: '2022 — 2024',
      bullets: [
        'Solely owned and implemented new features end-to-end for the product',
        'Integrated external APIs and improved reliability and error handling across the app',
        'Added automated tests and streamlined CI to speed up safe releases',
        'Collaborated closely with UX and stakeholders to refine requirements and ship on schedule'
      ]
    },
    {
      role: 'Product Owner',
      company: 'Alten',
      logo: 'assets/logo_alten.svg',
      range: '2024 — Present',
      bullets: [
        'Defined and prioritized the roadmap and translated user requests into deliverable work',
        'Tracked KPIs and iterated on features using metrics-driven improvements',
        'Coordinated cross-functional teams to deliver user-requested features on time',
        'Managed backlog, ran demos, and collected stakeholder feedback to refine scope'
      ]
    }
  ],
  projects: [],
  education: [
    { degree: 'Prépa MP', school: 'Lycée Marcelin Berthelot, St Maur des Fossées', year: '2010 — 2013' },
    { degree: 'Software Engineering', school: 'ENSEEIHT, Toulouse', year: '2013 — 2017' },
    { degree: 'Scrum Product Owner (cert)', school: 'Certification', year: '2019' },
    { degree: 'SAFe Scrum Master (cert)', school: 'Certification', year: '2020' }
  ],
  skills: [
    'Product Strategy',
    'Stakeholder Mgmt',
    'Prioritization',
    'KPI Tracking',
    'Agile Coaching',
    'User Research',
    'Data-Driven',
    'Communication',
    'Release Planning',
    'Backlog Mgmt'
  ],
  contact: {
    email: 'alexandre.bernard94@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alexandre-bernard-89561ab7',
    phone: '(+33)6 75 59 51 20'
  },
  shop: [
    { id: 'click_booster', name: 'Click Booster', cost: 10, desc: 'Permanently increases $ per click', repeatable: true },
    { id: 'auto_clicker', name: 'Auto Clicker', cost: 100, desc: 'Performs 1 click every second.', repeatable: true }
  ],
  achievements: [
    { id: 'first_earned', title: 'First $ earned', desc: 'Wanna get rich ?', condition: 'Earn any $', unlocks: ['balance'], unlocked: false },
    { id: 'idle_or_resume', title: 'Is this a resume or an idle game ?!', desc: 'Unlock the shop', condition: 'Reach 10 $', unlocks: ['shop'], unlocked: false },
    { id: 'buy_5_boosters', title: "Hmmmm, I've got you attention now !", desc: 'Unlock achievements', condition: 'Buy 5 Click Boosters', unlocks: ['achievements'], unlocked: false },
    { id: 'rate_50', title: 'You are so skilled !', desc: 'Here, find my skills !', condition: 'Reach 50 $/s', unlocks: ['skills'], unlocked: false }
  ]
}
