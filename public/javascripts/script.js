const newEventModal = document.getElementById('newEventModal')
const backDrop = document.getElementById('modalBackDrop');
const monthDisplay = document.getElementById("month-display");

function openModal(evt) {
  const month = monthDisplay.textContent.split(' ')[0];
  const year = monthDisplay.textContent.split(' ')[1];
  let date = `${month}/${evt.target.textContent}/${year}`;
  let cellDate = new Date(date);
  let formattedDate = `${cellDate.getFullYear()}-${(cellDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
    formattedDate += `-${cellDate.getDate().toString().padStart(2, "0")}T${cellDate
      .toTimeString()
      .slice(0, 5)}`;
      
  console.log(date)
  const template = `
  <form class="new-event-form" action="/periods" method="POST">
    <label class="form-heading">Period Phase</label>
    <select class="form-select" name="phase">
      <option value="Bleeding" selected>Bleeding</option>
      <option value="Ovulating">Ovulating</option>
      <option value="Spotting">Spotting</option>
      <option value="Not Bleeding">Not Bleeding</option>
    </select><br>
    <input type="datetime-local" value="${formattedDate}" name="periodDate" class="form-date"><br>
    <button type="submit" class="btn" id="saveButton">Save</button><br>
  </form>
  <button class="btn" id="cancelButton">Cancel</button>
  `;

  newEventModal.innerHTML = template;
  newEventModal.style.display = "block";
  backDrop.style.display = 'block';
  document.querySelector("#cancelButton").addEventListener("click", closeModal);
}

function closeModal() {
  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
}

const daySquares = document.querySelectorAll(".day");
daySquares.forEach(sq => {
  sq.addEventListener("click", openModal);
});