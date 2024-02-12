import { useEffect, useState } from "react";
import { format } from 'date-fns';
import logo from "./assets/10bedicu.webp";
import config from "./assets/config.json";

const calculateCountdown = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  } else {
    return {};
  }
};

const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState(calculateCountdown(targetDate));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(targetDate);
      setCountdown(newCountdown);
      setIsExpired(Object.keys(newCountdown).length === 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return { countdown, isExpired };
};

function App() {
  const [title, setTitle] = useState(config.eventTitle)
  const [videoUrl, setVideoUrl] = useState(config.videoUrl)
  const [countdownTitle, setCountdownTitle] = useState(config.countdownTitle)
  const [targetDate, setTargetDate] = useState(new Date(config.targetDate));
  const { countdown, isExpired } = useCountdown(targetDate);

  useEffect(() => {
    fetch("https://basic-bundle-polished-scene-1aed.acash.workers.dev/").then(response => response.json()).then(
      data => {
        setTitle(data.title)
        setVideoUrl(`https://www.youtube.com/embed/${data.videoID}`)
        setTargetDate(new Date(data.startTime));
        setCountdownTitle(`${data.title} You can watch the event live on \n${format(targetDate, 'EEE MMM dd yyyy hh:mm a')}`)
      }
    ).catch(console.error)
  }, []);

  return (
    <div>
      {/* Card with Title "Check back for the 10BedICU Karnataka launch in:"  */}
      <div className="flex items-center justify-center h-screen">
        <div
          className={
            "p-12 bg-white rounded-lg shadow-xl flex justify-center flex-col items-center w-full max-w-md" +
            (isExpired ? " md:max-w-6xl" : "  md:max-w-2xl")
          }
          style={{ backgroundColor: "rgb(20, 113, 122)" }}
        >
          <img src={logo} className="w-24 mb-8" alt="logo" />
          {isExpired ? (
            <>
              <h1 className="text-2xl text-white font-bold mb-2 text-center">
                {title}
              </h1>
            </>
          ) : (
            <>
              <h5 className="text-2xl text-white font-bold mb-2 text-center">
                {countdownTitle.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </h5>

              <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center pt-8">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.days || 0 }}></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.hours || 0 }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.minutes || 0 }}></span>
                  </span>
                  mins
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.seconds || 0 }}></span>
                  </span>
                  sec
                </div>
              </div>
            </>
          )}

          {config.videoUrl && (
            <div className="w-full mt-8">
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  src={videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
