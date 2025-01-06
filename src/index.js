import "./styles.css"
import Timebar from "./classes/Timebar";

const timebar = new Timebar({
  elements: document.querySelectorAll('.timebar'),
  hours24
});