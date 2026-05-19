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
      range: '2024 - Present',
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
      range: '2022 - 2024',
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
      range: '2017 - 2022',
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
    { degree: 'Software Engineering', school: 'ENSEEIHT, Toulouse', year: '2013 - 2017' },
    { degree: 'Prépa MP', school: 'Lycée Marcelin Berthelot, St Maur des Fossées', year: '2010 - 2013' }
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
        "headline": "About - Backend Engineer (Acme)",
        "body": "I design and build resilient backend systems that scale gracefully under load. My work focuses on clear APIs, observability, and efficient data pipelines so teams can iterate quickly without sacrificing reliability.\n\nAt Acme I would prioritize pragmatic system design: well-defined interfaces, service contracts, and performance budgets. I instrument systems early and use metrics-driven triage to reduce latency and error rates while making mean-time-to-recovery measurable.\n\nI bring experience in designing ingestion and processing pipelines that turn noisy input into dependable signals for product decisions. This includes schema design, streaming and batch workflows, and cost-conscious storage patterns.\n\nI collaborate closely with product and SRE teams to align operational goals with feature development. That means automated testing, deployment safety (canaries/feature flags), and clear runbooks so services remain predictable in production.\n\nFinally, I mentor engineers to write maintainable, observable code and to prioritize technical debt reduction. My goal is to deliver measurable improvements in reliability, latency, and development velocity."
      }
    },
    alan: {
      "id": "alan",
      "name": "alan",
      "about": {
        "headline": "Me and Alan",
        "body": "I’m a Product Owner with two years of experience bringing ideas to life, shaping products through user insights, and collaborating across teams to solve real problems. But beyond my job title, I’m also a dad of two - and that’s a big part of why I care so much about the work I do and the companies I choose to join.\n\nBeing a father changed the way I think about health, time, and simplicity. When you’re caring for two little humans, you quickly realise how precious every minute is - and how important it is to have systems and services that genuinely help you navigate life, instead of adding more stress. That’s why Alan’s mission speaks to me so strongly.\n\nI actually used Alan for a full year, and it wasn’t just “good insurance.” It felt like someone had finally designed healthcare the way it should be - clear, caring, and built around real people’s needs. That personal experience made me understand, in a very tangible way, how powerful member-centric design can be. It also made me genuinely excited about the idea of helping build the next chapter of that experience for other families, freelancers, and small businesses.\n\nProfessionally, I’m naturally curious, analytical, and obsessed with understanding users. I’m comfortable diving into data, refining priorities, and bringing teams around a shared outcome. But what really drives me is making things that improve people’s daily lives - especially when it comes to health and wellbeing.\n\nAs a parent, as a user, and as someone who loves building simple, thoughtful solutions, I feel a strong alignment with Alan’s culture and values. I’m excited by the Segment Owner role because it blends strategy, empathy, creativity, and ownership - everything that motivates me and brings out the best in my work."
      }
    },
    homa:{
      "id":"homa",
      "name":"homa",
      "about": {
        "headline":"Me and Homa Games",
        "body":"I’m a Product Owner with two years of experience, but at heart, I’ve always been a systems thinker - the kind of person who can’t play an RPG without breaking down its progression trees, economy loops, and combat synergies. I’ve spent my life fascinated by what makes character growth satisfying, what keeps players coming back to a world, and how well-crafted systems quietly shape unforgettable adventures.\n\nBecoming a dad of two deepened that passion in an unexpected way. RPGs became my sanctuary - the place I go to recharge between the chaos and beauty of parenthood. They’re also becoming a way to bond with my oldest child, who’s starting to discover the magic of stories, characters, and choices. Seeing games through his eyes reminded me why these experiences matter: because they create worlds we care about and journeys we want to stay in.\n\nThat’s why I’m drawn to Homa.\n\nYour ambition to build long-lasting, system-driven games - supported by strong analytics, fast iteration, and a culture rooted in curiosity and humility - feels perfectly aligned with how I think and work. As a Product Owner, I’ve developed the discipline of clear documentation, ownership, cross-team collaboration, and data-informed iteration. I naturally gravitate toward designing loops, mapping progression flows, understanding player motivations, and refining systems until they feel smooth, meaningful, and scalable.\n\nI’m looking for my next step: a place where I can help shape the foundations of a new RPG experience, work side-by-side with talented creators, and contribute to worlds players will return to for years. Homa’s vision and culture feel like the perfect setting for that next chapter of my journey - as a builder, a teammate, and a dad who knows how important great universes and great systems truly are."
      }
    },
    timetonic:{
      "id":"timetonic",
      "name":"timetonic",
      "about": {
        "headline":"Me and TimeTonic",
        "body":"I am a Product Owner with two years of experience building clear, reliable, and user-focused digital products. Becoming a father of two has had a strong influence on how I approach my work: it taught me to value simplicity, focus on what truly matters, and design solutions that genuinely make people’s lives easier. This perspective drives the way I think about product - always prioritizing clarity, usability, and real impact.\n\nI am particularly drawn to TimeTonic because of your ambition to make powerful technology accessible through no-code, data, and AI. I’ve always been passionate about tools that help teams move faster and innovate without technical barriers. The idea of contributing to a French, sovereign, award-winning platform - one that helps companies of all sizes transform their processes - is extremely motivating to me.\n\nAs a Product Owner, I enjoy being at the intersection of business needs, user insights, and technical execution. I’m comfortable structuring a product roadmap, writing detailed user stories, challenging requirements, and working closely with developers, QA, and designers to deliver high-quality features. I’m rigorous, organized, and attentive to detail, especially when it comes to testing, release coordination, and documentaton.\n\nI also have a solid understanding of technical concepts such as APIs, databases, and integrations, which allows me to communicate efficiently with engineering teams and find pragmatic solutions. I like analyzing complex problems and turning them into simple, intuitive experiences - a mindset that aligns closely with TimeTonic’s vision of creating powerful but easy-to-use tool\n\nToday, I’m looking for an environment where I can grow quickly, deepen my expertise, and contribute to a product with strong technological foundations. TimeTonic offers exactly that: a fast-growing company, a passionate team, a culture shaped by innovation and quality, and a product that truly changes the way organizations operate. I would be excited to bring my energy, curiosity, and commitment to your team."
      }
    },
    lyra:{
      "id":"lyra",
      "name":"lyra",
      "about": {
        "headline":"Me and Lyra",
        "body":"I’m a Product Owner with two years of experience working on internal tools and dashboards, and a background as a developer that makes me very comfortable with technical topics, integrations, and system-level thinking. I’ve worked across health, aeronautics, and manufacturing, which taught me to stay rigorous, precise, and deeply user-focused no matter the context.\n\nPeople usually describe me as a fast learner - curious, sharp, and quick to understand how things really work. I enjoy diving into user needs, leading discovery, and turning scattered inputs into clear priorities. Whether it’s writing specs, challenging requirements, or structuring a full delivery cycle from need → testing → documentation, I like making things simpler, more reliable, and actually useful. Problem-solving is where I’m at my best.\n\nWhat motivates me the most is when someone tells me, “This finally makes my job easier.” I like solving real problems for real people. That’s also why Lyra’s mission resonates with me - building tools and systems that quietly support thousands of users behind the scenes feels meaningful. I want to feel that what I’m doing matters.\n\nBeing a dad of two has also shaped the way I work: I’m calmer, more adaptable, and better at focusing on what truly matters. Outside of work, you’ll find me playing chess, climbing, or in the world of esports - anything that mixes strategy, intensity, and continuous improvement.\n\nI’m looking for a place where I can grow, contribute, and build internal tools that make teams stronger and workflows smoother. A place where the impact is visible. And Lyra feels exactly like that kind of environment."
      }
    },
    safti:{
      "id":"safti",
      "name":"safti",
      "about": {
        "headline":"Me and Safti",
        "body":"I’m a Product Owner with a developer background and a strong appetite for building tools that genuinely make people’s daily work easier. For the past years, I’ve worked on internal tools, dashboards and complex workflows across industries like health, aerospace and manufacturing - environments where clarity, precision and reliability are non-negotiable.\n\nWhat drives me is understanding real user needs, simplifying processes, and turning complexity into something intuitive and efficient. I’m comfortable navigating both business expectations and technical constraints, and I’m quick to dive into details when needed. Running discovery, prioritizing, structuring backlogs and leading end-to-end delivery have become second nature to me.\n\nAs a dad of two young kids, I’ve learned to stay calm under pressure, focus on what truly matters and manage my time with intention. It also reinforced something essential for me: I need meaning in what I build. I want to contribute to products that support people in concrete, impactful moments - which is exactly what SAFTI does for both clients and advisors.\n\nCurious, fast to understand, and very solutions-driven, I’m always looking for ways to improve tools, processes and collaboration. I enjoy being the link between teams, creating alignment, and making sure every iteration brings real value.\n\nI’m looking to join a team where innovation, human connection and ambition go hand in hand - and SAFTI feels like the perfect place to bring my energy, my product mindset and my sense of ownership."
      }
    },
    bluecoders:{
      "id":"bluecoders",
      "name":"bluecoders",
      "about": {
        "headline":"Me and Bluecoders",
        "body":"I’m a product-minded engineer who cares deeply about building systems people can trust. Becoming a parent changed the way I think about technology more than I expected - reliability, clarity, and long-term decisions suddenly stopped being abstract concepts. When something breaks, someone pays the price, and I’m naturally drawn to work that reduces that kind of friction.\n\nI enjoy working on complex systems close to production: developer workflows, CI/CD pipelines, event-driven architectures, and tooling that engineers rely on every day. What motivates me isn’t complexity itself, but making complex systems easier to reason about, safer to operate, and simpler to evolve over time. Good engineering, to me, is invisible when it works - and obvious only when it’s missing.\n\nOwnership is central to how I work. I like taking a problem from an early, fuzzy pain point all the way to a shipped solution, then iterating based on real user feedback. I’m comfortable collaborating directly with founders and product leaders, asking hard questions, challenging assumptions, and focusing on outcomes rather than ideas.\n\nI’ve chosen to stay an individual contributor by design. My impact comes from building, reviewing, and explaining - from helping teams make better technical decisions today so they don’t regret them tomorrow. I enjoy mentoring through collaboration, raising the bar through code and design discussions, and keeping systems healthy long after the initial launch.\n\nI’m looking for a product-driven, high-trust environment where autonomy is real, communication is clear, and quality compounds over time. A place where I can do meaningful work, contribute at a Staff level, and still be present for my kids at the end of the day - because that balance is what ultimately allows me to do my best work."
      }
    },
    batvoice:{
      "id":"batvoice",
      "name":"batvoice",
      "about": {
        "headline":"Me and BatvoiceAI",
        "body":"My career has been defined by a duality: the logic of an engineer and the empathy of a product manager. With an Engineer’s Degree in Computer Science and years of hands-on coding experience, I possess the technical chops to understand the 'how' behind Batvoice’s platform. However, my true passion is the 'why.' Having led Agile transformations and managed complex roadmaps, I am eager to apply the Shape Up methodology to stop the cycle of reactive development. I want to help the technical staff understand the business value of their work while protecting them from half-baked client requests.\n\nI am particularly drawn to the role of a 'Shaper' at Batvoice because it prioritizes deep thinking over rapid-fire ticket closing. I believe that a great product is built by saying 'no' to the wrong things so we can say 'yes' to the right ones. My experience leveraging data to make roadmap decisions ensures that when I bring a pitch to the table, it is backed by evidence and a clear vision for how it unifies the user experience.\n\nOutside of the backlog, I am a proud father of two. Parenthood has been the ultimate training ground for patience, negotiation, and handling the unexpected-skills that are surprisingly transferable to stakeholder management! I am looking for a company that respects this balance, and in return, I offer a level of commitment and maturity that ensures I deliver consistent, high-quality work, cycle after cycle."
      }
    },
    jarvi:{
      "id":"jarvi",
      "name":"Jarvi",
      "about": {
        "headline":"Me and Jarvi",
        "body":"I’m a Product Owner with a developer background, and what excites me about Jarvi is the idea of keeping the distance between a user problem and a shipped solution as short as possible. I like digging into real pain points, challenging the initial request, designing something useful, and staying close enough to the build to make sure it actually works - not just that it looks good in a backlog.\n\nMy path from fullstack developer to Product Owner taught me to move naturally between product thinking and technical execution. I’ve worked on internal tools, dashboards, complex workflows, API integrations and data-driven features across demanding environments like health, aerospace and manufacturing. Those experiences shaped how I work: clarify the problem, cut unnecessary complexity, ship something solid, then improve it with real feedback.\n\nWhat I like about Jarvi is the Product Builder mindset. I don’t see AI as a magic wand, but as a very useful accelerator when you already understand users, systems and trade-offs. I enjoy prototyping, investigating issues, digging into data, understanding APIs and turning vague operational friction into concrete product improvements. Using AI to shorten the loop between discovery, building and delivery feels like the kind of product work I enjoy most.\n\nI’m also interested in the recruitment space because good tools can make a real difference there. Recruiters deal with timing, context and relationships all day long. A good ATS or CRM should not add another admin layer; it should remove repetitive work and help people focus on conversations, decisions and placements.\n\nAs a dad of two young kids, I’ve learned to value focus, autonomy and useful outcomes over noise. I’m calm under pressure, comfortable taking ownership, and not a huge fan of building features just because they sounded nice in a meeting. I’m looking for a small, ambitious team where I can work end-to-end, talk directly with users, build with modern tools, and have a visible impact on the product. Jarvi feels like a place where my product mindset, technical background and builder energy could be genuinely useful - and where asking ‘could we ship this today?’ is probably a feature, not a bug."
      }
    },
    cognyx:{
      "id":"cognyx",
      "name":"Cognyx",
      "about": {
        "headline":"Me and Cognyx",
        "body":"I’m a Product Owner with a developer background, and what excites me about Cognyx is the ambition to bring hardware engineering closer to the speed, clarity and collaboration we expect from modern software. Building a “GitHub for Hardware” is the kind of challenge I naturally like: complex data, expert workflows, technical constraints everywhere and a huge opportunity to make people’s daily work simpler.\n\nMy path from fullstack developer to Product Owner taught me to move comfortably between product thinking and technical execution. I’ve worked on internal tools, dashboards, complex workflows, API integrations and data-driven features across demanding environments like health, aerospace and manufacturing. Those experiences shaped how I work: understand the real workflow, clarify the problem, cut unnecessary complexity, then ship something reliable enough for people who cannot afford vague answers.\n\nWhat I like about Cognyx is that the product seems to sit right at the intersection of data, AI and industrial reality. BOMs, PLM, ERP, rules, simulations, cost, compliance, CO₂ impact. These are not just abstract concepts on a nice slide. They are the messy operational details that decide whether teams move fast or get stuck. I enjoy that kind of complexity, especially when the goal is to turn scattered information into something structured, visual and useful.\n\nI’m also drawn to the idea of using AI in a pragmatic way: not as a shiny layer on top of the product, but as a real accelerator for engineering decisions. Helping teams build, compare, control and optimize BOMs faster is exactly the kind of product challenge where discovery, data modeling, UX clarity and technical understanding all matter at the same time.\n\nAs a dad of two young kids, I’ve learned to value focus, calm and useful outcomes over noise. I’m comfortable taking ownership, asking detailed questions, and staying close to both users and engineering until the solution actually works. I’m looking for a small, ambitious team where I can contribute end-to-end, learn fast, and help build tools that make complex industrial work feel a little less like fighting a final boss without a map. Cognyx feels like a place where my product mindset, technical background and curiosity for real-world systems could be genuinely useful."
      }
    },
    diabolocom:{
      "id":"diabolocom",
      "name":"Diabolocom",
      "about": {
        "headline":"Me and Diabolocom",
        "body":"After a few years as a developer, I moved into product because I became more and more interested in one thing: how we turn messy ideas, user frustrations and business constraints into real solutions people can actually use. What excites me about Diabolocom is that this happens in a very concrete space: customer interactions, support teams, sales teams, agents under pressure, and tools that need to be fast, reliable and genuinely helpful.\n\nMy path from fullstack developer to Product Owner taught me to move comfortably between product thinking and technical execution. I’ve worked on internal tools, dashboards, complex workflows, API integrations and data-driven features across demanding environments like health, aerospace and manufacturing. Those experiences shaped how I work: understand the real pain point, read between the lines of feedback, simplify the workflow, then ship something solid enough for everyday use.\n\nWhat I like about Diabolocom is the mix of cloud contact center, telecom reliability, CRM integrations and AI applied to real operational problems. Routing conversations, helping agents, summarizing calls, tracking KPIs, improving lead management - these are not abstract “nice-to-have” features. They directly affect how teams work, how customers feel, and how quickly companies can react when things get busy.\n\nI’m especially interested in the AI side because it feels useful when it removes friction instead of adding another shiny layer. In a contact center, good AI should help agents focus on the conversation, reduce repetitive tasks, surface the right context, and make quality easier to monitor. That kind of product challenge needs empathy, data, technical understanding and a strong sense of trade-offs - which is exactly where I like to operate.\n\nAs a dad of two young kids, I’ve learned to stay calm when the queue is full, the noise level is suspiciously high, and someone urgently needs a solution. I’m curious, pragmatic, slightly overthinking in a useful way, and focused on building products that make people’s daily work easier. Diabolocom feels like a place where my developer background, product mindset and appetite for practical AI could be genuinely useful - especially if the goal is to make complex customer operations feel smoother, smarter and a bit less chaotic."
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
    { id: 'buy_3_boosters', title: "Hmmmm, I've got you attention now !", desc: 'Unlock achievements', condition: 'Buy 3 Click Boosters', unlocks: ['achievements'], unlocked: false },
    { id: 'rate_50', title: 'You are so skilled !', desc: 'Here, find my skills !', condition: 'Reach 50 $/s', unlocks: ['skills'], unlocked: false },
    { id: 'full_auto_mode', title: 'Full auto mode', desc: 'More shop items', condition: 'Buy 5 Auto Clickers', unlocks: [], unlocked: false },
    { id: 'dont_give_up_on_me', title: "Don't give up on me", desc: 'Get rick rolled', condition: '???', unlocks: [], unlocked: false }
    ,{ id: 'click_face_10', title: "Yes, That's me", desc: 'Buy accessories', condition: 'Click the photo 10 times', unlocks: [], unlocked: false }
    ,{ id: 'reveal_phone', title: "Here's my number", desc: 'So call me maybe', condition: 'Reveal it !', unlocks: [], unlocked: false }
    ,{ id: 'konami_code', title: 'Is this Easter ?', desc: 'No ? Get an egg anyway', condition: 'Ask a nintendo fan for help', unlocks: [], unlocked: false }
  ]
}
