const headTabeleData = ["Picture", "Name", "Age", "Gender", "Email", "Phone", "Vacation Days", "Is Vacation", "Salary"];
var table = document.querySelector("table");
var cell;
var listOfEmloyees = [];
var listOfSearch = [];
var listOfAction = [];
var listSort = [];
var listFilter = [];
var buttonStatus = 2;
var buttonContainer;
var clickCounter = 0;
var column = 9;
var row = 10;

// Employee class 
class Employee {
  //init
  constructor(employeeData) {
    this.picture = employeeData.picture;
    this.name = employeeData.name;
    this.age = employeeData.age;
    this.gender = employeeData.gender;
    this.email = employeeData.contact[0].email;
    this.vacationDays = employeeData.vacationDays;
    this.phone = employeeData.contact[0].phone;
    this.isVacation = employeeData.onVacation;
    this.salary = employeeData.salary;
  }
}

class Table {

  constructor(tableSelector, list, typeList) {
    this.createButtons(buttonContainer, Math.ceil(list.length / 10), typeList);
    this.changeTableContent(cell, list);
  };

  // change table content with data
  changeTableContent(cell, data) {
    let listSize = data.length;
    for (let index = 0; index < row; index++) {
      let element = data[index];
      let jndex = index * column;
      if (element != null) {
        var newTable = Object.keys(element).map(function (item, mapindex) {
          cell[jndex + mapindex].textContent = index < listSize ? element[item] : "";
        })
      } else {
        for (let index = 0; index < column; index++) {
          cell[jndex + index].textContent = "";
        }
      }
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

// table header
function generateTableHead(tableSelector, data) {
  let thead = tableSelector.createTHead();
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
function generateTable(tableSelector, data) {
  for (let index = 0; index < row; index++) {
    const element = data[index];
    let row = tableSelector.insertRow();
    insertCellText(element.picture, row)
    insertCellText(element.name, row)
    insertCellText(element.age, row)
    insertCellText(element.gender, row)
    insertCellText(element.email, row)
    insertCellText(element.phone, row)
    insertCellText(element.vacationDays, row)
    insertCellText(element.isVacation, row)
    insertCellText(element.salary, row)
  }
}

// insert cell text for change date
function insertCellText(element, row) {
  let cell = row.insertCell();
  let text = document.createTextNode(element);
  let att = document.createAttribute("class");
  att.value = "cell text";
  cell.setAttributeNode(att)
  cell.appendChild(text);
}

//sort
function sort() {
  listSort = listOfAction;
  if (clickCounter === 0) {
    listSort = listSort.sort(function (a, b) { return a.vacationDays - b.vacationDays });
    clickCounter = 1;
  } else {
    listSort = listSort.reverse();
    clickCounter = 0;
  }
  new Table(table, listSort, 'listSort');
}

//filter
function filter() {
  listFilter = [];
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
  new Table(table, listFilter, 'listFilter');
}

//onclick function for pagination
function paginationTable(requiredNumber, listNumber) {
  let left = '<';
  let right = '>';
  let list = listOfEmloyees;
  // pick list
  switch (listNumber) {
    case 'listOfSearch':
      list = listOfSearch;
      break;
    case 'listSort':
      list = listSort;
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
  new Table(table, listSliced, listNumber);
  if (listNumber == 'listFilter') {
    listFilter = listOfAction;
  } else {
    listOfAction = list;
  }
};

// search name onclick
function searchByName() {
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
    new Table(table, listOfEmloyees, 'listOfEmloyees');
    listOfAction = listOfEmloyees;
  } else {
    new Table(table, listOfSearch, 'listOfSearch');
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
  //get data
  await fetchData(listOfEmloyees);
  //physical table
  generateTableHead(table, headTabeleData);
  generateTable(table, listOfEmloyees);
  buttonContainer = document.querySelector(".buttonContainer");
  cell = document.querySelectorAll(".cell.text");
  new Table(table, listOfEmloyees, 'listOfEmloyees');
}

main();