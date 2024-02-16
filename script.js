let alarmCounter = 0;

    function openModal(title, text, cnt) {
      alert(`${title}\n\n${text}`);
      deleteAlarm2(cnt);
    }

    function changeModalText(title, text) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalText').innerText = text;
    }

    function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const date = now.toLocaleDateString();

      const clockElement = document.getElementById('clock');
      const dateElement = document.getElementById('date');


      clockElement.innerText = `${hours}:${minutes}:${seconds}`;
      dateElement.innerText = `${date}`;
    }

    function setAlarm() {
      const alarmTime = document.getElementById('alarmTime').value;
      const alarmDate = document.getElementById('alarmDate').value;
      const alarmName = document.getElementById('alarmName').value;

      const fullDateTimeString = `${alarmDate}T${alarmTime}:00`;
      const DateTime2 = new Date(fullDateTimeString);
      const DateTime1 = new Date();

      const warningAlert = document.getElementById('warningAlert');

      const condition = DateTime1.getTime() < DateTime2.getTime();

      warningAlert.removeAttribute('style');
      if (condition) {
        const timeDiff = DateTime2 - DateTime1;

        alarmCounter++;
        warningAlert.classList.add('d-none');
        const T1 = setTimeout(openModal, timeDiff, `Спрацював будильник №${alarmCounter}`, alarmName, alarmCounter);
        addAlarm(T1, alarmDate, alarmTime, alarmName);



      } else {
        warningAlert.classList.remove('d-none');
      }

    }


    function addAlarm(timeout, date, time, name) {


      const tableBody = document.getElementById("alarmTable").getElementsByTagName('tbody')[0];

      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
    <td scope="row">${alarmCounter}</td>
    <td>${name}</td>
    <td>${date}</td>
    <td>${time}</td>
    <td>
      <button class="btn btn-danger" onclick="deleteAlarmAndTimeout(${timeout},this)">Видалити</button>
    </td>
  `;
    }

    function deleteAlarm1(button) {
      const rowToDelete = button.closest("tr");

      if (rowToDelete) {
        rowToDelete.remove();
      }
    }

    function deleteAlarm2(alarmId) {
      const tableBody = document.getElementById("alarmTable").getElementsByTagName('tbody')[0];
      const rows = tableBody.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        const cellId = cells[0].innerText;

        if (parseInt(cellId) === alarmId) {
          tableBody.deleteRow(i);
          break;
        }
      }
    }

    function deleteAlarmAndTimeout(timeout, button) {
      deleteAlarm1(button);
      clearTimeout(timeout);
    }

    