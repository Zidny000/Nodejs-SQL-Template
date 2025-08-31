import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';

const router = Router();
const favoriteController = new FavoriteController();

router.get('/user/:id/favorites', favoriteController.getUserFavorites.bind(favoriteController));
router.post('/favs/track/:id', favoriteController.addTrackToFavorites.bind(favoriteController));
router.delete('/favs/track/:id', favoriteController.removeTrackFromFavorites.bind(favoriteController));
router.post('/favs/album/:id', favoriteController.addAlbumToFavorites.bind(favoriteController));
router.delete('/favs/album/:id', favoriteController.removeAlbumFromFavorites.bind(favoriteController));
router.post('/favs/artist/:id', favoriteController.addArtistToFavorites.bind(favoriteController));
router.delete('/favs/artist/:id', favoriteController.removeArtistFromFavorites.bind(favoriteController));

export default router;