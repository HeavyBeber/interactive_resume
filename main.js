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
  scoreEl: document.getElementById('scoreCounter'),
  balanceAmount: document.getElementById('balanceAmount'),
  balanceRate: document.getElementById('balanceRate'),
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

// initial rendering and wiring
if(elements.nameEl) elements.nameEl.textContent = state.name
if(elements.photoEl) elements.photoEl.src = state.photo
if(elements.balanceAmount) elements.balanceAmount.textContent = `${state.score} $`
if(elements.shopBalance) elements.shopBalance.textContent = `${state.score} $`
if(elements.balanceRate) elements.balanceRate.textContent = `0 $/s`

if(elements.skillsPanelInner) renderSkills(elements.skillsPanelInner, data.skills)
// skills panel left intentionally persistent (no toggle required)

if(elements.startBtn) elements.startBtn.addEventListener('click', ()=>{
  const hero = document.getElementById('hero')
  if(hero) hero.classList.add('hidden')
  showQuestion()
})

function updateScore(){
  if(elements.balanceAmount) elements.balanceAmount.textContent = `${state.score} $`
  if(elements.shopBalance) elements.shopBalance.textContent = `${state.score} $`
  // if the shop is open, refresh it so buy buttons enable/disable correctly
  try{
    if(shopApi && typeof shopApi.refresh === 'function' && elements.shopModal && elements.shopModal.getAttribute('aria-hidden') === 'false'){
      shopApi.refresh()
    }
  }catch(err){/* ignore refresh errors */}
}

// increment score on left clicks (uses `clickPower` for effectiveness)
if(typeof state.clickPower !== 'number') state.clickPower = 1
// spawn a floating +X$ at (x,y) or near score if coords not provided
function spawnFloating(amount, x, y){
  try{
    const el = document.createElement('span')
    el.className = 'float-bonus'
    el.textContent = `+${amount} $`
    // position
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
    // remove after animation
    setTimeout(()=>{ try{ el.remove() }catch(e){} }, 950)
  }catch(e){}
}

document.addEventListener('click', (e)=>{
  try{
    if(typeof e.button === 'number' && e.button === 0){
      const power = Number(state.clickPower || 1)
      state.score += power
      // record this earning event then update UI
      if(typeof recordEvent === 'function') recordEvent(power)
      updateScore()
      // show floating at pointer coordinates
      const cx = (typeof e.clientX === 'number') ? e.clientX : null
      const cy = (typeof e.clientY === 'number') ? e.clientY : null
      spawnFloating(power, cx, cy)
    }
  }catch(err){}
})

// Shop setup
// event history for earnings (last 5s)
const earnEvents = []

function recordEvent(amount){
  try{
    const now = Date.now() / 1000
    earnEvents.push({t: now, amount: Number(amount||0)})
    // remove events older than 6 seconds for a small buffer
    const cutoff = now - 5
    while(earnEvents.length && earnEvents[0].t < cutoff){
      earnEvents.shift()
    }
    // compute sum over last 5 seconds
    const sum = earnEvents.reduce((s,e)=>s+e.amount,0)
    const avg = (sum / 5)
    if(elements.balanceRate) elements.balanceRate.textContent = `${avg.toFixed(1)} $/s`
  }catch(e){}
}

const shopApi = initShop({
  shopButton: elements.shopButton,
  shopModal: elements.shopModal,
  shopBody: elements.shopBody,
  shopClose: elements.shopClose,
  shopBalance: elements.shopBalance
}, state, data, updateScore, recordEvent)

// Question / navigation
function showQuestion(){
  populateAnswers()
  if(elements.question){
    elements.question.classList.remove('hidden')
    elements.question.classList.add('fade-in')
    setTimeout(()=>{
      const firstBtn = elements.answers && elements.answers.querySelector('button')
      if(firstBtn) firstBtn.focus()
    },200)
  }
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
  const title = document.createElement('h2')
  const found = data.options.find(o=>o.id===id)
  title.textContent = found ? found.label : id
  title.tabIndex = -1

  if(id === 'experience') renderExperience(elements.contentInner, data.experience)
  else if(id === 'education') renderEducation(elements.contentInner, data.education)
  else if(id === 'contact') renderContact(elements.contentInner, data.contact)

  if(elements.content){
    elements.content.classList.remove('hidden')
    elements.content.classList.add('fade-in')
  }
  setTimeout(()=>{ title.focus() },250)
}

// expose for inline handlers in `index.html` (hero buttons use `onclick="showContent('...')"`)
window.showContent = showContent

// expose API for quick edits
window.resumeEditor = {
  setName(n){ state.name = n; if(elements.nameEl) elements.nameEl.textContent = n },
  setPhoto(url){ state.photo = url; if(elements.photoEl) elements.photoEl.src = url },
  setSection(id, text){ if(data[id]!==undefined) data[id]=text },
  resetScore(){ state.score = 0; updateScore() },
  addScore(n){ state.score += Number(n||0); updateScore() },
  buyItem(id){ if(shopApi && typeof shopApi.buyItem === 'function') return shopApi.buyItem(id); return false }
}
