import { EmployeeRepository } from '../src/repository/employeeRespository';

async function main() {
  const emplRepository = new EmployeeRepository();

  const addResult = await emplRepository.addEmployee({
    firstName: 'John',
    lastName: ' Smith',
    hireDate: new Date(),
    position: 'Employ',
  });
  console.log(addResult ? addResult : null);
  const employee = await emplRepository.getEmployees();
  console.log(employee);
}

main();
