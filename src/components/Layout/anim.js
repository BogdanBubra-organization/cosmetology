import gsap from 'gsap'

const appearAnim = () => {
  gsap
    .timeline({ defaults: { opacity: 0, duration: 1 } })
    .from('.animate', { yPercent: 15, delay: 2 }, 0)
    .from('.animate2', { yPercent: 40 }, '<')
    .from('.animatePic', { scale: 0.69, transformOrigin: '50% 87.5%' }, '>')
}

export default appearAnim
