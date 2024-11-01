import { Application, Router, Request, Response } from 'express';
import express from 'express';
import { EmployeesController } from '../controllers/employeesController';

export class EmployeesRoutes {
  private router = Router();
  private controller = new EmployeesController();

  constructor(private app: Application) {
    // Middleware to parse incoming requests with JSON payloads
    this.router.use(express.json());

    // Mount router at /employees
    this.app.use('/employees', this.router);

    // Call to load the routes
    this.loadRoutes();
  }

  public loadRoutes() {
    this.router.get('/', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployees(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while fetching employees.' });
      }
    });

    this.router.get('/get/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployeeById(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while fetching the employee.' });
      }
    });

    this.router.post('/add', async (req: Request, res: Response) => {
      try {
        await this.controller.addEmployee(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while adding the employee.' });
      }
    });

    this.router.delete('/delete/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.removeEmployee(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while deleting the employee.' });
      }
    });

    this.router.put('/update/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.updateEmployeePosition(req, res);
      } catch (error) {
        res.status(500).send({
          error: 'An error occurred while updating the employee position.',
        });
      }
    });

    this.router.get('/position/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployeeByPosition(req, res);
      } catch (error) {
        res.status(500).send({
          error: 'An error occurred while fetching the employee by position.',
        });
      }
    });
    this.router.get('/bio/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployeeByPosition(req, res);
      } catch (error) {
        res.status(500).send({
          error: 'An error occurred while fetching the employee by position.',
        });
      }
    });
  }
}
