import dataMapper from "../dataMapper.js";

export const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage:(req, res)=> {
    // A remplacer par le rendu d'un fichier EJS
    const bookmarks = req.session.bookmarks || []
    res.render('favoris', {bookmarks})
  },
  addToBookmarks: async (req, res)=> {
    try {
      const figurineId = parseInt(req.params.id,10);
      if (!req.session.bookmarks) {
        req.session.bookmarks = [];
      }
      const ifFigurineExist = req.session.bookmarks.some(fig => fig.id === figurineId)
      if (!ifFigurineExist) {
        const findFig = await dataMapper.getOneFigurine(figurineId)
        if (findFig) {
          req.session.bookmarks.push(findFig);
        }
      }
      res.redirect('/bookmarks');
    } catch (error) {
      console.log(error)
      res.status(500).send('erreur serveur')
    }
  },
  deleteToBookmarks: (req, res)=> {
    const figurineId = parseInt(req.params.id);
    if (req.session.bookmarks) {
      req.session.bookmarks = req.session.bookmarks.filter(bookmark => bookmark.id !== figurineId);
    }
    res.redirect('/bookmarks');
  }};



