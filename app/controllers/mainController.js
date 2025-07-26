import dataMapper from '../dataMapper.js';

export const mainController = {

  // méthode pour la page d'accueil
  homePage: async (req, res)=> {
    // Remplacer le response.sendFile par le rendu d'un fichier EJS
    try{
    const getAllFigurines = await dataMapper.getAllFigurines()
    res.render('accueil', {getAllFigurines});
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
  },

  // méthode pour la page article
  articlePage: async(req, res)=> {
    // Remplacer le response.sendFile par le rendu d'un fichier EJS
    try{
      const articleId = Number(req.params.id);
      const getOneFigurine = await dataMapper.getOneFigurine(articleId)
      res.render('article', {getOneFigurine});
    } catch (error) {
      res.status(500).send('Erreur serveur');
    }
  }
};

