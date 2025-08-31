import { Router } from 'express';
import { AlbumController } from '../controllers/AlbumController';
import { logAction } from '../middlewares/logAction';
import { ActionType, EntityType } from '../models/AccessLog';

const router = Router();
const albumController = new AlbumController();

router.post('/album', logAction(ActionType.CREATE, EntityType.ALBUM), albumController.createAlbum.bind(albumController));
router.get('/album', logAction(ActionType.READ, EntityType.ALBUM), albumController.getAlbums.bind(albumController));
router.get('/album/:id', logAction(ActionType.READ, EntityType.ALBUM), albumController.getAlbumById.bind(albumController));
router.get('/album/by-artist/:artistId', logAction(ActionType.READ, EntityType.ALBUM), albumController.getAlbumsByArtistId.bind(albumController));
router.put('/album/:id', logAction(ActionType.UPDATE, EntityType.ALBUM), albumController.updateAlbum.bind(albumController));
router.delete('/album/:id', logAction(ActionType.DELETE, EntityType.ALBUM), albumController.deleteAlbum.bind(albumController));

export default router;
