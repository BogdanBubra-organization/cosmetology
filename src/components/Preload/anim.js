import gsap from 'gsap'

const appearAnim = () => {
  gsap
    .timeline({ delay: 1, defaults: { opacity: 0, duration: 1 } })
    .from('.animate', { yPercent: 15, clearProps: true }, 0)
    .set('.animate', { clearProps: true }, 1)
    .from('.animatePic', { scale: 0.69, transformOrigin: '50% 87.5%' }, 1)
}

export default appearAnim
