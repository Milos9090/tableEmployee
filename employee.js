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
}

fetch('./employee.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    for(var i in myJson){
      employee = new Employee(myJson[i]);
      listOfEmloyees.push(employee);
    }
  });
console.log(listOfEmloyees);

employeeModule = function(){
  return listOfEmloyees
}