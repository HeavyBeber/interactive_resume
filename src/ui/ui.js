// UI rendering helpers
export function renderSkills(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'skills-wrap'
  wrap.innerHTML = list.map(s=>`<span class="skill">${s}</span>`).join('')
  container.appendChild(wrap)
}

export function renderExperience(container, list){
  const wrap = document.createElement('div')
  wrap.className = 'timeline'
  list.forEach(item=>{
    const card = document.createElement('article')
    card.className = 'exp-card'
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
