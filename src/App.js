import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { countdown };
};

function App() {
  // Countdown to 28th November 2022 at 16:00:00
  const targetDate = new Date("2022-11-28T16:00:00");
  const { countdown } = useCountdown(targetDate);

  return (
    <div>
      {/* Card with Title "Check back for the 10BedICU Karnataka launch in:"  */}
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-4xl text-center items-center justify-center">
          <h5 className="card-title">
            Check back for the 10BedICU Karnataka launch in:
          </h5>

          <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center pt-12">
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
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": countdown.seconds || 0 }}></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
