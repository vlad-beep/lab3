let trigger = true;

function toggleTable() {
  let toggleButton = document.getElementById('toggleButton');
  let probabilityOrCountInput = document.getElementById('probabilityOrCountInput');
  let incidentsPerYearInput = document.getElementById('incidentsPerYearInput');

  if (toggleButton.innerText === 'Кількість інцидентів на рік') {
    toggleButton.innerText = 'Ймовірність інциденту';
    trigger = !trigger;
    incidentsPerYearInput.style.display = 'block';
    probabilityOrCountInput.style.display = 'none';
  } else {
    toggleButton.innerText = 'Кількість інцидентів на рік';
    console.log(probabilityOrCountInput);
    trigger = !trigger;
    incidentsPerYearInput.style.display = 'none';
    probabilityOrCountInput.style.display = 'block';
  }

  redrawTable();
}

function redrawTable() {
  // Получение значений полей ввода
  let weightInput = document.getElementById('weightInput');
  let influenceInput = document.getElementById('influenceInput');
  let probabilityOrCountInput = document.getElementById('probabilityOrCountInput');
  let incidentsPerYearInput = document.getElementById('incidentsPerYearInput');
  let lowInput = document.getElementById('lowInput');
  let highInput = document.getElementById('highInput');

  // Извлечение значений из полей ввода
  let weight = parseFloat(weightInput.value) || 30000;

  let influence = influenceInput.value
    ? influenceInput.value.split(',').map(function (value) {
        return parseFloat(value.trim());
      })
    : [0.05, 0.5, 1, 5, 20];

  let probabilityOrCount = probabilityOrCountInput.value
    ? probabilityOrCountInput.value.split(',').map(function (value) {
        return parseFloat(value.trim());
      })
    : [0.5, 1, 10, 20, 50];

  let incidentsPerYear = incidentsPerYearInput.value
    ? incidentsPerYearInput.value.split(',').map(function (value) {
        return parseFloat(value.trim());
      })
    : [1, 3, 5, 10, 20];

  let low = parseFloat(lowInput.value) || 0.01;
  let high = parseFloat(highInput.value) || 0.15;

  // Выполнение вычислений и обновление таблицы
  let lowWeight = (weight / 100) * low;
  let highWeight = (weight / 100) * high;
  let xArray = influence.map(function (v) {
    return ((weight / 100) * v).toFixed(1);
  });
  let yArray;
  if (trigger) {
    yArray = probabilityOrCount;
  } else yArray = incidentsPerYear;

  let result = [];
  for (let i = 0; i < xArray.length; i++) {
    result[i] = [];
    for (let j = 0; j < yArray.length; j++) {
      result[i][j] = ((xArray[i] / 100) * yArray[j]).toFixed(1);
    }
  }

  let table = document.getElementById('riskTable');
  table.innerHTML = '';

  // Генерация заголовков таблицы
  let headerRow = document.createElement('tr');
  headerRow.innerHTML =
    '<th rowspan="2">Ймовірність</th><th rowspan="2">Вплив</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>';
  table.appendChild(headerRow);

  let subHeaderRow = document.createElement('tr');
  for (let i = 0; i < yArray.length; i++) {
    subHeaderRow.innerHTML += '<td>' + xArray[i] + '</td>';
  }
  table.appendChild(subHeaderRow);

  // Генерация данных таблицы
  for (let j = 0; j < xArray.length; j++) {
    let row = document.createElement('tr');
    row.innerHTML = '<td>' + (j + 1) + '</td><td>' + yArray[j].toFixed(2) + '</td>';

    for (let i = 0; i < yArray.length; i++) {
      let cell = document.createElement('td');
      cell.innerText = result[i][j];

      if (result[i][j] < lowWeight) {
        cell.className = 'low-risk';
      } else if (result[i][j] <= highWeight && result[i][j] >= lowWeight) {
        cell.className = 'medium-risk';
      } else {
        cell.className = 'high-risk';
      }

      row.appendChild(cell);
    }

    table.appendChild(row);
  }
}

function calculateUncertainty() {
  let Sensor = document.getElementById('Usensor');
  let Temp = document.getElementById('Utemp');
  let Pressure = document.getElementById('Upressure');
  let Usensor = Sensor.value;
  let Utemp = Temp.value;
  let Upressure = Pressure.value;

  let Ucorelation = Math.sqrt(Utemp ** 2 + Upressure ** 2);
  let Usum = Math.sqrt(Usensor ** 2 + Ucorelation ** 2);

  // Вывод результата на страницу
  document.getElementById('ucorelation').textContent = 'Uкор: ' + Ucorelation.toFixed(2) + '%';
  document.getElementById('result').textContent = 'Uсум: ' + Usum.toFixed(2) + '%';
}
redrawTable();
