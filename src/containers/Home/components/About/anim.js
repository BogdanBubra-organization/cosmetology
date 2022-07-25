import gsap from 'gsap'

const floatingAnim = (pic) => {
  gsap
    .timeline({ repeat: -1, id: 'floatingPictureTl' })
    .to(pic, { yPercent: -5, duration: 4, ease: 'power1.out' }, 0)
    .to(pic, { yPercent: 5, duration: 8, ease: 'power1.inOut' })
    .to(pic, { yPercent: 0, duration: 4, ease: 'power1.in' })

  return () => gsap.set(pic, { clearProps: true })
}

const resetAnim = (pic) => {
  gsap.getById('floatingPictureTl')?.kill()
  gsap.set(pic, { clearProps: true })
}

export { floatingAnim, resetAnim }
