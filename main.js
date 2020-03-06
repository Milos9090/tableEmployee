const headTabeleData = ["Picture", "Name", "Age", "Gender", "Email", "Phone", "Vacation Days", "Is Vacation", "Salary"];
var cell;
var listOfEmloyees = [];
var listOfSearch = [];
var listOfAction = [];
var listSort = [];
var listFilter = [];
var buttonStatus = 2;
var buttonContainer;
var clickCounter = 0;

// Employee class 
class Employee {
  //init
  constructor(employeeData) {
    this.name = employeeData.name;
    this.age = employeeData.age;
    this.picture = employeeData.picture;
    this.gender = employeeData.gender;
    this.salary = employeeData.salary;
    this.vacationDays = employeeData.vacationDays;
    this.email = employeeData.contact[0].email;
    this.phone = employeeData.contact[0].phone;
    this.isVacation = employeeData.onVacation;
  }
}


class Table {
  constructor(table) {
    this.table = table;
  };

  // table header
  generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    const optionList = ["Is Vacation", "true", "false"];
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      switch (key) {
        case 'Vacation Days':
          let button = document.createElement("button");
          let att = document.createAttribute("onclick");
          att.value = "sort()";
          let attc = document.createAttribute("class");
          attc.value = "sort";
          button.setAttributeNode(att);
          button.setAttributeNode(attc);
          button.appendChild(text);
          th.appendChild(button)
          break;
        case 'Is Vacation':
          let select = document.createElement("select");
          for (let i = 0; i < optionList.length; i++) {
            let option = document.createElement("option");
            let text1 = document.createTextNode(optionList[i]);
            let attv = document.createAttribute("value");
            attv.value = optionList[i];
            option.setAttributeNode(attv);
            option.appendChild(text1);
            select.appendChild(option);
          }
          let att1 = document.createAttribute("onclick");
          att1.value = "filter()";
          select.setAttributeNode(att1);
          th.appendChild(select);
          break;
        default:
          th.appendChild(text);
          break;
      }
      row.appendChild(th);
    }
  }

  // table body creation
  generateTable(table, data) {
    for (let index = 0; index < 10; index++) {
      const element = data[index];
      let row = table.insertRow();
      this.insertCellText(element.picture, row)
      this.insertCellText(element.name, row)
      this.insertCellText(element.age, row)
      this.insertCellText(element.gender, row)
      this.insertCellText(element.email, row)
      this.insertCellText(element.phone, row)
      this.insertCellText(element.vacationDays, row)
      this.insertCellText(element.isVacation, row)
      this.insertCellText(element.salary, row)
    };
  }

  // insert cell text for change date
  insertCellText(element, row) {
    let cell = row.insertCell();
    let text = document.createTextNode(element);
    let att = document.createAttribute("class");
    att.value = "cell text";
    cell.setAttributeNode(att)
    cell.appendChild(text);
  }

  // change table content with data
  changeTableContent(table, data) {
    let listSize = data.length;
    for (let index = 0; index < 10; index++) {
      let element = data[index];
      let jndex = index * 9;

      var newTable = Object.keys(element).map(function (item, mapindex) {
        table[jndex + mapindex].textContent = index < listSize ? element[item] : "";
      })

      // table[jndex + 0].textContent = index < listSize ? element.picture : "";
      // table[jndex + 1].textContent = index < listSize ? element.name : "";
      // table[jndex + 2].textContent = index < listSize ? element.age : "";
      // table[jndex + 3].textContent = index < listSize ? element.gender : "";
      // table[jndex + 4].textContent = index < listSize ? element.email : "";
      // table[jndex + 5].textContent = index < listSize ? element.phone : "";
      // table[jndex + 6].textContent = index < listSize ? element.vacationDays : "";
      // table[jndex + 7].textContent = index < listSize ? element.isVacation : "";
      // table[jndex + 8].textContent = index < listSize ? element.salary : "";
    }
  }

  // array of button creation
  createButtons(element, numberOfEmployees, list) {
    element.innerHTML = '';
    this.buttonCreate(element, '<', list);
    for (let index = 1; index <= numberOfEmployees; index++) {
      this.buttonCreate(element, index, list);
    }
    this.buttonCreate(element, '>', list);
  }

  // button creation
  buttonCreate(element, simbol, list) {
    let button = document.createElement("button");
    let text = document.createTextNode(simbol);
    let att = document.createAttribute("onclick");
    att.value = "paginationTable('" + simbol + "','" + list + "');";
    button.appendChild(text);
    button.setAttributeNode(att);
    element.appendChild(button);
  }
}

