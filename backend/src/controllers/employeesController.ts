import { InMemoryRepository } from '../../inMemoryRepository';

import { Request, Response } from 'express';
import { EmployeeRepository } from '../repository/employeeRespository';

export class EmployeesController {
  private readonly repository: EmployeeRepository = new EmployeeRepository();

  public async getEmployees(req: Request, res: Response): Promise<any> {
    try {
      const employees = await this.repository.getEmployees();
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  public async getEmployeeById(req: Request, res: Response): Promise<any> {
    try {
      const employee = await this.repository.getEmployeeById(req.params.id);
      res.status(200).send(employee);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async addEmployee(req: Request, res: Response): Promise<any> {
    try {
      const employee = await this.repository.addEmployee(req.body);
      res.status(201).send(employee);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async removeEmployee(req: Request, res: Response): Promise<any> {
    try {
      await this.repository.deleteEmployee(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async updateEmployeePosition(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      await this.repository.updateEmployeePosition(
        req.params.id,
        req.body.position
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getEmployeeByPosition(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const employees = await this.repository.getEmployeesByPosition(
        req.params.position
      );
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
