let data = ["picture", "name", "age", "gender", "email", "phone", "vacationDays", "isVacation", "salary"];
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

  createButtons(element, numberOfEmployees) {
    this.buttonCreate(element, '<');
    for (let index = 1; index <= numberOfEmployees; index++) {
      this.buttonCreate(element, index);
    }
    this.buttonCreate(element, '>');
  }

  buttonCreate(element, simbol) {
    let button = document.createElement("button");
    let text = document.createTextNode(simbol);
    let att = document.createAttribute("onclick");
    att.value = "paginationTable('" + simbol + "');";
    button.appendChild(text);
    button.setAttributeNode(att);
    element.appendChild(button);
  }

  //pagination
  paginationTable() { }

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

//pagination
function paginationTable(number, listOfEmloyees) {
  return listOfEmloyees.slice((number - 1) * 10, number * 10);
}

async function main() {

  var listOfEmloyees = []
  await fetchData(listOfEmloyees);
  var currentEmployeeList = listOfEmloyees;
  let table = document.querySelector("table");
  let buttonContainer = document.querySelector(".buttonContainer");

  var createTable = new Table;
  createTable.generateTableHead(table, data);
  createTable.generateTable(table, listOfEmloyees);
  createTable.createButtons(buttonContainer, Math.ceil(listOfEmloyees.length / 10));
  var temp = paginationTable(8, listOfEmloyees);
  console.log(temp);

}

main();

