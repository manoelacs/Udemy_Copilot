import { Application, Router, Request, Response } from 'express';
import express from 'express';
import { EmployeesController } from '../controllers/employeesController';

/**
 * Class representing the routes for employee-related operations.
 */
export class EmployeesRoutes {
  /**
   * Router instance for handling employee routes.
   */
  private router = Router();

  /**
   * Controller instance for handling employee operations.
   */
  private controller = new EmployeesController();

  /**
   * Creates an instance of EmployeesRoutes.
   * @param app - The Express application instance.
   */
  constructor(private app: Application) {
    this.router.use(express.json());
    this.app.use('/employees', this.router);
    this.loadRoutes();
  }

  /**
   * Loads all the employee-related routes.
   */
  public loadRoutes() {
    /**
     * Route to get all employees.
     * @route GET /employees/
     */
    this.router.get('/', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployees(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while fetching employees.' });
      }
    });

    /**
     * Route to get an employee by ID.
     * @route GET /employees/get/:id
     */
    this.router.get('/get/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployeeById(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while fetching the employee.' });
      }
    });

    /**
     * Route to add a new employee.
     * @route POST /employees/add
     */
    this.router.post('/add', async (req: Request, res: Response) => {
      try {
        await this.controller.addEmployee(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while adding the employee.' });
      }
    });

    /**
     * Route to delete an employee by ID.
     * @route DELETE /employees/delete/:id
     */
    this.router.delete('/delete/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.removeEmployee(req, res);
      } catch (error) {
        res
          .status(500)
          .send({ error: 'An error occurred while deleting the employee.' });
      }
    });

    /**
     * Route to update an employee's position by ID.
     * @route PUT /employees/update/:id
     */
    this.router.put('/update/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.updateEmployeePosition(req, res);
      } catch (error) {
        res.status(500).send({
          error: 'An error occurred while updating the employee position.',
        });
      }
    });

    /**
     * Route to get an employee by position.
     * @route GET /employees/position/:id
     */
    this.router.get('/position/:id', async (req: Request, res: Response) => {
      try {
        await this.controller.getEmployeeByPosition(req, res);
      } catch (error) {
        res.status(500).send({
          error: 'An error occurred while fetching the employee by position.',
        });
      }
    });

    /**
     * Route to get an employee's bio by ID.
     * @route GET /employees/bio/:id
     */
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
