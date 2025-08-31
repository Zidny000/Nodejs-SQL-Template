import { Request, Response } from 'express';
import { FavoriteService } from '../services/FavoriteService';
import { errorLogger } from '../utils/logger';

export class FavoriteController {
  private favoriteService: FavoriteService;

  constructor() {
    this.favoriteService = new FavoriteService();
  }

  async getUserFavorites(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const favorites = await this.favoriteService.getUserFavorites(id);
      return res.status(200).json(favorites);
    } catch (error) {
      errorLogger.error('Error getting user favorites:', { error, userId: id });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async addTrackToFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    try {
      const message = await this.favoriteService.addTrackToFavorites(userId as string, id);
      return res.status(201).json({ message });
    } catch (error) {
      if (error === 'Invalid UUID') {
        return res.status(400).json({ message: 'Invalid track ID' });
      } else if (error === 'Track not found') {
        return res.status(422).json({ message: 'Track not found' });
      } else {
        errorLogger.error('Error adding track to favorites:', { error, userId, trackId: id });
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async removeTrackFromFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    try {
      const message = await this.favoriteService.removeTrackFromFavorites(userId as string, id);
      return res.status(204).send();
    } catch (error) {
      if (error === 'Invalid UUID') {
        return res.status(400).json({ message: 'Invalid track ID' });
      } else if (error === 'Favorite not found') {
        return res.status(404).json({ message: 'Track not in favorites' });
      } else {
        errorLogger.error('Error removing track from favorites:', { error, userId, trackId: id });
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async addAlbumToFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    try {
      const message = await this.favoriteService.addAlbumToFavorites(userId as string, id);
      return res.status(201).json({ message });
    } catch (error) {
      if (error === 'Invalid UUID') {
        return res.status(400).json({ message: 'Invalid album ID' });
      } else if (error === 'Album not found') {
        return res.status(422).json({ message: 'Album not found' });
      } else {
        errorLogger.error('Error adding album to favorites:', { error, userId, albumId: id });
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async removeAlbumFromFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    try {
      await this.favoriteService.removeAlbumFromFavorites(userId as string, id);
      return res.status(204).send();
    } catch (error) {
      if (error === 'Invalid UUID') {
        return res.status(400).json({ message: 'Invalid album ID' });
      } else if (error === 'Favorite not found') {
        return res.status(404).json({ message: 'Album not in favorites' });
      } else {
        errorLogger.error('Error removing album from favorites:', { error, userId, albumId: id });
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async addArtistToFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    try {
      const message = await this.favoriteService.addArtistToFavorites(userId as string, id);
      return res.status(201).json({ message });
    } catch (error) {
      if (error === 'Invalid UUID') {
        return res.status(400).json({ message: 'Invalid artist ID' });
      } else if (error === 'Artist not found') {
        return res.status(422).json({ message: 'Artist not found' });
      } else {
        errorLogger.error('Error adding artist to favorites:', { error, userId, artistId: id });
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async removeArtistFromFavorites(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    try {
      await this.favoriteService.removeArtistFromFavorites(userId as string, id);
      return res.status(204).send();
    } catch (error) {
      if (error === 'Invalid UUID') {
        return res.status(400).json({ message: 'Invalid artist ID' });
      } else if (error === 'Favorite not found') {
        return res.status(404).json({ message: 'Artist not in favorites' });
      } else {
        errorLogger.error('Error removing artist from favorites:', { error, userId, artistId: id });
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}