import { useEffect, useState } from "react";
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
  // Countdown to 28th November 2022 at 16:00:00
  const [targetDate, setTargetDate] = useState(new Date(config.targetDate));
  const { countdown, isExpired } = useCountdown(targetDate);

  useEffect(() => {
    fetch("config.json").then((response) => {
      response.json().then((data) => {
        setTargetDate(new Date(data.targetDate));
      });
    });
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
                Join us as we launch 10BedICU at 12 Locations across Nagaland
              </h1>
            </>
          ) : (
            <>
              <h5 className="text-2xl text-white font-bold mb-2 text-center">
                You can watch the launch of the 10BedICU project by the Hon'ble
                CM Shri Neiphiu Rio live on Jan 6th, 9am in
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
                src="https://www.youtube.com/embed/EKcptMRAfXA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
