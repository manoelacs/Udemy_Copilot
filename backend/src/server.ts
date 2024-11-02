import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { EmployeesRoutes } from './routes/employeesRoute';

/**
 * @class Server
 * @description Initializes and configures an Express server with middleware, routes, and error handling.
 *
 * @property {express.Application} app - The Express application instance.
 * @property {string} host - The hostname for the server, defaulting to 'localhost'.
 * @property {number} port - The port number for the server, defaulting to 5000.
 *
 * @constructor Initializes the server by configuring middleware, loading routes, and starting the server.
 *
 * @method configureMiddleware Configures middleware for CORS, JSON parsing, and error handling.
 * @method loadRoutes Loads the application routes.
 * @method startServer Starts the server and listens on the specified host and port.
 * @method errorHandler Handles errors and sends a 500 status response with an error message.
 *
 * @example
 * const server = new Server();
 */
export class Server {
  private app = express();
  private host = process.env.HOST || 'localhost';
  private port = Number(process.env.SERVER_PORT) || 5000;

  constructor() {
    this.configureMiddleware(); // Calling private method within the class
    this.loadRoutes(); // Calling private method within the class
    this.startServer(); // Calling private method within the class
  }

  private configureMiddleware() {
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        ],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(this.errorHandler.bind(this));
  }

  private loadRoutes() {
    new EmployeesRoutes(this.app);
  }

  private startServer() {
    this.app.listen(this.port, this.host, () => {
      console.log(`Server is running on http://${this.host}:${this.port}`);
    });
  }

  private errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  }
}
const server = new Server();
