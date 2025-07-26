// Toujours commencer par importer les variables d'environnement !
import 'dotenv/config';

import express from 'express';

// on importe le router
import router from './app/router.js';

import session from 'express-session';

// un peu de config
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine','ejs')

app.set('views', './app/views')

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

app.use(session({
  secret: 'Ofig', // le "secret" qui sert à générer les tokens.
  resave: true, // sauvegarde automatique de la session à la fin de la requête
  saveUninitialized: true, // sauvegarde de la session même si elle est vide
  cookie: {
    // des options pour le cookie qui contient le token. cf npmjs.com/package/express-session
    secure: false, // true pour https, false pour http (en dev)
    maxAge: 1000 * 60 * 60 * 24 // durée de vie du cookie en ms (ici 24h)
  }
}));

// routage !
app.use(router);



// on lance le serveur
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
