function random () {
  return Math.random() < 0.5 ? 'light' : ''
}

const inputVal = document.querySelector('input')


inputVal.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    restart()
  }
})

inputVal.value = 10

function restart () {
  const n = inputVal.value || 10

  const R = 200

  // 小圆的半径
  const r = Math.sqrt(2 * R * R * (1 - Math.cos(Math.PI / n)))

  const angle = 360 / n

  const container = document.querySelector('#app')

  const nodes = container.childNodes

  for (let i = nodes.length - 1; i >= 0; i--) {
    container.removeChild(nodes[i])
  }

  for (let i = 0; i < n; i++) {
    const span = document.createElement('span')
    span.style.width = 2 * r + 'px'
    span.style.height = 2 * r + 'px'
    console.log(angle * n)
    span.style.transform = `translate(-50%, -50%) rotate(${angle * i}deg) translateY(${R}px)`
    span.dataset.ball = i
    span.className = random()
    container.appendChild(span)
  }

  function getElem (idx) {
    const children = container.childNodes
    return children[idx]
  }

  function checkLightOn (idx) {
    return getElem(idx).className === 'light'
  }

  function toggleLight (idx) {
    getElem(idx).toggle('light')
  }

  container.onclick = e => {
    const { target } = e

    if (target.dataset.ball !== undefined) {
      // 开始变了
      target.classList.toggle('light')
      const children = container.childNodes
      const idx = parseInt(target.dataset.ball)
      const last = idx == 0 ? n - 1 : idx - 1
      const next = idx == n - 1 ? 0 : idx + 1

      const lastEle = children[last]
      const nextEle = children[next]

      lastEle.classList.toggle('light')
      nextEle.classList.toggle('light')

      checkWin()
    }
  }

  function checkWin () {
    // TODO: 校验胜利
  }
}

restart()