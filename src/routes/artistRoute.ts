import { Router } from 'express';
import { ArtistController } from '../controllers/ArtistController';

const router = Router();
const artistController = new ArtistController();

router.post('/artist', artistController.createArtist.bind(artistController));
router.get('/artist', artistController.getArtists.bind(artistController));
router.get('/artist/:id', artistController.getArtistById.bind(artistController));
router.put('/artist/:id', artistController.updateArtist.bind(artistController));
router.delete('/artist/:id', artistController.deleteArtist.bind(artistController));

export default router;
