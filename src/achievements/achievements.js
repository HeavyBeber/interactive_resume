// Achievements manager: handles checking, unlocking, rendering and toasts
export function initAchievements(elements = {}, state, data, updateScore, recordEvent){
  const { achievementsPanel, achievementsButton, achievementsModal, achBody, achClose } = elements

  function showAchievementToast(title, desc){
    try{
      const panel = achievementsPanel
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
      // spawn confetti around this toast for a celebratory effect
      try{ spawnConfetti(el, 20) }catch(e){}
      // persistent: do not auto-remove
    }catch(e){ }
  }

  function renderAchievements(){
    try{
      let body = achBody
      // fallback: if the achBody reference is missing (DOM was reflowed), try to find it inside the modal or document
      if(!body){
        try{ body = (achievementsModal && achievementsModal.querySelector && achievementsModal.querySelector('#achBody')) || document.getElementById('achBody') }catch(e){}
      }
      if(!body) return
      // ensure progress bar exists above the list
      ensureProgressContainer()
      body.innerHTML = ''
      const achs = (data.achievements || [])
      if(!achs.length){ body.textContent = 'No achievements defined.'; return }
      // update progress bar before listing
      renderProgress()
      achs.forEach(a=>{
        const row = document.createElement('div')
        row.className = 'achievement-item'
        row.dataset.id = a.id
        const status = document.createElement('div')
        status.className = 'achievement-status'
        status.textContent = a.unlocked ? '✓' : '🔒'
        const meta = document.createElement('div')
        meta.className = 'achievement-meta'
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

    // Animate a recently unlocked achievement row (pulse/glow)
    function animateUnlocked(id){
      try{
        if(!achievementsModal) return
        const dialog = achievementsModal.querySelector('.shop-dialog')
        if(!dialog) return
        const body = dialog.querySelector('#achBody')
        if(!body) return
        const row = body.querySelector(`[data-id="${id}"]`)
        if(!row) return
        row.classList.add('ach-unlocked')
        try{ spawnConfetti(row, 12) }catch(e){}
        // remove the class after animation completes
        setTimeout(()=>{ try{ row.classList.remove('ach-unlocked') }catch(e){} }, 1200)
      }catch(e){}
    }

  // Lightweight confetti burst positioned around a target element
  function spawnConfetti(targetEl, count){
    try{
      if(!targetEl) return
      if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const rect = targetEl.getBoundingClientRect()
      const container = document.createElement('div')
      container.className = 'confetti-container'
      // position container at target center using fixed coordinates
      container.style.left = (rect.left + rect.width/2) + 'px'
      container.style.top = (rect.top + rect.height/2) + 'px'
      document.body.appendChild(container)
      const colors = ['#ffd77a','#ffd9b3','#ffb86b','#ffd1a6','#fff08a','#ffb3c1']
      const pieces = Math.max(6, Math.min(28, Number(count) || 16))
      for(let i=0;i<pieces;i++){
        const p = document.createElement('div')
        p.className = 'confetti-piece'
        const w = 6 + Math.round(Math.random()*8)
        const h = 8 + Math.round(Math.random()*12)
        p.style.width = w + 'px'
        p.style.height = h + 'px'
        p.style.background = colors[Math.floor(Math.random()*colors.length)]
        const tx = Math.round((Math.random()-0.5)*360) + 'px'
        const ty = Math.round(-120 - Math.random()*360) + 'px'
        const rot = Math.round((Math.random()*720)-360) + 'deg'
        const delay = Math.round(Math.random()*140)
        const dur = 700 + Math.round(Math.random()*900)
        p.style.setProperty('--tx', tx)
        p.style.setProperty('--ty', ty)
        p.style.setProperty('--rot', rot)
        p.style.animation = `confettiFlight ${dur}ms cubic-bezier(.16,.9,.3,1) ${delay}ms forwards`
        container.appendChild(p)
      }
      // cleanup after animations finish
      setTimeout(()=>{ try{ container.remove() }catch(e){} }, 3200)
    }catch(e){}
  }

  function computeProgress(){
    try{
      const achs = data.achievements || []
      const total = achs.length || 0
      const unlocked = achs.filter(a=>a.unlocked).length
      const pct = total ? Math.round((unlocked/total)*100) : 0
      return { total, unlocked, pct }
    }catch(e){ return { total:0, unlocked:0, pct:0 } }
  }

  // Create or ensure a progress container inside the modal dialog
  function ensureProgressContainer(){
    try{
      if(!achievementsModal) return
      const dialog = achievementsModal.querySelector('.shop-dialog')
      if(!dialog) return
      let pc = dialog.querySelector('.ach-progress-wrap')
      if(!pc){
        pc = document.createElement('div')
        pc.className = 'ach-progress-wrap'
        pc.setAttribute('aria-hidden','false')
        // insert after header if present
        const header = dialog.querySelector('.shop-header')
        if(header && header.parentNode) header.parentNode.insertBefore(pc, header.nextSibling)
        else dialog.insertBefore(pc, dialog.firstChild)
      }
      return pc
    }catch(e){}
  }

  function renderProgress(){
    try{
      const pc = ensureProgressContainer()
      if(!pc) return
      const { total, unlocked, pct } = computeProgress()
      pc.innerHTML = ''
      const row = document.createElement('div')
      row.className = 'ach-progress'
      const bar = document.createElement('div')
      bar.className = 'ach-progress-bar'
      const fill = document.createElement('div')
      fill.className = 'ach-progress-fill'
      fill.style.width = pct + '%'
      bar.appendChild(fill)
      // overlay text on top of the bar: left = Unlocked, right = (pct%)
      const overlay = document.createElement('div')
      overlay.className = 'ach-progress-overlay'
      const left = document.createElement('div')
      left.className = 'ach-progress-left'
      left.textContent = `Unlocked: ${unlocked}/${total}`
      const right = document.createElement('div')
      right.className = 'ach-progress-right'
      right.textContent = `(${pct}%)`
      overlay.appendChild(left)
      overlay.appendChild(right)
      row.appendChild(bar)
      row.appendChild(overlay)
      pc.appendChild(row)
      // If player has unlocked at least 80% of achievements, reveal the About section (one-time)
      try{
        if(pct >= 80){
          // only reveal once
          if(!data._aboutRevealed){
            data._aboutRevealed = true
            // add an About option to the main options list if not present
            try{
              const exists = (data.options || []).some(o=>o.id==='about')
              if(!exists) (data.options = data.options || []).push({ id: 'about', label: 'About' })
            }catch(e){}
            // add a quick hero button if present
            try{
              const hero = document.getElementById('hero')
              if(hero){
                const choices = hero.querySelector('.hero-choices')
                if(choices && !choices.querySelector('[data-id="about-btn"]')){
                  const btn = document.createElement('button')
                  btn.className = 'answerBtn'
                  btn.type = 'button'
                  btn.dataset.id = 'about-btn'
                  btn.textContent = 'About Me'
                  btn.addEventListener('click', ()=>{ try{ window.showContent && window.showContent('about') }catch(e){} })
                  choices.appendChild(btn)
                }
              }
            }catch(e){}
          }
        }
      }catch(e){}
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
          const sp = document.getElementById('skillsPanel')
          if(sp){ sp.classList.remove('hidden') }
        }
      })
        showAchievementToast(ach.title, ach.desc)
          try{ 
            // special-case: when full_auto_mode unlocks, add extra shop items
            if(id === 'full_auto_mode'){
              try{
                const existing = (data.shop || []).map(s=>s.id)
                const extras = [
                  { id: 'unlock_experience', name: 'Experience', cost: 300, desc: 'Enables Experience section', repeatable: false, unlocks: ['experience'] },
                  { id: 'unlock_education', name: 'Education', cost: 300, desc: 'Enables Education section', repeatable: false, unlocks: ['education'] },
                  { id: 'unlock_contact', name: 'Contact', cost: 300, desc: 'Enables Contact section', repeatable: false, unlocks: ['contact'] }
                ]
                extras.forEach(x=>{ if(!existing.includes(x.id)) (data.shop = data.shop || []).push(x) })
                // if shop API is available globally, refresh the UI
                try{ if(window && window.shopApi && typeof window.shopApi.refresh === 'function') window.shopApi.refresh() }catch(e){}
              }catch(e){}
            }
            // when the player clicks the photo 10 times, add accessory shop items
            if(id === 'click_face_10'){
              try{
                const existing = (data.shop || []).map(s=>s.id)
                const accessories = [
                  { id: 'glasses', name: 'Stylish glasses', cost: 50, desc: 'Stylish glasses', repeatable: false },
                  { id: 'hat', name: 'Fancy hat', cost: 50, desc: 'A fancy hat', repeatable: false },
                  { id: 'beard', name: 'Distinguished beard', cost: 50, desc: 'A distinguished beard', repeatable: false },
                  { id: 'earing', name: 'Subtle earing', cost: 50, desc: 'A subtle earing', repeatable: false }
                ]
                accessories.forEach(x=>{ if(!existing.includes(x.id)) (data.shop = data.shop || []).push(x) })
                try{ if(window && window.shopApi && typeof window.shopApi.refresh === 'function') window.shopApi.refresh() }catch(e){}
              }catch(e){}
            }
            renderProgress(); 
            if(achievementsModal && achievementsModal.getAttribute('aria-hidden') === 'false'){ 
              renderAchievements(); 
              animateUnlocked(id); // Call animateUnlocked after rendering achievements
            } 
          }catch(e){}
    }catch(e){}
  }

  function checkAchievements(currentRate){
    try{
      const achs = data.achievements || []
      const first = achs.find(a=>a.id==='first_earned')
      if(first && !first.unlocked){ if(state.balance > 0) unlockAchievement('first_earned') }
      const second = achs.find(a=>a.id==='idle_or_resume')
      if(second && !second.unlocked){ if(state.balance >= 5) unlockAchievement('idle_or_resume') }
      const rateAch = achs.find(a=>a.id==='rate_50')
      try{ const r = Number(currentRate || 0); if(rateAch && !rateAch.unlocked && r >= 50){ unlockAchievement('rate_50') } }catch(e){}
    }catch(e){}
  }

  // Wire modal open/close and render on demand
  if(achievementsButton){
    achievementsButton.addEventListener('click', ()=>{
      try{ if(achievementsModal) achievementsModal.setAttribute('aria-hidden','false') }catch(e){}
      renderAchievements()
    })
  }
  if(achClose){
    achClose.addEventListener('click', ()=>{ try{ if(achievementsModal) achievementsModal.setAttribute('aria-hidden','true') }catch(e){} })
  }
  if(achievementsModal){
    achievementsModal.addEventListener('click', (ev)=>{
      try{
        const t = ev.target
        if(t && t.dataset && t.dataset.close === 'overlay'){
          achievementsModal.setAttribute('aria-hidden','true')
        }
      }catch(e){}
    })
  }

  // Konami code listener: unlocks a secret achievement when user types the sequence
  try{
    const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let konamiPos = 0
    window.addEventListener('keydown', (ev)=>{
      try{
        // ignore input fields and editable regions so typing doesn't trigger it accidentally
        const tgt = ev.target || {}
        const tag = (tgt.tagName || '').toUpperCase()
        if(tag === 'INPUT' || tag === 'TEXTAREA' || tgt.isContentEditable) return
        const expected = konamiSeq[konamiPos]
        const pressed = ev.key
        let match = false
        if(expected && expected.startsWith('Arrow')){
          match = (pressed === expected)
        } else {
          match = (String(pressed || '').toLowerCase() === String(expected || '').toLowerCase())
        }
        if(match){
          konamiPos++
          if(konamiPos >= konamiSeq.length){
            try{ unlockAchievement('konami_code') }catch(e){}
            konamiPos = 0
          }
        } else {
          // reset to 0 or to 1 if the key matches the first in sequence
          const first = konamiSeq[0]
          if(first && ((first.startsWith && first.startsWith('Arrow') && pressed === first) || String(pressed||'').toLowerCase() === String(first||'').toLowerCase())) konamiPos = 1
          else konamiPos = 0
        }
      }catch(e){}
    })
  }catch(e){}

  // render initial progress (if modal is present)
  try{ renderProgress() }catch(e){}

  // Return public API
  return { unlockAchievement, checkAchievements, renderAchievements, showAchievementToast }
}
