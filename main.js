import { state, data } from './data.js'
import { renderSkills, renderExperience, renderProjects, renderEducation, renderContact } from './ui.js'
import { initShop } from './shop.js'

// collect elements
const elements = {
  landing: document.getElementById('landing'),
  question: document.getElementById('question'),
  content: document.getElementById('content'),
  startBtn: document.getElementById('startBtn'),
  nameEl: document.getElementById('name'),
  photoEl: document.getElementById('photo'),
  balanceEl: document.getElementById('balanceCounter'),
  balanceAmount: document.getElementById('balanceAmount'),
  balanceRate: document.getElementById('balanceRate'),
  achievementsPanel: document.getElementById('achievementsPanel'),
  achievementsButton: document.getElementById('achievementsButton'),
  achievementsModal: document.getElementById('achievementsModal'),
  achBody: document.getElementById('achBody'),
  achClose: document.getElementById('achClose'),
  shopButton: document.getElementById('shopButton'),
  shopModal: document.getElementById('shopModal'),
  shopBody: document.getElementById('shopBody'),
  shopClose: document.getElementById('shopClose'),
  shopBalance: document.getElementById('shopBalance'),
  answers: document.getElementById('answers'),
  contentInner: document.getElementById('contentInner'),
  skillsPanelInner: document.getElementById('skillsPanelInner'),
  skillsToggle: document.getElementById('skillsToggle')
}

// current averaged rate ($/s) over last 5s
let currentRate = 0

// initial rendering and wiring
if(elements.nameEl) elements.nameEl.textContent = state.name
if(elements.photoEl) elements.photoEl.src = state.photo
if(elements.balanceAmount) elements.balanceAmount.textContent = `${state.balance} $`
if(elements.shopBalance) elements.shopBalance.textContent = `${state.balance} $`
if(elements.balanceRate) elements.balanceRate.textContent = `0 $/s`

if(elements.skillsPanelInner) renderSkills(elements.skillsPanelInner, data.skills)

if(elements.startBtn) elements.startBtn.addEventListener('click', ()=>{
  const hero = document.getElementById('hero')
  if(hero) hero.classList.add('hidden')
  showQuestion()
})

function updateScore(){
  if(elements.balanceAmount) elements.balanceAmount.textContent = `${state.balance} $`
  if(elements.shopBalance) elements.shopBalance.textContent = `${state.balance} $`
  // if the shop is open, refresh it so buy buttons enable/disable correctly
  try{
    if(shopApi && typeof shopApi.refresh === 'function' && elements.shopModal && elements.shopModal.getAttribute('aria-hidden') === 'false'){
      shopApi.refresh()
    }
  }catch(err){}
  // evaluate achievements after any score change
  try{ checkAchievements() }catch(e){}
}

// increment score on clicks
if(typeof state.clickPower !== 'number') state.clickPower = 1

function spawnFloating(amount, x, y){
  try{
    const el = document.createElement('span')
    el.className = 'float-bonus'
    el.textContent = `+${amount} $`
    if(typeof x === 'number' && typeof y === 'number'){
      el.style.left = `${x}px`
      el.style.top = `${y - 8}px`
    } else if(elements.scoreEl){
      const rect = elements.scoreEl.getBoundingClientRect()
      el.style.left = `${rect.left + rect.width/2}px`
      el.style.top = `${rect.top + rect.height/2}px`
    } else {
      el.style.left = `50%`
      el.style.top = `50%`
    }
    document.body.appendChild(el)
    setTimeout(()=>{ try{ el.remove() }catch(e){} }, 950)
  }catch(e){}
}

// Achievements UI
function showAchievementToast(title, desc){
  try{
    const panel = elements.achievementsPanel
    if(!panel) return
    const el = document.createElement('div')
    el.className = 'achievement-toast'

    const header = document.createElement('div')
    header.className = 'toast-header'

    const t = document.createElement('div')
    t.className = 'toast-title'
    t.textContent = title

    const closeBtn = document.createElement('button')
    closeBtn.className = 'achievement-close'
    closeBtn.setAttribute('aria-label','Close achievement')
    closeBtn.innerHTML = '✕'
    closeBtn.addEventListener('click', ()=>{ try{ el.remove() }catch(e){} })

    header.appendChild(t)
    header.appendChild(closeBtn)

    const d = document.createElement('div')
    d.className = 'toast-desc'
    d.textContent = desc

    el.appendChild(header)
    el.appendChild(d)

    panel.appendChild(el)
    // persistent: do not auto-remove; user must close via button
  }catch(e){}
}

function unlockAchievement(id){
  try{
    const ach = (data.achievements || []).find(a=>a.id===id)
    if(!ach || ach.unlocked) return
    ach.unlocked = true
    ;(ach.unlocks || []).forEach(u=>{
        if(u === 'balance'){
          const el = elements.balanceEl || document.getElementById('balanceCounter')
          if(el){ el.classList.remove('hidden') }
          try{ updateScore() }catch(e){}
        }
      if(u === 'shop'){
        const sb = elements.shopButton || document.getElementById('shopButton')
        if(sb){ sb.classList.remove('hidden') }
      }
      if(u === 'achievements'){
        const ab = elements.achievementsButton || document.getElementById('achievementsButton')
        if(ab){ ab.classList.remove('hidden') }
      }
      if(u === 'skills'){
        const sp = document.getElementById('skillsPanel') || document.getElementById('skillsPanel')
        if(sp){ sp.classList.remove('hidden') }
      }
    })
    showAchievementToast(ach.title, ach.desc)
    try{ if(elements.achievementsModal && elements.achievementsModal.getAttribute('aria-hidden') === 'false'){ renderAchievements() } }catch(e){}
  }catch(e){}
}

