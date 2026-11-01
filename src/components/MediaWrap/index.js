import React, { useEffect, useRef, useState } from 'react'
import { useSwiperSlide } from 'swiper/react'
import cn from 'classnames'
import * as s from './MediaWrap.module.scss'

const MediaWrap = ({ media, isProduct, preview = false, children }) => {
  const [started, setStarted] = useState(false)
  const videoRef = useRef(null)
  const slide = useSwiperSlide()
  const active = slide?.isActive ?? true

  useEffect(() => {
    if (started) videoRef.current?.play()?.catch(() => {})
  }, [started])

  useEffect(() => {
    if (!active) videoRef.current?.pause()
  }, [active])

  if (!media?.video) return children

  const poster = media.video.thumbnailUrl

  return (
    <div className={cn(s.media, { [s.product]: isProduct })}>
      {preview ? (
        <>
          {poster && (
            <img
              className={s.poster}
              src={poster}
              width={media.width}
              height={media.height}
              alt="Відео результату процедури"
              loading="lazy"
            />
          )}
          <span className={s.play} aria-hidden="true">
            <span className={s.playIcon}>▶</span>
          </span>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={started ? media.url : undefined}
            poster={poster}
            width={media.width}
            height={media.height}
            controls={started && active}
            preload="none"
            playsInline
            muted
            aria-label="Відео результату процедури"
          />
          {!started && (
            <button
              className={s.play}
              type="button"
              aria-label="Відтворити відео"
              tabIndex={active ? 0 : -1}
              onClick={() => setStarted(true)}
            >
              <span className={s.playIcon} aria-hidden="true">
                ▶
              </span>
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default MediaWrap
