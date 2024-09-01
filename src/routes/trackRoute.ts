import { Router } from 'express';
import { TrackController } from '../controllers/TrackController';

const router = Router();
const trackController = new TrackController();

router.get('/track', trackController.getTracks.bind(trackController));
router.get('track/by-album/:albumId', trackController.getTracksByAlbumId.bind(trackController));
router.get('/track/by-artist/:artistId', trackController.getTracksByArtistId.bind(trackController));
router.get('/track/:id', trackController.getTrackById.bind(trackController));
router.post('/track', trackController.createTrack.bind(trackController));
router.put('/track/:id', trackController.updateTrack.bind(trackController));
router.delete('/track/:id', trackController.hideTrack.bind(trackController));

export default router;
