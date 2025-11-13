const state = {
  name: 'Alexandre Bernard',
  photo: 'assets/moi.png',
  balance: 0,
}

const data = {
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
  /* Projects removed per request */
  projects: [],
  /* Education data taken from assets/context.txt */
  education: [
    { degree: 'Prépa MP', school: 'Lycée Marcelin Berthelot, St Maur des Fossées', year: '2010 — 2013' },
    { degree: 'Software Engineering', school: 'ENSEEIHT, Toulouse', year: '2013 — 2017' },
    { degree: 'Scrum Product Owner (cert)', school: 'Certification', year: '2019' },
    { degree: 'SAFe Scrum Master (cert)', school: 'Certification', year: '2020' }
  ],
  /* Concise Product Owner skills (max 2 words each) */
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
  }
  ,
  /* shop items available for purchase with score */
  shop: [
    { id: 'coffee', name: 'Coffee', cost: 2, desc: 'A small boost for productivity.' },
    { id: 'sticker', name: 'Sticker Pack', cost: 5, desc: 'Show off some cute stickers.' },
    { id: 'badge', name: 'Gold Badge', cost: 10, desc: 'A shiny badge for your profile.' }
  ]
}

// elements
const landing = document.getElementById('landing')
const question = document.getElementById('question')
const content = document.getElementById('content')
const startBtn = document.getElementById('startBtn')
const nameEl = document.getElementById('name')
const photoEl = document.getElementById('photo')
const scoreEl = document.getElementById('balanceCounter')
const shopButton = document.getElementById('shopButton')
const shopModal = document.getElementById('shopModal')
const shopBody = document.getElementById('shopBody')
const shopClose = document.getElementById('shopClose')
const shopBalance = document.getElementById('shopBalance')
const answers = document.getElementById('answers')
const contentInner = document.getElementById('contentInner')
const backBtn = document.getElementById('backBtn')
const skillsPanel = document.getElementById('skillsPanel')
const skillsPanelInner = document.getElementById('skillsPanelInner')
const skillsToggle = document.getElementById('skillsToggle')

nameEl.textContent = state.name
photoEl.src = state.photo
if(scoreEl) scoreEl.textContent = `Balance: ${state.balance} $`

if(shopBalance) shopBalance.textContent = String(state.balance)

// render persistent skills panel
if(skillsPanelInner){
  renderSkills(skillsPanelInner, data.skills)
}
if(skillsToggle && skillsPanel){
  skillsToggle.addEventListener('click', ()=>{
    const hidden = skillsPanel.classList.toggle('hide')
    skillsToggle.setAttribute('aria-expanded', String(!hidden))
  })
}

if (startBtn) startBtn.addEventListener('click', () => {
  // animate out hero then show question
  const hero = document.getElementById('hero')
  hero.classList.add('hidden')
  showQuestion()
})

// update score display helper
function updateScore(){
  if(scoreEl) scoreEl.textContent = `Balance: ${state.balance} $`
  if(shopBalance) shopBalance.textContent = String(state.balance)
}

// Increment score on left-mouse clicks anywhere on the document
document.addEventListener('click', (e)=>{
  // only count left mouse button (button === 0)
  try{
    if(typeof e.button === 'number' && e.button === 0){
      state.balance += 1
      updateScore()
    }
  }catch(err){/* defensive: ignore unexpected event shapes */}
})

// --- Shop logic ---
function openShop(){
  if(!shopModal) return
  shopModal.setAttribute('aria-hidden','false')
  renderShop()
  // move focus to modal close for keyboard users
  setTimeout(()=>{ if(shopClose) shopClose.focus() },60)
}

function closeShop(){
  if(!shopModal) return
  shopModal.setAttribute('aria-hidden','true')
}

function renderShop(){
  if(!shopBody) return
  shopBody.innerHTML = ''
  const items = data.shop || []
  items.forEach(it=>{
    const card = document.createElement('div')
    card.className = 'shop-item'
    const footerId = `buy-${it.id}`
    card.innerHTML = `<div><div class="item-name">${it.name}</div><div class="item-desc">${it.desc}</div></div><div class="item-footer"><div class="purchase-msg" id="msg-${it.id}"></div><div><strong>
      ${it.cost} pts
    </strong> <button id="${footerId}" class="buy-btn">Buy</button></div></div>`
    shopBody.appendChild(card)
    const btn = document.getElementById(footerId)
    const msg = document.getElementById(`msg-${it.id}`)
    if(btn){
      btn.addEventListener('click', ()=>{
        const success = buyItem(it.id)
        if(success){
          if(msg){ msg.textContent = 'Purchased ✓'; msg.style.color = 'var(--accent-2)'}
          btn.disabled = true
        } else {
          if(msg){ msg.textContent = 'Not enough points'; msg.style.color = 'var(--muted)'}
        }
        setTimeout(()=>{ if(msg) msg.textContent = '' },1600)
      })
    }
  })
}

function buyItem(id){
  const item = (data.shop || []).find(s=>s.id===id)
  if(!item) return false
  if(state.balance >= item.cost){
    state.balance -= item.cost
    updateScore()
    return true
  }
  return false
}

// wire up shop button and close actions
if(shopButton) shopButton.addEventListener('click', openShop)
if(shopClose) shopClose.addEventListener('click', closeShop)
if(shopModal){
  shopModal.addEventListener('click', (e)=>{
    // close when clicking the overlay (data-close attribute)
    if(e.target && e.target.getAttribute && e.target.getAttribute('data-close') === 'overlay') closeShop()
  })
  // close on ESC
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeShop() })
}



