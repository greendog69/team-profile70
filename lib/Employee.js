// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return 'Employee';
  }
  
  getId() {
    return this.id;
  }
  /*  
  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }
  */

}

module.exports = Employee;