import gsap from 'gsap'

const appearAnim = (delay, isHome) => {
  const tl = gsap
    .timeline({ defaults: { opacity: 0, duration: 1 } })
    .from('.animate', { yPercent: 15, delay }, 0)
    .from(
      '.animatePic',
      { scale: 0.69, transformOrigin: '50% 87.5%', delay },
      1
    )

  if (isHome) {
    tl.from('.animate2', { yPercent: 40, delay }, 0)
  }
}

export default appearAnim
