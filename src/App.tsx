import { useState, useEffect, useRef } from 'react';
import './App.css';
import birthdayVideo from './assets/Disney.mp4';
import meAndDad from './assets/Me&Dad.jpg';
import gusGus from './assets/gus-gus.png';
// Make sure to add Drifter.jpg to your src/assets folder
import drifterImage from './assets/Drifter.jpg';

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideoPlaying) {
      const videoElement = videoRef.current;
      const handleVideoEnd = () => {
        setIsVideoPlaying(false);
        setIsContentLoaded(true); 
      };

      if (videoElement) {
        videoElement.addEventListener('ended', handleVideoEnd);
        videoElement.muted = false;
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error attempting to play video with sound:", error);
            setIsVideoPlaying(false);
            setIsContentLoaded(true);
          });
        }
        return () => { videoElement.removeEventListener('ended', handleVideoEnd); };
      }
    }
  }, [isVideoPlaying]);

  useEffect(() => {
    if (isContentLoaded) {
      document.body.classList.add('content-loaded');
    } else {
      document.body.classList.remove('content-loaded');
    }
  }, [isContentLoaded]);


  const handleStartExperience = () => {
    setShowStartScreen(false);
    setIsVideoPlaying(true);
  };

  return (
    <>
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {showStartScreen && (
        <div className="start-screen fade-in">
          <div className="start-content">
            <h1>Ready for a Magical Surprise?</h1>
            <button onClick={handleStartExperience} className="start-button">Click Here!</button>
          </div>
        </div>
      )}

      {isVideoPlaying && (
        <div className="video-container">
          <video ref={videoRef} className="intro-video" playsInline>
            <source src={birthdayVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isContentLoaded && (
        <main className="main-content">
          {/* Your Card */}
          <section className="card-section">
            <div className="virtual-card your-card">
              <div className="card-image-container">
                <img src={meAndDad} alt="A picture of you and your dad" className="card-image"/>
              </div>
              <div className="card-text-container">
                <p className="card-text">
                  Happy birthday dad! I love you so much! And you've always been the best dad ever and I love ur goofy side and ur loving side and everything about you! Youre an amazing dad happy birthday bud i love you!!!!! 
                  <br/><br/>- Alexander
                </p>
              </div>
            </div>
            <div className="scroll-indicator">
                <span>Scroll for more</span>
                <div className="arrow"></div>
            </div>
          </section>

          {/* Gus Gus's Card */}
          <section className="card-section">
            <div className="virtual-card gus-gus-card">
              <div className="card-text-container">
                 <p className="card-text">
                  AH! You scared me I almost knocked ya out! Anyways uh..uh....Happy Birfday!
                  <br/><br/>- Gus Gus
                </p>
              </div>
              <div className="card-image-container">
                <img src={gusGus} alt="A picture of Gus Gus" className="card-image"/>
              </div>
            </div>
             <div className="scroll-indicator">
                <span>Keep going...</span>
                <div className="arrow"></div>
            </div>
          </section>

          {/* Drifter's Card */}
           <section className="card-section">
            <div className="virtual-card drifter-card">
              <div className="card-image-container">
                <img 
                  src={drifterImage} 
                  alt="A picture of The Drifter from Destiny 2" 
                  className="card-image"
                  onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src="https://placehold.co/400x400/1a1a1a/c2f0c2?text=Drifter+is+on+the+field!\\nPlease+add+Drifter.jpg";
                  }}
                />
              </div>
              <div className="card-text-container">
                 <p className="card-text drifter-text">
                  Alright Alright Alright 47 huh? Thats great but we need u in that battlefield You're invading! Make a mess!!
                  <br/><br/>- Drifter
                </p>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default App;
