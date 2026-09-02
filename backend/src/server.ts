import 'dotenv/config';
import app from './app.ts';

const PORT = Number(process.env.PORT);

app.listen(PORT);