//sort
function sort() {
  let table = new Table;
  listSort = listOfAction;
  if (clickCounter === 0) {
    listSort = listSort.sort(function (a, b) { return a.vacationDays - b.vacationDays });
    clickCounter = 1;
  } else {
    listSort = listSort.reverse();
    clickCounter = 0;
  }
  table.createButtons(buttonContainer, Math.ceil(listSort.length / 10), 'listSort');
  table.changeTableContent(cell, listSort);
}

//filter
function filter() {
  listFilter = [];
  let table = new Table;
  const select = document.querySelector("tr > th > select");
  let state = select.options[select.selectedIndex].value.toString();
  let stateType;
  switch (state) {
    case 'true':
      stateType = true;
      break;
    case 'false':
      stateType = false;
      break;
    default:
      stateType = "Is Vacation";
      break;
  }
  if (stateType == true || stateType == false) {
    for (let index = 0; index < listOfAction.length; index++) {
      if (stateType == listOfAction[index].isVacation) {
        listFilter.push(listOfAction[index]);
      }
    }
  } else {
    listFilter = listOfAction;
  }
  table.createButtons(buttonContainer, Math.ceil(listFilter.length / 10), 'listFilter');
  table.changeTableContent(cell, listFilter);
}

//onclick function for pagination
function paginationTable(requiredNumber, listNumber) {
  let table = new Table;
  let left = '<';
  let right = '>';
  let list = listOfEmloyees;
  // pick list
  switch (listNumber) {
    case 'listOfSearch':
      list = listOfSearch;
      break;
    case 'listSort':
      list = listOfSearch;
      break;
    case 'listFilter':
      list = listFilter;
      break;
    default:
      list = listOfAction;
      break;
  }
  //pick button value
  if (left === requiredNumber && buttonStatus != 1) {
    buttonStatus--;
  } else if (right === requiredNumber && buttonStatus != Math.ceil(list.length / 10)) {
    buttonStatus++;
  } else {
    if (left !== requiredNumber && right !== requiredNumber) {
      buttonStatus = requiredNumber;
    }
  }
  //slice
  let listSliced = list.slice((buttonStatus - 1) * 10, buttonStatus * 10);
  table.changeTableContent(cell, listSliced);
  if (listNumber == 'listFilter') {
    listFilter = listOfAction;
  } else {
    listOfAction = list;
  }
};

// search name onclick
function searchByName() {
  let table = new Table;
  let input, filter;
  listOfSearch = [];
  input = document.querySelector("#inputSearch");
  filter = input.value.toUpperCase();
  for (i = 0; i < listOfEmloyees.length; i++) {
    if (listOfEmloyees[i].name.toUpperCase().indexOf(filter) > -1) {
      listOfSearch.push(listOfEmloyees[i]);
    }
  }
  if (filter == "") {
    table.createButtons(buttonContainer, Math.ceil(listOfEmloyees.length / 10), 'listOfEmloyees');
    table.changeTableContent(cell, listOfEmloyees);
    listOfAction = listOfEmloyees;
  } else {
    table.createButtons(buttonContainer, Math.ceil(listOfSearch.length / 10), 'listOfSearch');
    table.changeTableContent(cell, listOfSearch);
    listOfAction = listOfSearch;
  }

}

//json access and fetching data
async function fetchData(listOfEmloyees) {
  await fetch('./employee.json')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      for (var i in myJson) {
        var employee = new Employee(myJson[i]);
        listOfEmloyees.push(employee);
      }
    })
  listOfAction = listOfEmloyees;
}

// main load
async function main() {
  await fetchData(listOfEmloyees);
  let table = document.querySelector("table");
  buttonContainer = document.querySelector(".buttonContainer");

  //new Table(data);

  var createTable = new Table;
  createTable.generateTableHead(table, headTabeleData);
  createTable.generateTable(table, listOfEmloyees);
  createTable.createButtons(buttonContainer, Math.ceil(listOfEmloyees.length / 10), 'listOfEmloyees');
  cell = document.querySelectorAll(".cell.text");
}

main();