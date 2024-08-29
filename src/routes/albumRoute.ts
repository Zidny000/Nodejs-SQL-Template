import { Router } from 'express';
import { AlbumController } from '../controllers/AlbumController';

const router = Router();
const albumController = new AlbumController();

router.post('/album', albumController.createAlbum.bind(albumController));
router.get('/album', albumController.getAlbums.bind(albumController));
router.get('/album/:id', albumController.getAlbumById.bind(albumController));
router.get('/album/by-artist/:artistId', albumController.getAlbumsByArtistId.bind(albumController));

export default router;
