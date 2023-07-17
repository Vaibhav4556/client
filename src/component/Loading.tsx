import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
function Loading() {
  return (
    <div className="container">
    <Player
      style={{ width: "200px", height: "100px" }}
      src="https://lottie.host/c3e8e1e3-bb15-4e0c-b4ea-7109ea84df5c/Y0iii0QbUO.json"
      className="player"
      loop
      autoplay
    />
  </div>
  )
}

export default Loading