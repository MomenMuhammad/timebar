
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
class Timebar {
  options = {};
  element = null;

  startTime = null;
  endTime = null;
  callback = null;

  constructor(element, options = {}) {
    if (!element) {
      throw new Error("Element is required");
    }

    if (!(element instanceof HTMLElement)) {
      throw new Error("Element should be a valid HTMLElement");
    }

    if (
      !this.#isStartAndEndTimeInOptions(options) &&
      !this.#isElementHasTimeAsDataAttribute(element)
    ) {
      throw new Error("Start time and end time are required");
    }

    this.startTime = this.#to24Hours(
      element.dataset.startTime ?? options.startTime
    );

    this.endTime = this.#to24Hours(element.dataset.endTime ?? options.endTime);
    this.callback = options.callback;

    this.options = options;
    this.element = element;
    this.#render();
    this.element.addEventListener(
      "click",
      this.calculateTimebarSelectedTime(this.startTime, this.endTime)
    );
  }

  #isStartAndEndTimeInOptions(options) {
    return options.startTime && options.endTime;
  }

  #isElementHasTimeAsDataAttribute(element) {
    return element.dataset.startTime || element.dataset.endTime;
  }

  #to24Hours(time) {
    const regex = /(\d{2}):(\d{2})\s*(AM|PM|am|pm)?/g;
    const matched = regex.exec(time);

    if (!matched) throw new Error("Invalid time format");

    let hours = +matched[1];
    let minutes = +matched[2];
    let meridiem = matched[3];

    if (meridiem && meridiem.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;
    } else if (meridiem && meridiem.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }

  calculateTimebarSelectedTime(startTime, endTime) {
    return (event) => {
      const timebar = event.currentTarget;
      const timebarRect = timebar.getBoundingClientRect();
      const timebarWidth = timebarRect.width;
      const clickX = event.clientX - timebarRect.left;
      const percentage = (clickX / timebarWidth) * 100;

      let hour, minutes;
      const totalMinutes =
        endTime.hours * 60 +
        endTime.minutes -
        (startTime.hours * 60 + startTime.minutes);
      const selectedMinutes = (totalMinutes * percentage) / 100;
      const totalSelectedMinutes =
        startTime.hours * 60 + startTime.minutes + selectedMinutes;
      hour = Math.floor(totalSelectedMinutes / 60);
      minutes = Math.round(totalSelectedMinutes % 60);

      // Round minutes to the nearest 0, 15, 30, or 45
      const remainder = minutes % 15;
      if (remainder < 8) {
        minutes -= remainder;
      } else {
        minutes += 15 - remainder;
      }

      this.callback({ hour, minutes });
      console.log({ hour, minutes });
    };
  }

  #render() {
    const bar = document.createElement("div");
    bar.classList.add("timebar");

    const wrapper = document.createElement("div");
    wrapper.classList.add("ruler");

    for (let i = this.startTime.hours; i <= this.endTime.hours; i++) {
      const indecator = document.createElement("div");
      indecator.classList.add("timebar__hour");
      indecator.textContent = `${i}:00`;
      wrapper.appendChild(indecator);
    }

    this.element.appendChild(wrapper);
    this.element.appendChild(bar);
  }
}

const element = document.querySelector('.timebar-container');


new Timebar(element,{
  is12Hours: false,
  callback: (time) => {

    alert(`Selected time is ${time.hour}:${time.minutes}`);
  },
});

var index = {
  Timebar
};

export { index as default };
