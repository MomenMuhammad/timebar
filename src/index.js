import "./styles.css"
import Timebar from "./classes/Timebar";

const element = document.querySelector('.timebar-container');


const timebar = new Timebar(element,{
  is12Hours: false,
  callback: (time) => {

    alert(`Selected time is ${time.hour}:${time.minutes}`);
  },
})

export default {
  Timebar
};