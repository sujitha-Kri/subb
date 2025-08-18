// ✅ Get event name from URL
const params = new URLSearchParams(window.location.search);
const eventName = params.get('event') || 'Not Selected';
const eventInput = document.getElementById('event');
if (eventInput) {
  eventInput.value = eventName;
}

// ✅ Event Date & Time mapping
const eventSchedules = {
  "Workshop": { date: "28/07/2025", time: "10:00 AM" },
  "Technical Fest": { date: "30/07/2025", time: "11:00 AM" },
  "Hackathon": { date: "05/08/2025", time: "09:00 AM" },
  "Conference": { date: "10/08/2025", time: "02:00 PM" },
  "Seminars": { date: "12/08/2025", time: "03:00 PM" }
};

// ✅ Fill Date & Time automatically
const schedule = eventSchedules[eventName];
if (schedule) {
  if (document.getElementById('date')) document.getElementById('date').value = schedule.date;
  if (document.getElementById('time')) document.getElementById('time').value = schedule.time;
} else {
  if (document.getElementById('date')) document.getElementById('date').value = 'Not Assigned';
  if (document.getElementById('time')) document.getElementById('time').value = 'Not Assigned';
}

// ✅ Save data → show success → back to home
function saveData(e) {
  e.preventDefault();

  const attendee = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    idproof: document.getElementById('idproof').value,
    event: document.getElementById('event').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };

  let attendees = JSON.parse(localStorage.getItem('attendees')) || [];
  attendees.push(attendee);
  localStorage.setItem('attendees', JSON.stringify(attendees));

  // ✅ Show success message
  alert("Registration Successful!");

  // ✅ Redirect to home page
  window.location.href = 'home.html';
}

// ✅ Attendee Management page: show saved attendees
const tbody = document.getElementById('attendee-list');
if (tbody) {
  const attendees = JSON.parse(localStorage.getItem('attendees')) || [];
  attendees.forEach(attendee => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${attendee.name}</td>
      <td>${attendee.email}</td>
      <td>${attendee.event}</td>
      <td>${attendee.date}</td>
      <td>${attendee.time}</td>
      <td>${attendee.address}</td>
      <td>${attendee.idproof}</td>
    `;
    tbody.appendChild(row);
  });
}
// Example: assuming you have table rows with class="attendee-row"
const filterButtons = document.querySelectorAll('#eventFilters button');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedEvent = btn.getAttribute('data-event');
    document.querySelectorAll('.attendee-row').forEach(row => {
      const rowEvent = row.getAttribute('data-event');
      if (selectedEvent === 'All' || rowEvent === selectedEvent) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
});
