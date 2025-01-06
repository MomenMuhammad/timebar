
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
class Timebar {
  options = {};
  parent = null;

  constructor(parent, options = {}) {
    if(!parent) {
      throw new Error("Parent element is required");
    }

    if (!options.startTime || !options.endTime) {
      throw new Error("startTime and endTime are required");
    }


    this.options = options;
    this.parent = parent;
  }

  _to24Hours(time) {
    const regex = /(\d{2}):(\d{2})\s*(AM|PM|am|pm)?/g;
    const matched = regex.exec(time);

    if (!matched) throw new Error("Invalid time format");

    let hours = +matched[1];
    let minutes = +matched[2];
    let meridiem = matched[3];

    if (meridiem && meridiem.toLowerCase() === "pm" && hours === 12) {
      hours += 12;
    } else if (meridiem && meridiem.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  render() {
    const from = this._to24Hours(this.options.startTime);
    const to = this._to24Hours(this.options.endTime);


    const bar = document.createElement("div");
    bar.classList.add("timebar");

    const wrapper = document.createElement("div");
    wrapper.classList.add("ruler");
    
    

    
    for(let i = from.hours; i <= to.hours; i++) {
      const indecator = document.createElement("div");
      indecator.classList.add("timebar__hour");
      indecator.textContent = i;
      wrapper.appendChild(indecator);
    }
    this.parent.appendChild(wrapper);
    this.parent.appendChild(bar);
  }
}

const element = document.querySelector('.timebar-container');
const timebar = new Timebar(element,{
  is12Hours: false,
  startTime: "08:00 AM",
  endTime: "18:00PM", 
});
timebar.render();


var index = {
  Timebar
};

export { index as default };
