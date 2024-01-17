import React, {useRef, useEffect} from 'react'

const VideoPlayer = ({videoId, main}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
          // video.play();
          // video.pause();
          // video.removeAttribute('src');
          video.load();
        }
    });

    // if (main == true) {
    //   return (
    //     <video ref={videoRef} width='640' height='480' controls autoPlay>
    //       <source src={`http://localhost:3000/videos/${videoId}`} type='video/mp4'></source>
    //       Your browser does not support the video tag
    //     </video>
    //   )
    // } else {
    //   return (
    //     <video ref={videoRef} width='320' height='240' autoPlay>
    //       <source src={`http://localhost:3000/videos/${videoId}`} type='video/mp4'></source>
    //       Your browser does not support the video tag
    //     </video>
    //   )
    // }

    return (
      <video 
        ref={videoRef} 
        width={main ? '640': '320'} 
        height={main ? '480': '240'} 
        autoPlay
        preload='auto'
        muted
      >
        <source src={`http://localhost:3000/videos/${videoId}`} type='video/mp4'></source>
        Your browser does not support the video tag
      </video>
    )
}

export default VideoPlayer;