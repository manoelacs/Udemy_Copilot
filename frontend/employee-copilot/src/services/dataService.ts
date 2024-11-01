import { Employee } from '../models/employee';

const baseURL = 'http://localhost:5000/employees';

export const addEmployee = async (
  employee: Partial<Employee>
): Promise<void> => {
  const Response = await fetch(baseURL + '/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (!Response.ok) {
    throw new Error(Response.statusText);
  }
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(baseURL, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: {
    id: string;
    first_name: string;
    last_name: string;
    position: string;
    hire_date: string;
  }[] = await response.json();

  const employees: Employee[] = data.map((employee) => {
    return {
      id: employee.id,
      firstName: employee.first_name,
      lastName: employee.last_name,
      position: employee.position,
      hireDate: employee.hire_date,
    };
  });

  return employees;
};

export const getEmployee = async (
  id: string
): Promise<Employee | undefined> => {
  const response = await fetch(`${baseURL}/get/${id}`, {
    method: 'GET',
  });

  console.log(response);

  if (!response.ok) {
    return undefined;
  }
  let employee = await response.json();

  employee = {
    firstName: employee.first_name,
    lastName: employee.last_name,
    position: employee.position,
    hireDate: employee.hire_date,
    bio: employee.bio ? employee.bio : 'no Bio Available',
  };

  return employee;
};
