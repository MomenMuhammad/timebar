import "./styles.css"
import Timebar from "./classes/Timebar";

const element = document.querySelector('.timebar-container');


const timebar = new Timebar(element,{
  is12Hours: false,
  callback: (time) => {
    alert(`Selected time is ${time.hour}:${time.minutes}`);
  },
})

timebar.addEvent({
  startTime: "02:00",
  endTime: "05:00",
  color: "red"
})

timebar.addEvent({
  startTime: "06:00",
  endTime: "07:00",
  color: "blue"
})

export default {
  Timebar
};