// Escape/back navigation removed — site no longer uses a global return button

function showQuestion() {
  populateAnswers()
  question.classList.remove('hidden')
  question.classList.add('fade-in')
  // move focus for accessibility
  setTimeout(()=>{
    const firstBtn = answers.querySelector('button')
    if(firstBtn) firstBtn.focus()
  },200)
}

function populateAnswers() {
  answers.innerHTML = ''
  data.options.forEach(opt => {
    const btn = document.createElement('button')
    btn.className = 'answerBtn'
    btn.textContent = opt.label
    btn.addEventListener('click', () => showContent(opt.id))
    answers.appendChild(btn)
  })
}

function showContent(id) {
  question.classList.add('hidden')
  contentInner.innerHTML = ''
  const title = document.createElement('h2')
  title.textContent = data.options.find(o=>o.id===id).label
  title.tabIndex = -1
  // set header title in the card header for context
  const contentTitle = document.getElementById('contentTitle')
  if(contentTitle) contentTitle.textContent = title.textContent

  // render by type
  if(id === 'experience') renderExperience(contentInner, data.experience)
  else if(id === 'education') renderEducation(contentInner, data.education)
  else if(id === 'contact') renderContact(contentInner, data.contact)

  // apply visual reveal
  content.classList.remove('hidden')
  content.classList.add('fade-in')
  // move focus to content for keyboard users
  setTimeout(()=>{ title.focus() },250)
}

function renderExperience(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'timeline'
  list.forEach(item=>{
    const card = document.createElement('article')
    card.className = 'exp-card'
    // include logo if provided
    const logoHtml = item.logo ? `<img src="${item.logo}" alt="${item.company} logo" class="company-logo">` : ''
    card.innerHTML = `<div class="exp-head">${logoHtml}<div class="exp-meta"><h3>${item.role}</h3><p class="muted">${item.company} · ${item.range}</p></div></div><ul>${item.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`
    wrap.appendChild(card)
  })
  container.appendChild(wrap)
}

function renderProjects(container, list){
  const grid = document.createElement('div')
  grid.className = 'project-grid'
  list.forEach(p=>{
    const card = document.createElement('article')
    card.className = 'project-card'
    const logoHtml = p.logo ? `<img src="${p.logo}" alt="${p.name} logo" class="project-logo">` : ''
    card.innerHTML = `<div class="project-head">${logoHtml}<h3><a href="${p.link}" target="_blank" rel="noopener noreferrer">${p.name}</a></h3></div><p class="muted">${p.desc}</p><p class="tech">${p.tech.map(t=>`<span class="tag">${t}</span>`).join('')}</p>`
    grid.appendChild(card)
  })
  container.appendChild(grid)
}

function renderEducation(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'education-list'
  if(!list || list.length === 0){
    const msg = document.createElement('p')
    msg.className = 'muted'
    msg.textContent = 'No education information provided. Add your degrees or certifications to this section.'
    wrap.appendChild(msg)
  } else {
    list.forEach(e=>{
      const row = document.createElement('div')
      row.className = 'edu-row'
      row.innerHTML = `<div><strong>${e.degree}</strong><div class="muted">${e.school}</div></div><div class="year muted">${e.year}</div>`
      wrap.appendChild(row)
    })
  }
  container.appendChild(wrap)
}

function renderSkills(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'skills-wrap'
  wrap.innerHTML = list.map(s=>`<span class="skill">${s}</span>`).join('')
  container.appendChild(wrap)
}

function renderContact(container, obj){
  // Render contact fields using the same row/card style as education
  const wrap = document.createElement('div')
  wrap.className = 'education-list'
  const rows = []
  if(obj && (obj.email || obj.phone || obj.linkedin)){
    if(obj.email){
      const row = document.createElement('div')
      row.className = 'edu-row'
      row.innerHTML = `<div><strong>Email</strong></div><div class="year"><a href="mailto:${obj.email}">${obj.email}</a></div>`
      rows.push(row)
    }
    if(obj.phone){
      const row = document.createElement('div')
      row.className = 'edu-row'
      row.innerHTML = `<div><strong>Phone</strong></div><div class="year"><a href="tel:${obj.phone}">${obj.phone}</a></div>`
      rows.push(row)
    }
    if(obj.linkedin){
      const row = document.createElement('div')
      row.className = 'edu-row'
      row.innerHTML = `<div><strong>LinkedIn</strong></div><div class="year"><a href="${obj.linkedin}" target="_blank" rel="noopener noreferrer">${obj.linkedin}</a></div>`
      rows.push(row)
    }
    rows.forEach(r=>wrap.appendChild(r))
  } else {
    const msg = document.createElement('p')
    msg.className = 'muted'
    msg.textContent = 'No contact information available.'
    wrap.appendChild(msg)
  }
  container.appendChild(wrap)
}

// Expose a tiny API for later editing
window.resumeEditor = {
  setName(n){ state.name = n; nameEl.textContent = n },
  setPhoto(url){ state.photo = url; photoEl.src = url },
  setSection(id, text){ if(data[id]!==undefined) data[id]=text },
  /* balance/shop controls */
  resetBalance(){ state.balance = 0; updateScore() },
  addBalance(n){ state.balance += Number(n||0); updateScore() },
  buyItem(id){ return buyItem(id) }
}
