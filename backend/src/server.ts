import app from './app';

const host = process.env.HOST || 'localhost';
const port = Number(process.env.SERVER_PORT) || 5000;

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
