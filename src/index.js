import "./styles.css"
import Timebar from "./classes/Timebar";

const element = document.querySelector('.timebar-container');
const timebar = new Timebar(element,{
  is12Hours: false,
  startTime: "08:00 AM",
  endTime: "18:00PM", 
})
timebar.render();


export default {
  Timebar
};