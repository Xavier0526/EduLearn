// Home Page

if (document.querySelector('.menu-btn')) {
  
  const menuBtn = document.querySelector('.menu-btn');
  const closeBtn = document.querySelector('.close-btn');
  const sideNav = document.querySelector('.side-nav');
  const overlayHome = document.querySelector('.overlay');
  
  const toggleMenu = () => {
    sideNav.classList.toggle('open');
    overlayHome.classList.toggle('show');
};

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlayHome.addEventListener('click', toggleMenu);

}

// Feedback slider

if (document.querySelector(".carousel")) {

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert duplicates of the last few cards to the beginning of the carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert duplicates of the first few cards to the end of the carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listensers for arrow buttons to scroll
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX); // Update scroll position of the carousel base on the cursor movement
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; // Return if window smaller than 800
    //Everytime autoplay the carousel after 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    // If carousell is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } 
    // If carousel is at end, scroll to beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    //Existing timeout clearing and start autoplay when mouse not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
carousel.addEventListener("mouseleave", autoPlay); // Mouse leave autoplay resume

}

// Feedback Page

if (document.getElementById("feedbackForm")) {

const form = document.getElementById("feedbackForm");
const openConfirmBtn = document.getElementById("openConfirmBtn");

const overlayFeedback = document.getElementById("overlay");
const confirmBubble = document.getElementById("confirmBubble");
const thankBubble = document.getElementById("thankBubble");

const goBackBtn = document.getElementById("goBackBtn");
const confirmSubmitBtn = document.getElementById("confirmSubmitBtn");
const backHomeBtn = document.getElementById("backHomeBtn");

function isValid(){
  const ok = form.checkValidity();
  if(!ok) form.reportValidity();
  return ok;
}

function openOverlay(which){
  overlayFeedback.classList.add("show");
  confirmBubble.classList.remove("show");
  thankBubble.classList.remove("show");

  if(which === "confirm") confirmBubble.classList.add("show");
  if(which === "thank") thankBubble.classList.add("show");
}

function closeOverlay(){
  overlayFeedback.classList.remove("show");
  confirmBubble.classList.remove("show");
  thankBubble.classList.remove("show");
}

openConfirmBtn.onclick = ()=>{
  if(isValid()) openOverlay("confirm");
};

goBackBtn.onclick = closeOverlay;

confirmSubmitBtn.onclick = ()=>{
  openOverlay("thank");
  form.reset();
};

backHomeBtn.onclick = closeOverlay;

overlayFeedback.onclick = e => {
  if(e.target === overlay) closeOverlay();
};

window.onkeydown = e => {
  if(e.key === "Escape") closeOverlay();
};

}

// Time Management

if (document.getElementById("dueBox") && document.getElementById("completedBox")) {

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const dueBox = document.getElementById("dueBox");
const completedBox = document.getElementById("completedBox");

function renderTasks() {

  dueBox.innerHTML = "";
  completedBox.innerHTML = "";

  tasks.forEach((task, index) => {

    const div = document.createElement("div");

    div.className = "task";
    div.draggable = true;
    div.dataset.index = index;

    /* Format from Military Time to Normal Time */
    const formattedTime = new Date(`1970-01-01T${task.endTime}`).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});

    /* Task Appear in Drop Zone (Box)*/
    div.innerHTML = `
      <div class="task-header">
        <strong>${task.task}</strong>
        <button class="delete-btn"><img class="crossred" src="assets/crossred.png" alt="cross"></button>
      </div>

      <small>Due: ${task.endDate} ${formattedTime}</small>
    `;


    /* Drag Start */
    div.addEventListener("dragstart", function(e) {

      e.dataTransfer.setData("text/plain", index);
      e.dataTransfer.effectAllowed = "move";

      this.classList.add("dragging");
    });


    /* Drag End */
    div.addEventListener("dragend", function() {
      this.classList.remove("dragging");
    });


    /* Delete */
    div.querySelector(".delete-btn").addEventListener("click", function(e) {

      e.preventDefault();
      e.stopPropagation();

      tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    });


    if (task.status === "due") {
      dueBox.appendChild(div);
    } else {
      completedBox.appendChild(div);
    }

  });

}


/* Drop zone */

function setupDrop(box, status) {

  box.addEventListener("dragover", function(e) {
    e.preventDefault();
    box.classList.add("drag-over");
  });


  box.addEventListener("dragleave", function() {
    box.classList.remove("drag-over");
  });


  box.addEventListener("drop", function(e) {

    e.preventDefault();

    box.classList.remove("drag-over");

    const index = e.dataTransfer.getData("text/plain");

    if (index === "") return;

    tasks[index].status = status;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
  });

}

setupDrop(dueBox, "due");
setupDrop(completedBox, "done");

renderTasks();

}

// Goals

// Back button
function goBack() {
  window.history.back();
}


// Auto-fill subject
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject");

if (subject) {
  document.getElementById("subjectInput").value = subject;
}


// Save task + redirect
const form = document.getElementById("goalForm");

form.addEventListener("submit", function(e) {

  e.preventDefault();

  const subject = document.getElementById("subjectInput").value;
  const task = document.getElementById("taskInput").value;
  const endDate = document.getElementById("endDate").value;
  const endTime = document.getElementById("endTime").value;

  // Safety check
  if (!task || !endDate || !endTime) {
    alert("Please complete all fields");
    return;
  }

  const newTask = {
    subject: subject,
    task: task,
    endDate: endDate,
    endTime: endTime,
    status: "due"
  };

  // Get old tasks
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add new
  tasks.push(newTask);

  // Save
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Redirect
  window.location.href = "time.html";

});

function toggleMenu() {

  const nav = document.getElementById("sideNav");
  const overlay = document.getElementById("overlay");

  nav.classList.toggle("open");
  overlay.classList.toggle("show");
}

