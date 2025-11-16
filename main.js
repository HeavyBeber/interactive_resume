import { state, data } from './src/data/data.js'
import { renderSkills, renderExperience, renderProjects, renderEducation, renderContact } from './src/ui/ui.js'
import { initShop } from './src/shop/shop.js'
import { initAchievements } from './src/achievements/achievements.js'

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

// Count clicks on the photo to unlock an achievement after 10 clicks
try{
  if(elements.photoEl){
    state._photoClicks = state._photoClicks || 0
    elements.photoEl.addEventListener('click', (e)=>{
      try{
        state._photoClicks = (state._photoClicks || 0) + 1
        // visual feedback is handled by the global click handler (avoid spawning a zero-value toast here)
        if(state._photoClicks >= 10){
          try{
            if(achievementsApi && typeof achievementsApi.unlockAchievement === 'function') achievementsApi.unlockAchievement('click_face_10')
          }catch(e){}
        }
      }catch(e){}
    })
  }
}catch(e){}

// Show accessory overlay on the photo. `id` should match asset filename under `assets/accessories/{id}.svg`
function showAccessory(id){
  try{
    if(!elements.photoEl) return
    // ensure wrapper exists
    let wrap = elements.photoEl.closest('.photo-wrap')
    if(!wrap){
      wrap = document.createElement('div')
      wrap.className = 'photo-wrap'
      const parent = elements.photoEl.parentNode
      if(parent) parent.replaceChild(wrap, elements.photoEl)
      wrap.appendChild(elements.photoEl)
    }
    // ensure wrapper has positioning so absolute children align correctly
    try{ wrap.style.position = wrap.style.position || 'relative' }catch(e){}
    // don't add duplicate
    if(wrap.querySelector(`img.accessory.${id}`)) return
    const img = document.createElement('img')
    img.className = `accessory ${id}`
    img.alt = id
    img.src = `assets/accessories/${id}.svg`
    // apply inline positioning as a robust fallback so CSS mismatches don't leave the image in normal flow
    try{
      img.style.position = 'absolute'
      img.style.pointerEvents = 'none'
      img.style.zIndex = '999'
      img.style.display = 'block'
      // per-accessory positioning defaults (can be overridden by CSS)
      const pos = {
        glasses: { left: '50%', top: '48%', width: '75px', transform: 'translate(-50%,-50%)' },
        hat: { left: '48%', top: '-9%', width: '130px', transform: 'translate(-50%,0)' },
        beard: { left: '50%', top: '21%', width: '140px', transform: 'translate(-50%,0)' },
        earing: { left: '66%', top: '65%', width: '70px', transform: 'translate(-50%,-50%)' }
      }[id] || { left: '50%', top: '50%', width: '140px', transform: 'translate(-50%,-50%)' }
      img.style.left = pos.left
      img.style.top = pos.top
      img.style.width = pos.width
      img.style.transform = pos.transform
    }catch(e){}
    wrap.appendChild(img)
    // track in state so other code can check
    state.accessories = state.accessories || {}
    state.accessories[id] = true
  }catch(e){}
}
// expose globally for shop module
try{ window.showAccessory = showAccessory }catch(e){}

function updateScore(){
  if(elements.balanceAmount) elements.balanceAmount.textContent = `${state.balance} $`
  if(elements.shopBalance) elements.shopBalance.textContent = `${state.balance} $`
  // if the shop is open, refresh it so buy buttons enable/disable correctly
  try{
    if(shopApi && typeof shopApi.refresh === 'function' && elements.shopModal && elements.shopModal.getAttribute('aria-hidden') === 'false'){
      shopApi.refresh()
    }
  }catch(err){}
  // evaluate achievements after any balance change
  try{ if(achievementsApi && typeof achievementsApi.checkAchievements === 'function') achievementsApi.checkAchievements(currentRate) }catch(e){}
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
    } else if(elements.balanceEl){
      const rect = elements.balanceEl.getBoundingClientRect()
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
// Track targets we already credited on pointerdown to avoid double-counting click
const creditedOnPointer = new WeakSet()

// Give money when user presses (pointerdown) on a disabled section button
document.addEventListener('pointerdown', (e)=>{
  try{
    // Try to find a disabled .answerBtn target. Some browsers (Firefox) don't dispatch
    // pointer events for disabled form controls in the usual way, so fall back to
    // hit-testing at the pointer coordinates if needed.
    let btn = e.target && e.target.closest ? e.target.closest('.answerBtn') : null
    if(!btn && typeof e.clientX === 'number' && typeof e.clientY === 'number'){
      try{
        const hit = document.elementFromPoint(e.clientX, e.clientY)
        btn = hit && hit.closest ? hit.closest('.answerBtn') : null
      }catch(_){ btn = null }
    }
    if(btn && btn.hasAttribute && btn.hasAttribute('disabled')){
      const power = Number(state.clickPower || 1)
      state.balance += power
      if(typeof recordEvent === 'function') recordEvent(power)
      updateScore()
      const cx = (typeof e.clientX === 'number') ? e.clientX : null
      const cy = (typeof e.clientY === 'number') ? e.clientY : null
      try{ spawnFloating(power, cx, cy) }catch(_){ }
      // mark so click handler doesn't double-credit
      try{ creditedOnPointer.add(btn) }catch(_){ }
    }
  }catch(err){}
}, { capture: true })

// General click handler: skip if we already credited the pressed disabled button
document.addEventListener('click', (e)=>{
  try{
    const btn = e.target && e.target.closest ? e.target.closest('.answerBtn') : null
    if(btn && creditedOnPointer.has(btn)){
      try{ creditedOnPointer.delete(btn) }catch(_){ }
      return
    }
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


// Initialize achievements manager (wires its own modal events)
const achievementsApi = initAchievements({
  achievementsPanel: elements.achievementsPanel,
  achievementsButton: elements.achievementsButton,
  achievementsModal: elements.achievementsModal,
  achBody: elements.achBody,
  achClose: elements.achClose,
  balanceEl: elements.balanceEl,
  shopButton: elements.shopButton
}, state, data, updateScore, recordEvent)

// expose achievements API globally so small UI helpers can unlock achievements
try{ window.achievementsApi = achievementsApi }catch(e){}

const shopApi = initShop({
  shopButton: elements.shopButton,
  shopModal: elements.shopModal,
  shopBody: elements.shopBody,
  shopClose: elements.shopClose,
  shopBalance: elements.shopBalance
}, state, data, updateScore, recordEvent, (id)=>{ try{ if(achievementsApi && typeof achievementsApi.unlockAchievement === 'function') return achievementsApi.unlockAchievement(id) }catch(e){} })
// expose for other modules (achievements) to refresh shop when new items are added
window.shopApi = shopApi

// Auto-equip any accessories already purchased (useful after buying one)
try{
  const accessoryIds = ['glasses','hat','beard','earing']
  ;(data.shop || []).forEach(it=>{
    try{
      if(accessoryIds.includes(it.id) && (it.purchased || (state.accessories && state.accessories[it.id]))){
        try{ showAccessory(it.id) }catch(e){}
      }
    }catch(e){}
  })
}catch(e){}



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
