import Countdown from "react-countdown";
import moment from "moment";

const CountdownTimer = ({ endTime }: { endTime: string  }) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return (
      <span
        style={{
          background: "#3d84b8",
          borderRadius: "2px",
          padding: "5px",
          color: "white",
          display: "inline",
          marginTop: "30px",
        }}
      >
        {days} days {hours} h {minutes} m {seconds} s
      </span>
    );
  };
  1;
  return (
    <div>
      <Countdown
        zeroPadTime={2}
        zeroPadDays={2}
        date={moment(endTime, "MMMM Do hh:mm:00 a").valueOf()}
        renderer={renderer}
        onComplete={() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
      />
    </div>
  );
};

export default CountdownTimer;
