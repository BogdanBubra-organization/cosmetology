import gsap from 'gsap'

const heroAnim = ({ pic, line }) => {
  gsap
    .timeline({ delay: 1.5, defaults: { ease: 'power1.inOut' } })
    .set(line, { yPercent: 10 }, 0)
    .from([pic, line], { autoAlpha: 0, duration: 0.5 }, 0)
    .to(pic, { rotate: '-=15', duration: 0.8 }, 0)
    .fromTo(line, { rotate: 40 }, { rotate: 20, duration: 0.8 }, 0)
    .to(pic, { rotate: '+=15', duration: 2.5 }, 0.8)
    .to(line, { yPercent: 0, rotate: '-=20', duration: 2.5 }, 0.8)
    .set([pic, line], { clearProps: true })
}

export default heroAnim
