import './App.css';

import { useEffect, useState } from 'react';
import VideoPlayer from './Components/VideoPlayer';

function App() {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    setVideoId('earth');
  }, []);

  const playVideo = (videoId) => {
    setVideoId(videoId);
  }

  return (
    <div className="App">
      <div className="video_player--container">
        <div className="video_player--big">
          <VideoPlayer videoId={videoId ? videoId : 'earth'} main={true} />
        </div>
        <ul className="video_player--list">
          <li>
            <div onClick={() => playVideo('earth')}>
              <VideoPlayer videoId={'earth'} main={false} />
            </div>
          </li>
          <li>
            <div onClick={() => playVideo('ocean')}>
              <VideoPlayer videoId={'ocean'} main={false} />
            </div>
          </li>
          <li>
            <div onClick={() => playVideo('waves')}>
              <VideoPlayer videoId={'waves'} main={false} />
            </div>
          </li>
        </ul>
      </div>
      <button onClick={() => {playVideo('earth')}}>Play video 1</button>
      <button onClick={() => {playVideo('ocean')}}>Play video 2</button>
      <button onClick={() => {playVideo('waves')}}>Play video 3</button>
    </div>
  );
}

export default App;