function checkAchievements(){
  try{
    const achs = data.achievements || []
    const first = achs.find(a=>a.id==='first_earned')
    if(first && !first.unlocked){ if(state.balance > 0) unlockAchievement('first_earned') }
    const second = achs.find(a=>a.id==='idle_or_resume')
    if(second && !second.unlocked){ if(state.balance >= 10) unlockAchievement('idle_or_resume') }
    // unlock skills panel when rate >= 50 $/s
    const rateAch = achs.find(a=>a.id==='rate_50')
    try{
      const r = Number(currentRate || 0)
      if(rateAch && !rateAch.unlocked && r >= 50){ unlockAchievement('rate_50') }
    }catch(e){}
  }catch(e){}
}

function renderAchievements(){
  try{
    const body = elements.achBody
    if(!body) return
    body.innerHTML = ''
    const achs = (data.achievements || [])
    if(!achs.length){ body.textContent = 'No achievements defined.'; return }
    achs.forEach(a=>{
      const row = document.createElement('div')
      row.className = 'achievement-item'
      const status = document.createElement('div')
      status.className = 'achievement-status'
      status.textContent = a.unlocked ? '✓' : '🔒'
      const meta = document.createElement('div')
      const title = document.createElement('div')
      title.className = 'achievement-title'
      title.textContent = a.title
      const desc = document.createElement('div')
      desc.className = 'achievement-desc'
      // show unlock condition when locked, otherwise show the unlocked description
      desc.textContent = a.unlocked ? (a.desc || '') : (a.condition || 'Locked')
      meta.appendChild(title)
      meta.appendChild(desc)
      row.appendChild(status)
      row.appendChild(meta)
      body.appendChild(row)
    })
  }catch(e){}
}

document.addEventListener('click', (e)=>{
  try{
    const isPrimary = (!('button' in e)) || e.button === 0
    if(isPrimary){
      const power = Number(state.clickPower || 1)
      state.balance += power
      if(typeof recordEvent === 'function') recordEvent(power)
      updateScore()
      const cx = (typeof e.clientX === 'number') ? e.clientX : null
      const cy = (typeof e.clientY === 'number') ? e.clientY : null
      spawnFloating(power, cx, cy)
    }
  }catch(err){}
})

// earnings history for rate
const earnEvents = []
function recordEvent(amount){
  try{
    const now = Date.now() / 1000
    earnEvents.push({t: now, amount: Number(amount||0)})
    const cutoff = now - 5
    while(earnEvents.length && earnEvents[0].t < cutoff) earnEvents.shift()
    const sum = earnEvents.reduce((s,e)=>s+e.amount,0)
    const avg = (sum / 5)
    // update currentRate for achievement checks
    currentRate = avg
    if(elements.balanceRate) elements.balanceRate.textContent = `${avg.toFixed(1)} $/s`
  }catch(e){}
}

const shopApi = initShop({
  shopButton: elements.shopButton,
  shopModal: elements.shopModal,
  shopBody: elements.shopBody,
  shopClose: elements.shopClose,
  shopBalance: elements.shopBalance
}, state, data, updateScore, recordEvent, unlockAchievement)

// Achievements modal wiring
if(elements.achievementsButton){
  elements.achievementsButton.addEventListener('click', ()=>{
    try{ if(elements.achievementsModal) elements.achievementsModal.setAttribute('aria-hidden','false') }catch(e){}
    renderAchievements()
  })
}
if(elements.achClose){
  elements.achClose.addEventListener('click', ()=>{ try{ if(elements.achievementsModal) elements.achievementsModal.setAttribute('aria-hidden','true') }catch(e){} })
}
if(elements.achievementsModal){
  elements.achievementsModal.addEventListener('click', (ev)=>{
    try{
      const t = ev.target
      if(t && t.dataset && t.dataset.close === 'overlay'){
        elements.achievementsModal.setAttribute('aria-hidden','true')
      }
    }catch(e){}
  })
}

// question/navigation helpers
function showQuestion(){
  populateAnswers()
  if(elements.question){ elements.question.classList.remove('hidden'); elements.question.classList.add('fade-in') }
  setTimeout(()=>{ const firstBtn = elements.answers && elements.answers.querySelector('button'); if(firstBtn) firstBtn.focus() },200)
}

function populateAnswers(){
  if(!elements.answers) return
  elements.answers.innerHTML = ''
  data.options.forEach(opt=>{
    const btn = document.createElement('button')
    btn.className = 'answerBtn'
    btn.textContent = opt.label
    btn.addEventListener('click', ()=> showContent(opt.id))
    elements.answers.appendChild(btn)
  })
}

function showContent(id){
  if(elements.question) elements.question.classList.add('hidden')
  if(!elements.contentInner) return
  elements.contentInner.innerHTML = ''
  const found = data.options.find(o=>o.id===id)
  if(id === 'experience') renderExperience(elements.contentInner, data.experience)
  else if(id === 'education') renderEducation(elements.contentInner, data.education)
  else if(id === 'contact') renderContact(elements.contentInner, data.contact)
  if(elements.content){ elements.content.classList.remove('hidden'); elements.content.classList.add('fade-in') }
}

window.showContent = showContent

window.resumeEditor = {
  setName(n){ state.name = n; if(elements.nameEl) elements.nameEl.textContent = n },
  setPhoto(url){ state.photo = url; if(elements.photoEl) elements.photoEl.src = url },
  setSection(id, text){ if(data[id]!==undefined) data[id]=text },
  resetBalance(){ state.balance = 0; updateScore() },
  addBalance(n){ state.balance += Number(n||0); updateScore() },
  buyItem(id){ if(shopApi && typeof shopApi.buyItem === 'function') return shopApi.buyItem(id); return false }
}
