// Shop module: initialize shop UI and wire purchase logic
export function initShop(elements = {}, state, data, updateScore, recordEvent){
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
      // show current cost from item (may change for repeatable items)
      card.innerHTML = `<div><div class="item-name">${it.name}</div><div class="item-desc">${it.desc}</div></div><div class="item-footer"><div class="purchase-msg" data-item="msg-${it.id}"></div><div><strong>${it.cost} $</strong> <button class="buy-btn" data-item="${it.id}">Buy</button></div></div>`
      shopBody.appendChild(card)
      const btn = card.querySelector('button.buy-btn')
      const msg = card.querySelector('[data-item^="msg-"]')
      // disable if not repeatable and already purchased? We will manage button state after purchase
      if(btn){
        // initial disabled state if not enough funds or item already purchased (non-repeatable)
        const cannotAfford = typeof state.score === 'number' ? state.score < it.cost : false
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
              if(shopBalance) shopBalance.textContent = String(state.score)
              // re-render to update costs and button states
              renderShop()
            } else {
              // non-repeatable: mark purchased and disable buttons
              it.purchased = true
              btn.disabled = true
              btn.setAttribute('aria-disabled', 'true')
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
    if(state.score >= item.cost){
      state.score -= item.cost
      // apply special effects for certain items
      if(item.id === 'click_booster'){
        if(typeof state.clickPower !== 'number') state.clickPower = 1
        state.clickPower = Number(state.clickPower) + 1
      }
      if(item.id === 'auto_clicker'){
        state.autoClickers = (state.autoClickers || 0) + 1
        // start interval if not already running
        if(!autoInterval){
          autoInterval = setInterval(()=>{
            try{
              const n = Number(state.autoClickers || 0)
              const power = Number(state.clickPower || 1)
              if(n > 0){
                const gained = (power * n)
                state.score += gained
                if(typeof updateScore === 'function') updateScore()
                if(typeof recordEvent === 'function') recordEvent(gained)
              }
            }catch(e){}
          }, 1000)
        }
      }
      if(typeof updateScore === 'function') updateScore()
      if(shopBalance) shopBalance.textContent = String(state.score)
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

  if(shopBalance) shopBalance.textContent = String(state.score)

  return { openShop, closeShop, buyItem, refresh }
}
