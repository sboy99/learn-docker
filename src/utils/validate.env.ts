import { cleanEnv, port, str } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    MONGO_USER: str(),
    MONGO_PASS: str(),
    MONGO_PATH: str(),
    PORT: port({ default: 5000 }),
  });
}

export default validateEnv;
