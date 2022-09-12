import { useEffect, useState, useRef } from "react";

const TIMER_INTERVAL = 1000;
const INITIAL_MIN = 0;
const INITIAL_SEC = 10;

export default function Timer(props) {
  const [min, setMin] = useState(INITIAL_MIN);
  const [sec, setSec] = useState(INITIAL_SEC);
  const [running, setRunning] = useState(false);
  const minInputEl = useRef(null);
  const secInputEl = useRef(null);

  useEffect(() => {
    if (!running) return;

    const handle = setTimeout(() => {
      let currentMS = getMs(min, sec) - TIMER_INTERVAL;
      if (currentMS <= 0) {
        setMin(parseInt(minInputEl.current.value));
        setSec(parseInt(secInputEl.current.value));
        setRunning(false);
        alert(`${props.title} 끝났어요~`);
        return;
      }
      const [currentMin, currentSec] = getMinAndSec(currentMS);
      setMin(currentMin);
      setSec(currentSec);
    }, TIMER_INTERVAL);

    return () => {
      clearTimeout(handle);
    };
  }, [min, sec, running, props.title]);

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      <h1>{props.title}</h1>
      <div>
        <input
          ref={minInputEl}
          type="number"
          id="minInput"
          name="minInput"
          min="0"
          max="59"
          defaultValue={min}
          onChange={(e) => {
            setMin(parseInt(e.target.value));
          }}
          disabled={running}
        ></input>
        <label htmlFor="minInput">분</label>
      </div>
      <div>
        <input
          ref={secInputEl}
          type="number"
          id="secInput"
          name="secInput"
          min="0"
          max="59"
          defaultValue={sec}
          onChange={(e) => {
            setSec(parseInt(e.target.value));
          }}
          disabled={running}
        ></input>
        <label htmlFor="secInput">초</label>
      </div>
      <h1>{`${getNumberWithTwoZeroPad(min)}:${getNumberWithTwoZeroPad(
        sec
      )}`}</h1>
      <button disabled={running} onClick={() => setRunning(true)}>
        시작
      </button>
      <button disabled={!running} onClick={() => setRunning(false)}>
        정지
      </button>
    </div>
  );
}

function getMs(min, sec) {
  return (min * 60 + sec) * 1000;
}

function getMinAndSec(ms) {
  if (ms <= 0) return [0, 0];
  return [(ms / 1000 / 60) | 0, (ms / 1000) % 60 | 0];
}

function getNumberWithTwoZeroPad(num) {
  return String(num).padStart(2, "0");
}
