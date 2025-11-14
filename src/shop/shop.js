// Shop module: initialize shop UI and wire purchase logic
export function initShop(elements = {}, state, data, updateScore, recordEvent, onUnlock){
  const { shopButton, shopModal, shopBody, shopClose, shopBalance } = elements
  let autoInterval = null

  function openShop(){
    if(!shopModal) return
    shopModal.setAttribute('aria-hidden','false')
    renderShop()
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
      // compute owned quantity (some items track count on the item, others in state)
      const owned = (it._count || 0) || ((it.id === 'auto_clicker') ? (state.autoClickers || 0) : 0)
      // show owned qty only for repeatable items; one-time purchases shouldn't show a counter
      const qtyHtml = (it.repeatable ? ` <span class="item-qty">(${owned})</span>` : '')
      // for one-time purchases, show a check mark if purchased
      const checkHtml = (!it.repeatable && it.purchased) ? ` <span class="item-check">✓</span>` : ''
      // button label: show 'Purchased' for non-repeatable items that are already bought, otherwise show the current cost
      const btnLabel = (!it.repeatable && it.purchased) ? 'Purchased' : `${it.cost} $`
      // show button (label now displays price); descriptions removed per request
      card.innerHTML = `<div><div class="item-name">${it.name}${qtyHtml}${checkHtml}</div></div><div class="item-footer"><div class="purchase-msg" data-item="msg-${it.id}"></div><div><button class="buy-btn" data-item="${it.id}" aria-label="Buy ${it.name} for ${it.cost} dollars">${btnLabel}</button></div></div>`
      shopBody.appendChild(card)
      const btn = card.querySelector('button.buy-btn')
      const msg = card.querySelector('[data-item^="msg-"]')
      // disable if not repeatable and already purchased? We will manage button state after purchase
      if(btn){
        // initial disabled state if not enough funds or item already purchased (non-repeatable)
        const cannotAfford = typeof state.balance === 'number' ? state.balance < it.cost : false
        const alreadyBought = Boolean(it.purchased && !it.repeatable)
        btn.disabled = cannotAfford || alreadyBought
        btn.setAttribute('aria-disabled', String(btn.disabled))

        btn.addEventListener('click', ()=>{
          // guard: avoid handling clicks when disabled
          if(btn.disabled) return
          const success = buyItem(it.id)
          if(success){
            if(msg){ msg.textContent = 'Purchased ✓'; msg.style.color = 'var(--accent-2)'}
            // If item is repeatable, update its cost and re-render so new cost is visible
            if(it.repeatable){
              // allow different growth rules per item
              if(it.id === 'auto_clicker'){
                // increases by 30% on each buy
                it.cost = Math.ceil(it.cost * 1.3)
              } else if(it.id === 'click_booster'){
                // increases by 50%
                it.cost = Math.ceil(it.cost * 1.5)
              } else {
                it.cost = Math.ceil(it.cost * 1.5)
              }
              // update balance shown
              if(shopBalance) shopBalance.textContent = String(state.balance)
              // re-render to update costs and button states
              renderShop()
            } else {
              // non-repeatable: mark purchased and disable buttons
              it.purchased = true
              btn.disabled = true
              btn.setAttribute('aria-disabled', 'true')
              // re-render so UI reflects the purchased state and owned quantity
              renderShop()
            }
          } else {
            if(msg){ msg.textContent = 'Not enough points'; msg.style.color = 'var(--muted)'}
          }
          setTimeout(()=>{ if(msg) msg.textContent = '' },1600)
        })
      }
    })
  }

  // expose a refresh helper so external code can re-evaluate button states
  function refresh(){
    // if the modal isn't rendered/no body, nothing to do
    if(!shopBody) return
    renderShop()
  }

  function buyItem(id){
    const item = (data.shop || []).find(s=>s.id===id)
    if(!item) return false
    if(state.balance >= item.cost){
      state.balance -= item.cost
      // apply special effects for certain items
      if(item.id === 'click_booster'){
        if(typeof state.clickPower !== 'number') state.clickPower = 1
        state.clickPower = Number(state.clickPower) + 1
        // track count of click boosters purchased (stored on the shop item)
        item._count = (item._count || 0) + 1
        // if player bought 5 boosters, notify via callback or mutate achievement
        if(item._count >= 5){
          try{
            if(typeof onUnlock === 'function') onUnlock('buy_5_boosters')
            else {
              const ach = (data.achievements || []).find(a=>a.id==='buy_5_boosters')
              if(ach) ach.unlocked = true
            }
          }catch(e){}
        }
      }
      if(item.id === 'auto_clicker'){
        state.autoClickers = (state.autoClickers || 0) + 1
        // track count of auto clickers purchased
        item._count = (item._count || 0) + 1
        if(item._count >= 5){
          try{
            if(typeof onUnlock === 'function') onUnlock('full_auto_mode')
            else {
              const ach = (data.achievements || []).find(a=>a.id==='full_auto_mode')
              if(ach) ach.unlocked = true
            }
          }catch(e){}
        }
        // start interval if not already running
        if(!autoInterval){
          autoInterval = setInterval(()=>{
            try{
              const n = Number(state.autoClickers || 0)
              const power = Number(state.clickPower || 1)
              if(n > 0){
                const gained = (power * n)
                state.balance += gained
                if(typeof updateScore === 'function') updateScore()
                if(typeof recordEvent === 'function') recordEvent(gained)
              }
            }catch(e){}
          }, 1000)
        }
      }
      // special: open a youtube video when purchasing the demo/showreel
      if(item.id === 'video_demo'){
        try{
          const url = item.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          // open in new tab/window — this is invoked from a user click so should not be blocked
          window.open(url, '_blank', 'noopener')
        }catch(e){}
      }
      // generic unlocks support: items may specify `unlocks` array of section ids
      try{
        if(item.unlocks && Array.isArray(item.unlocks)){
          item.unlocks.forEach(u=>{
            try{
              // try to find a hero quick-button that triggers this section
              const btn = document.querySelector(`[onclick="showContent('${u}')"]`) || document.querySelector(`[data-section="${u}"]`)
              if(btn){
                try{ btn.removeAttribute('disabled'); btn.setAttribute('aria-disabled','false') }catch(e){}
                try{ btn.classList.remove('hidden') }catch(e){}
              }
              // also try to show a section or panel by id
              const el = document.getElementById(u)
              if(el) el.classList.remove('hidden')
            }catch(e){}
          })
        }
      }catch(e){}
      // award an achievement on purchase if the item configures one
      try{
        if(item.awardAchievement){
          try{
            if(typeof onUnlock === 'function') onUnlock(item.awardAchievement)
            else {
              const ach = (data.achievements || []).find(a=>a.id===item.awardAchievement)
              if(ach) ach.unlocked = true
            }
          }catch(e){}
        }
      }catch(e){}
      // if this purchase is an accessory, ask the global helper to show it
      try{
        const accessoryIds = ['glasses','hat','beard','earing']
        if(accessoryIds.includes(item.id)){
          try{ if(typeof window.showAccessory === 'function') window.showAccessory(item.id) }catch(e){}
        }
      }catch(e){}
      if(typeof updateScore === 'function') updateScore()
      if(shopBalance) shopBalance.textContent = String(state.balance)
      // re-render shop so purchased/non-repeatable state and counts update
      try{ renderShop() }catch(e){}
      return true
    }
    return false
  }

  if(shopButton) shopButton.addEventListener('click', openShop)
  if(shopClose) shopClose.addEventListener('click', closeShop)
  if(shopModal){
    shopModal.addEventListener('click', (e)=>{
      if(e.target && e.target.dataset && e.target.dataset.close === 'overlay') closeShop()
    })
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeShop() })
  }

  if(shopBalance) shopBalance.textContent = String(state.balance)

  return { openShop, closeShop, buyItem, refresh }
}
