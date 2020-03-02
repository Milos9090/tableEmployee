let data = ["picture", "name", "age", "gender", "email", "phone", "vacationDays", "isVacation", "salary"];
let cell;
var listOfEmloyees = []
var buttonStatus = 2;
let buttonContainer;
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

  insertCellText(element, row) {
    let cell = row.insertCell();
    let text = document.createTextNode(element);
    let att = document.createAttribute("class");
    att.value = "cell text";
    cell.setAttributeNode(att)
    cell.appendChild(text);
  }

  generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

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

  changeTableContent(table, data) {
    let listSize = data.length;
    for (let index = 0; index < listSize; index++) {
      let element = data[index];
      let jndex = index * 9;
      table[jndex + 0].textContent = element.picture;
      table[jndex + 1].textContent = element.name;
      table[jndex + 2].textContent = element.age;
      table[jndex + 3].textContent = element.gender;
      table[jndex + 4].textContent = element.email;
      table[jndex + 5].textContent = element.phone;
      table[jndex + 6].textContent = element.vacationDays;
      table[jndex + 7].textContent = element.isVacation;
      table[jndex + 8].textContent = element.salary;
    }
    for (let index = listSize; index < 10; index++) {
      let jndex = index * 9;
      table[jndex + 0].textContent = "";
      table[jndex + 1].textContent = "";
      table[jndex + 2].textContent = "";
      table[jndex + 3].textContent = "";
      table[jndex + 4].textContent = "";
      table[jndex + 5].textContent = "";
      table[jndex + 6].textContent = "";
      table[jndex + 7].textContent = "";
      table[jndex + 8].textContent = "";
    }
  }
  // array of button creation
  createButtons(element, numberOfEmployees, list) {
    element.innerHTML = '';
    this.buttonCreate(element, '<' , list);
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
    att.value = "paginationTable('" + simbol + "','"+ list +"');";
    button.appendChild(text);
    button.setAttributeNode(att);
    element.appendChild(button);
  }

  //search
  search() { }

  //sort
  sort() { }

  //filter
  filter() { }

  removeTable(table) {
    table.remove();
  }
}

//onclick function for pagination
function paginationTable(requiredNumber, listNumber) {
  var createTable = new Table;
  let left = '<';
  let right = '>';
  var list = listOfEmloyees;
  if(listNumber === 'listOfSearch'){
  list = listOfSearch;
  }
  if (left === requiredNumber && buttonStatus != 1) {
    buttonStatus--;
  } else if (right === requiredNumber && buttonStatus != Math.ceil(listOfEmloyees.length / 10)) {
    buttonStatus++;
  } else {
    if (left !== requiredNumber && right !== requiredNumber) {
      buttonStatus = requiredNumber;
    }
  }
  var listSliced = list.slice((buttonStatus - 1) * 10, buttonStatus * 10);
  createTable.changeTableContent(cell, listSliced);
};

function searchByName() {
  let createTable = new Table;
  let listOfSearch = [];
  let input, filter
  input = document.querySelector("#inputSearch");
  filter = input.value.toUpperCase();
  for (i = 0; i < listOfEmloyees.length; i++) {
    if (listOfEmloyees[i].name.toUpperCase().indexOf(filter) > -1) {
      listOfSearch.push(listOfEmloyees[i]);
    }
  }
  if(listOfSearch === listOfEmloyees){
    createTable.changeTableContent(cell, listOfEmloyees);
    createTable.createButtons(buttonContainer, Math.ceil(listOfEmloyees.length / 10), 'listOfEmloyees');
  }else{
    createTable.changeTableContent(cell, listOfSearch);
    createTable.createButtons(buttonContainer, Math.ceil(listOfSearch.length / 10), 'listOfSearch');
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
}

async function main() {
  await fetchData(listOfEmloyees);
  let table = document.querySelector("table");
  buttonContainer = document.querySelector(".buttonContainer");

  var createTable = new Table;
  createTable.generateTableHead(table, data);
  createTable.generateTable(table, listOfEmloyees);
  createTable.createButtons(buttonContainer, Math.ceil(listOfEmloyees.length / 10), 'listOfEmloyees');
  cell = document.querySelectorAll(".cell.text");
}

main();

