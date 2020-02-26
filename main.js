var listOfEmloyees = []
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

  //pagination
  pagination() { }

  //search
  search() { }

  //sort
  sort() { }

  //filter
  filter() { }

  generateTable(table, data, start, end) {
    for (let index = start; index < end; index++) {
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

  createButtons(element,numberOfEmployees){
    let button = document.createElement("button");
    let text = document.createTextNode("<");
    button.appendChild(text);
    element.appendChild(button);
    for (let index = 1; index <= numberOfEmployees; index++) {
      button = document.createElement("button");
      text = document.createTextNode(index);
      button.appendChild(text);
      element.appendChild(button);
    }
    button = document.createElement("button");
    text = document.createTextNode(">");
    button.appendChild(text);
    element.appendChild(button);
  }
}

async function fetchData() {
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
  await fetchData();
  let table = document.querySelector("table");
  let buttonContainer = document.querySelector(".buttonContainer");
  let data = ["picture", "name", "age", "gender", "email", "phone", "vacationDays", "isVacation", "salary"];

  var createTable = new Table;

  createTable.generateTableHead(table, data);
  createTable.generateTable(table, listOfEmloyees, 10, 20);
  createTable.createButtons(buttonContainer, Math.ceil(listOfEmloyees.length / 10));
}

main();
