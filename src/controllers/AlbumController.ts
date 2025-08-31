import { Request, Response } from 'express';
import { AlbumService } from '../services/AlbumService';
import { errorLogger } from '../utils/logger';
import { validate } from 'uuid';

export class AlbumController {
  private albumService: AlbumService;

  constructor() {
    this.albumService = new AlbumService();
  }

  async createAlbum(req: Request, res: Response) {
    const { name, year, artistId } = req.body;

    if (!name || !year) {
      return res.status(400).json({ message: 'Name and year are required fields' });
    }

    try {
      const newAlbum = await this.albumService.createAlbum(name, year, artistId || null);
      return res.status(201).json(newAlbum);
    } catch (error) {
      errorLogger.error('Error creating album:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAlbums(req: Request, res: Response) {
    const { title, year, page = 1, limit = 10 } = req.query;

    try {
      const { albums, total } = await this.albumService.getAlbums(
        title as string,
        year ? Number(year) : undefined,
        Number(page),
        Number(limit)
      );

      if (albums.length === 0) {
        return res.status(404).json({ message: 'No albums found' });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        albums,
      });
    } catch (error) {
      errorLogger.error('Error getting albums:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAlbumById(req: Request, res: Response) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
    }

    try {
      const album = await this.albumService.getAlbumById(id);

      if (!album) {
        return res.status(404).json({ message: `No album found with ID: ${id}` });
      }

      return res.status(200).json(album);
    } catch (error) {
      errorLogger.error('Error getting album:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAlbumsByArtistId(req: Request, res: Response) {
    const { artistId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!validate(artistId)) {
      return res.status(400).json({ message: 'Invalid artist ID' });
    }

    try {
      const { albums, total } = await this.albumService.getAlbumsByArtistId(
        artistId,
        Number(page),
        Number(limit)
      );

      if (albums.length === 0) {
        return res.status(404).json({ message: `No albums found for artist ID: ${artistId}` });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        albums,
      });
    } catch (error) {
      errorLogger.error('Error getting albums by artist:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateAlbum(req: Request, res: Response) {
    const { id } = req.params;
    const { name, year, artistId } = req.body;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
    }

    try {
      const existingAlbum = await this.albumService.getAlbumById(id);

      if (!existingAlbum) {
        return res.status(404).json({ message: 'Album not found' });
      }

      const updatedAlbum = await this.albumService.updateAlbum(id, { name, year, artistId });

      return res.status(200).json(updatedAlbum);
    } catch (error) {
      errorLogger.error('Error updating album:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteAlbum(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
    }

    try {

      const existingAlbum = await this.albumService.getAlbumById(id);

      if (!existingAlbum) {
        return res.status(404).json({ message: 'Album not found' });
      }

      await this.albumService.hideAlbum(userId as string, id);

      return res.status(204).send();
    } catch (error) {
      errorLogger.error('Error hiding album:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
