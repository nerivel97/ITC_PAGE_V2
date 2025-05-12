import initializeApp from './app';
import { env } from './lib/env';

// Versión con inicialización asíncrona
initializeApp()
  .then((app) => {
    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  });
