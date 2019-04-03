import React, { useState, useRef, useEffect } from "react"
import classnames from "classnames"

const FadeInImage = ({ username, src }) => {
  const containerRef = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      if (containerRef.current.getBoundingClientRect().y < window.innerHeight * 0.6) {
        setVisible(true)
      }
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  })

  return (
    <div ref={containerRef}>
      <img src={src} alt={username} className={classnames(visible && "visible")} />
      <style jsx>{`
        img {
          width: auto;
          max-width: 100%;
          max-height: 90vh;
          opacity: 0;
          transform: translateY(6rem);
          transition: 1s;
        }

        .visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default FadeInImage
