import { Router } from 'express';
import { TrackController } from '../controllers/TrackController';
import { logAction } from '../middlewares/logAction';
import { ActionType, EntityType } from '../models/AccessLog';

const router = Router();
const trackController = new TrackController();

router.get('/track', logAction(ActionType.READ, EntityType.TRACK), trackController.getTracks.bind(trackController));
router.get('track/by-album/:albumId', logAction(ActionType.READ, EntityType.TRACK), trackController.getTracksByAlbumId.bind(trackController));
router.get('/track/by-artist/:artistId', logAction(ActionType.READ, EntityType.TRACK), trackController.getTracksByArtistId.bind(trackController));
router.get('/track/:id', logAction(ActionType.READ, EntityType.TRACK), trackController.getTrackById.bind(trackController));
router.post('/track', logAction(ActionType.CREATE, EntityType.TRACK), trackController.createTrack.bind(trackController));
router.put('/track/:id', logAction(ActionType.UPDATE, EntityType.TRACK), trackController.updateTrack.bind(trackController));
router.delete('/track/:id', logAction(ActionType.DELETE, EntityType.TRACK), trackController.hideTrack.bind(trackController));

export default router;
