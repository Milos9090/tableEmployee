var listOfEmloyees = []

  class Employee{
    //init
    constructor(employeeData){
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

    get getName(){
      return this.name;
    }
}

class Table{

  constructor(table){
      this.table = table;
  };

insertRow(){}

generateTable(table, data) {
  console.log(data);
  data.forEach(element => {
    console.log(element.name);
  });
    
    // let row = table.insertRow();
    // insertCellText(element.picture, row)
    // insertCellText(element.name, row)
    // insertCellText(element.age, row)
    // insertCellText(element.gender, row)
    // insertCellText(element.email, row)
    // insertCellText(element.phone, row)
    // insertCellText(element.vacationDays, row)
    // insertCellText(element.isVacation, row)
    // insertCellText(element.salary, row)
  // }
}

insertCellText(element, row){
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
pagination(){}

//search
search(){}

//sort
sort(){}

//filter
filter(){}
}

fetch('./employee.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    // for(var i in myJson){
    //   employee = new Employee(myJson[i]);
      listOfEmloyees = myJson; //.push(employee);
    // }
  });

  // console.log(listOfEmloyees);
  

  let table = document.querySelector("table");
  let data = ["picture", "name", "age", "gender", "email", "phone", "vacationDays", "isVacation", "salary"];
  
  var createTable = new Table;

  createTable.generateTableHead(table, data);
  createTable.generateTable(table, listOfEmloyees);