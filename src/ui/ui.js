// UI rendering helpers
import { data } from '../data/data.js'
export function renderSkills(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'skills-wrap'
  // Backwards compatible: if list is an array, render as before
  if(Array.isArray(list)){
    wrap.innerHTML = list.map(s=>`<span class="skill">${s}</span>`).join('')
    container.appendChild(wrap)
    return
  }
  // If list is an object of sections, render headings + skills
  if(list && typeof list === 'object'){
    Object.keys(list).forEach(section => {
      const items = Array.isArray(list[section]) ? list[section] : []
      const group = document.createElement('div')
      // assign an id so the toggle button can reference it (aria-controls)
      const id = `skills-${section.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')}`
      group.className = 'skills-section collapsed'
      group.id = id
      group.innerHTML = items.map(s=>`<span class="skill">${s}</span>`).join('')

      const header = document.createElement('div')
      header.className = 'skills-section-header'
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'skills-section-toggle'
      btn.setAttribute('aria-expanded','false')
      btn.setAttribute('aria-controls', id)
      btn.textContent = section
      // toggle collapsed state
      btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true'
        btn.setAttribute('aria-expanded', String(!expanded))
        if(expanded) group.classList.add('collapsed')
        else group.classList.remove('collapsed')
      })
      header.appendChild(btn)
      wrap.appendChild(header)
      wrap.appendChild(group)
    })
  }
  container.appendChild(wrap)
}

export function renderExperience(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'timeline'
  list.forEach(item=>{
    const card = document.createElement('article')
    card.className = 'exp-card'
    // make each card keyboard-focusable so hover/focus effects work for keyboard users
    card.setAttribute('tabindex','0')
    const logoHtml = item.logo ? `<img src="${item.logo}" alt="${item.company} logo" class="company-logo">` : ''
    card.innerHTML = `<div class="exp-head">${logoHtml}<div class="exp-meta"><h3>${item.role}</h3><p class="muted">${item.company} · ${item.range}</p></div></div><ul>${item.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`
    wrap.appendChild(card)
  })
  container.appendChild(wrap)
}

export function renderProjects(container, list){
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

export function renderEducation(container, list){
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

export function renderContact(container, obj){
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
      // render phone with digits masked (except the prefix +336). Clicking a * reveals the digit.
      const phoneRaw = String(obj.phone || '')
      // find positions of the sequence '+336' in the original string (match '+' then '3','3','6' in order)
      const keepSeq = ['+', '3', '3', '6']
      const keepPos = new Set()
      let k = 0
      for(let i=0;i<phoneRaw.length && k<keepSeq.length;i++){
        if(phoneRaw[i] === keepSeq[k]){ keepPos.add(i); k++ }
      }
      // If the reveal_phone achievement is already unlocked, don't mask digits anymore
      const revealUnlocked = !!(data && data.achievements && data.achievements.find(a=>a.id==='reveal_phone' && a.unlocked))
      // build HTML: non-digits stay as-is; digits not in keepPos become clickable masked spans unless already unlocked
      let html = ''
      for(let i=0;i<phoneRaw.length;i++){
        const ch = phoneRaw[i]
        if(/\d/.test(ch)){
          if(keepPos.has(i) || revealUnlocked){
            html += `<span class="contact-digit">${ch}</span>`
          } else {
            html += `<span class="masked-digit" data-digit="${ch}" role="button" aria-label="Reveal digit">*</span>`
          }
        } else {
          // keep characters like +, whitespace, parentheses
          html += `<span class="contact-char">${ch}</span>`
        }
      }
      row.innerHTML = `<div><strong>Phone</strong></div><div class="year contact-phone">${html}</div>`
      // add click handler via delegation to reveal masked digits (only needed if we actually masked anything)
      const hasMasked = row.querySelector('.masked-digit')
      if(hasMasked){
        row.addEventListener('click', (ev)=>{
        try{
          const t = ev.target
          if(t && t.classList && t.classList.contains('masked-digit')){
            const d = t.dataset && t.dataset.digit
            if(d){
              t.textContent = d; t.classList.remove('masked-digit'); t.classList.add('contact-digit'); t.removeAttribute('data-digit');
            }
            // if no masked digits remain, unlock the phone reveal achievement
            try{
              const anyLeft = row.querySelector('.masked-digit')
              if(!anyLeft && !row.dataset.revealed){
                row.dataset.revealed = 'true'
                try{ if(window && window.achievementsApi && typeof window.achievementsApi.unlockAchievement === 'function') window.achievementsApi.unlockAchievement('reveal_phone') }catch(e){}
              }
            }catch(e){}
          }
        }catch(e){}
        })
      }
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
