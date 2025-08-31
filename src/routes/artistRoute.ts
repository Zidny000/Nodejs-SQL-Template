import { Router } from 'express';
import { ArtistController } from '../controllers/ArtistController';
import { logAction } from '../middlewares/logAction';
import { ActionType, EntityType } from '../models/AccessLog';

const router = Router();
const artistController = new ArtistController();

router.post('/artist', logAction(ActionType.CREATE, EntityType.ARTIST), artistController.createArtist.bind(artistController));
router.get('/artist', logAction(ActionType.READ, EntityType.ARTIST), artistController.getArtists.bind(artistController));
router.get('/artist/:id', logAction(ActionType.READ, EntityType.ARTIST), artistController.getArtistById.bind(artistController));
router.put('/artist/:id', logAction(ActionType.UPDATE, EntityType.ARTIST), artistController.updateArtist.bind(artistController));
router.delete('/artist/:id', logAction(ActionType.DELETE, EntityType.ARTIST), artistController.deleteArtist.bind(artistController));

export default router;
