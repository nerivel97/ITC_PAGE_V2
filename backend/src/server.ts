import { PORT } from './config/config';
import initializeApp from './app';

// Versión con inicialización asíncrona
initializeApp()
  .then(app => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  });