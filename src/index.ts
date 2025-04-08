import { Hono } from 'hono';

import { checkUpdates } from './controller';

const app = new Hono();

app.get('/', async c => {
 const updates = await checkUpdates();
 return c.json(updates);
});

export default app;
