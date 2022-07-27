import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const getDir = (direction) => {
  switch (direction) {
    case 'top':
      return { yPercent: -20 }

    case 'bottom':
      return { yPercent: 20 }

    case 'left':
      return { xPercent: -20 }

    case 'right':
      return { xPercent: 20 }

    default:
      return null
  }
}

const appearAnim = ({ id }) => {
  const staggerArray = document.querySelectorAll(`[data-array="${id}"]`)
  const elArray = document.querySelectorAll(`[data-appear="${id}"]`)

  const tl = gsap.timeline({
    delay: id === 'hero' || id === 'header' ? 0.5 : 0,
    defaults: {
      opacity: 0,
      duration: id === 'hero' || id === 'header' ? 1.5 : 0.8,
      ease: 'power1.inOut',
    },
  })

  if (staggerArray.length) {
    staggerArray.forEach(({ dataset, childNodes }) => {
      tl.from(
        id === 'gallery' ? '.swiper-slide' : childNodes,
        { stagger: 0.2, ...getDir(dataset.direction) },
        id === 'hero' ? 0.8 : 0
      ).set(childNodes, { clearProps: true })
    })
  }

  if (elArray.length) {
    ;[...elArray].forEach((el) => {
      const dir = el.getAttribute('data-direction')
      tl.from(el, { ...getDir(dir) }, 0).set(el, { clearProps: true })
    })
  }

  ScrollTrigger.create({
    trigger: `#${id}`,
    start: '25% 75%',
    animation: tl,
    markers: process.env.CF_PAGES_BRANCH !== 'master',
  })
}

const resetAnim = () => {
  const sTList = ScrollTrigger.getAll()
  if (sTList.length) {
    const staggerArray = document.querySelectorAll(`[data-array]`)
    const elArray = document.querySelectorAll(`[data-appear]`)

    gsap.set([elArray, '.swiper-slide'], {
      clearProps: true,
    })
    staggerArray.forEach(({ childNodes }) =>
      gsap.set(childNodes, {
        clearProps: true,
      })
    )
    sTList.forEach((t) => t.kill(false))
  }
}

export { appearAnim, resetAnim }
