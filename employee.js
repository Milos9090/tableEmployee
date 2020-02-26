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
  get getAge(){
    return this.age;
  }
  get getPicture(){
    return this.picture;
  }
  get getGender(){
    return this.gender;
  }
  get getSalary(){
    return this.salary;
  }
  get getVacationDays(){
    return this.vacationDays;
  }
  get getEmail(){
    return this.email;
  }
  get getPhone(){
    return this.phone;
  }
  get getIsVication(){
    return this.isVacation;
  }
}

fetch('./employee.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    for(var i in myJson){
      var employee = new Employee(myJson[i]);
      listOfEmloyees.push(employee);
    }
  });

  export const moduleEmployees = () => {
    return listOfEmloyees;
  };