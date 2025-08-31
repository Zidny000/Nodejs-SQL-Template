import { Request, Response } from 'express';
import { ArtistService } from '../services/ArtistService';
import { errorLogger } from '../utils/logger';
import { validate } from 'uuid';

export class ArtistController {
  private artistService: ArtistService;

  constructor() {
    this.artistService = new ArtistService();
  }

  async createArtist(req: Request, res: Response) {
    const { name, userId } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Artist name is required' });
    }

    try {
      const newArtist = await this.artistService.createArtist(name, userId);

      return res.status(201).json(newArtist);
    } catch (error) {
      errorLogger.error('Error creating artist:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getArtists(req: Request, res: Response) {
    const { title, page = 1, limit = 10 } = req.query;

    try {
      const { artists, total } = await this.artistService.getArtists(title as string, Number(page), Number(limit));

      if (artists.length === 0) {
        return res.status(404).json({ message: 'No artists found' });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        artists,
      });
    } catch (error) {
      errorLogger.error('Error getting artists:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getArtistById(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid artist ID' });
    }

    try {
      const artist = await this.artistService.getArtistById(id);

      if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
      }

      return res.status(200).json(artist);
    } catch (error) {
      errorLogger.error('Error getting artist by ID:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateArtist(req: Request, res: Response) {
    const { id } = req.params;
    const { name, userId } = req.body;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid artist ID' });
    }

    try {
      const existingArtist = await this.artistService.getArtistById(id);

      if (!existingArtist) {
        return res.status(404).json({ message: 'Artist not found' });
      }

      const updatedArtist = await this.artistService.updateArtist(id, { name, userId });

      return res.status(200).json(updatedArtist);
    } catch (error) {
      errorLogger.error('Error updating artist:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteArtist(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid artist ID' });
    }

    try {
      const existingArtist = await this.artistService.getArtistById(id);

      if (!existingArtist) {
        return res.status(404).json({ message: 'Artist not found' });
      }

      await this.artistService.hideArtist(userId as string, id);

      return res.status(204).send();
    } catch (error) {
      errorLogger.error('Error hiding artist:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
