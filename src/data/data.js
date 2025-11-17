export const state = {
  name: 'Alexandre Bernard',
  photo: 'assets/moi.png',
  balance: 0,
  clickPower: 1
}

export const data = {
  options: [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  experience: [
    {
      role: 'Product Owner',
      company: 'Alten',
      logo: 'assets/logo_alten.png',
      range: '2024 — Present',
      bullets: [
        'Defined and communicated a clear product vision, translating complex user needs into well-scoped, actionable features aligned with strategic goals.',
        'Prioritized the roadmap and backlog to maximize user value, ensuring smooth execution across multiple teams.',
        'Drove data-informed improvements by analyzing product usage and turning insights into meaningful iterations.',
        'Coordinated design, engineering, and QA to accelerate delivery and maintain high-quality standards.',
        'Facilitated workshops and alignment sessions, uncovering hidden pain points and strengthening stakeholder engagement.'
      ]
    },
    {
      role: 'Software Developer',
      company: 'Tactill',
      logo: 'assets/logo_tactill.jpg',
      range: '2022 — 2024',
      bullets: [
        'Led the end-to-end development of new features, ensuring scalable, maintainable, and reliable code.',
        'Integrated external APIs and enhanced system resilience with robust error-handling and monitoring practices.',
        'Improved development workflows by enhancing automated testing and optimizing CI/CD pipelines.',
        'Partnered closely with UX and product teams to transform ambiguous requirements into practical technical solutions.',
        'Elevated team capabilities through code reviews, documentation, and knowledge-sharing initiatives.'
      ]
    },
    {
      role: 'Backend Developer',
      company: 'Apside',
      logo: 'assets/logo_apside.jpeg',
      range: '2017 — 2022',
      bullets: [
        'Designed, developed, and maintained backend services and telephony systems supporting high-volume operations.',
        'Modernized a legacy application through structured refactoring, improving maintainability and long-term scalability.',
        'Mentored interns and junior developers, offering hands-on guidance, onboarding support, and structured reviews.',
        'Collaborated with product and cross-functional teams to design backend architectures aligned with business needs.',
        'Implemented database and system optimizations that supported faster development and more reliable service delivery.'
      ]
    }
  ],
  projects: [],
  education: [
    { degree: 'SAFe Scrum Master', school: 'Certification', year: '2020' },
    { degree: 'Scrum Product Owner', school: 'Certification', year: '2019' },
    { degree: 'Software Engineering', school: 'ENSEEIHT, Toulouse', year: '2013 — 2017' },
    { degree: 'Prépa MP', school: 'Lycée Marcelin Berthelot, St Maur des Fossées', year: '2010 — 2013' }
  ],
  skills: {
    'Product': [
      'Roadmapping',
    'Prioritization',
      'Discovery',
    ],
    'Data ': [
      'KPI Analysis',
      'Experimentation',
      'Insight Extraction'
    ],
    'Technical': [
      'System Design',
      'CI/CD',
      'Automated Testing',
      'SQL',
      'Git',
      'Postman'
    ],
    'Core Strengths': [
    'Communication',
      'Critical Thinking',
      'Leadership',
      'Collaboration',
      'Adaptability'
    ]
  },
  contact: {
    email: 'alexandre.bernard94@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alexandre-bernard-89561ab7',
    phone: '(+33)6 75 59 51 20'
  },
  about: {
    headline: 'About Me',
    body: `I build reliable, user-focused products by blending technical depth with product thinking. I enjoy turning ambiguous problems into measurable outcomes, coordinating cross-functional teams, and shipping software that moves the needle. I'm particularly interested in data-driven product improvements and scalable backend systems.`
  },
  /* Profiles allow per-job/company overrides. Each profile can override `about`, `skills`, `projects`, etc. */
  profiles: {
    default: {
      id: 'default',
      name: 'Default',
      "about": {
        "headline": "About — Backend Engineer (Acme)",
        "body": "I design and build resilient backend systems that scale gracefully under load. My work focuses on clear APIs, observability, and efficient data pipelines so teams can iterate quickly without sacrificing reliability.\n\nAt Acme I would prioritize pragmatic system design: well-defined interfaces, service contracts, and performance budgets. I instrument systems early and use metrics-driven triage to reduce latency and error rates while making mean-time-to-recovery measurable.\n\nI bring experience in designing ingestion and processing pipelines that turn noisy input into dependable signals for product decisions. This includes schema design, streaming and batch workflows, and cost-conscious storage patterns.\n\nI collaborate closely with product and SRE teams to align operational goals with feature development. That means automated testing, deployment safety (canaries/feature flags), and clear runbooks so services remain predictable in production.\n\nFinally, I mentor engineers to write maintainable, observable code and to prioritize technical debt reduction. My goal is to deliver measurable improvements in reliability, latency, and development velocity."
      }
    },
    alan: {
      "id": "alan",
      "name": "alan",
      "about": {
        "headline": "Me and Alan",
        "body": "I’m a Product Owner with two years of experience bringing ideas to life, shaping products through user insights, and collaborating across teams to solve real problems. But beyond my job title, I’m also a dad of two — and that’s a big part of why I care so much about the work I do and the companies I choose to join.\n\nBeing a father changed the way I think about health, time, and simplicity. When you’re caring for two little humans, you quickly realise how precious every minute is — and how important it is to have systems and services that genuinely help you navigate life, instead of adding more stress. That’s why Alan’s mission speaks to me so strongly.\n\nI actually used Alan for a full year, and it wasn’t just “good insurance.” It felt like someone had finally designed healthcare the way it should be — clear, caring, and built around real people’s needs. That personal experience made me understand, in a very tangible way, how powerful member-centric design can be. It also made me genuinely excited about the idea of helping build the next chapter of that experience for other families, freelancers, and small businesses.\n\nProfessionally, I’m naturally curious, analytical, and obsessed with understanding users. I’m comfortable diving into data, refining priorities, and bringing teams around a shared outcome. But what really drives me is making things that improve people’s daily lives — especially when it comes to health and wellbeing.\n\nAs a parent, as a user, and as someone who loves building simple, thoughtful solutions, I feel a strong alignment with Alan’s culture and values. I’m excited by the Segment Owner role because it blends strategy, empathy, creativity, and ownership — everything that motivates me and brings out the best in my work."
      }
    }
  },
  shop: [
    { id: 'click_booster', name: 'Click Booster', cost: 10, desc: 'Permanently increases $ per click', repeatable: true },
    { id: 'auto_clicker', name: 'Auto Clicker', cost: 50, desc: 'Performs 1 click every second.', repeatable: true },
    { id: 'video_demo', name: 'Add break', cost: 1000, desc: 'Watch my demo reel', repeatable: false, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', awardAchievement: 'dont_give_up_on_me' }
  ],
  achievements: [
    { id: 'first_earned', title: 'First $ earned', desc: 'Wanna get rich ?', condition: 'Earn any $', unlocks: ['balance'], unlocked: false },
    { id: 'idle_or_resume', title: 'Is this a resume or an idle game ?!', desc: 'Unlock the shop', condition: 'Reach 5 $', unlocks: ['shop'], unlocked: false },
    { id: 'buy_5_boosters', title: "Hmmmm, I've got you attention now !", desc: 'Unlock achievements', condition: 'Buy 5 Click Boosters', unlocks: ['achievements'], unlocked: false },
    { id: 'rate_50', title: 'You are so skilled !', desc: 'Here, find my skills !', condition: 'Reach 50 $/s', unlocks: ['skills'], unlocked: false },
    { id: 'full_auto_mode', title: 'Full auto mode', desc: 'More shop items', condition: 'Buy 5 Auto Clickers', unlocks: [], unlocked: false },
    { id: 'dont_give_up_on_me', title: "Don't give up on me", desc: 'Get rick rolled', condition: '???', unlocks: [], unlocked: false }
    ,{ id: 'click_face_10', title: "Yes, That's me", desc: 'Buy accessories', condition: 'Click the photo 10 times', unlocks: [], unlocked: false }
    ,{ id: 'reveal_phone', title: "Here's my number", desc: 'So call me maybe', condition: 'Reveal it !', unlocks: [], unlocked: false }
    ,{ id: 'konami_code', title: 'Is this Easter ?', desc: 'No ? Get an egg anyway', condition: 'Ask a nintendo fan for help', unlocks: [], unlocked: false }
  ]
}
