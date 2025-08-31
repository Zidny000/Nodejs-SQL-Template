import { Request, Response } from 'express';
import { TrackService } from '../services/TrackService';
import { errorLogger } from '../utils/logger';
import { validate } from 'uuid';

export class TrackController {
  private trackService: TrackService;

  constructor() {
    this.trackService = new TrackService();
  }

  async getTracks(req: Request, res: Response) {
    const { title, page = 1, limit = 10 } = req.query;

    try {
      const { tracks, total } = await this.trackService.getTracks(title as string, Number(page), Number(limit));

      if (tracks.length === 0) {
        return res.status(404).json({ message: 'No tracks found' });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        tracks,
      });
    } catch (error) {
      errorLogger.error('Error getting tracks:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getTracksByAlbumId(req: Request, res: Response) {
    const { albumId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!albumId || !validate(albumId)) {
      return res.status(400).json({ message: 'Invalid albumId format' });
    }

    try {
      const { tracks, total } = await this.trackService.getTracksByAlbumId(albumId, Number(page), Number(limit));

      if (tracks.length === 0) {
        return res.status(404).json({ message: 'No tracks found for the specified album' });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        tracks,
      });
    } catch (error) {
      errorLogger.error('Error getting tracks by albumId:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getTracksByArtistId(req: Request, res: Response) {
    const { artistId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!artistId || !validate(artistId)) {
      return res.status(400).json({ message: 'Invalid artistId' });
    }

    try {
      const { tracks, total } = await this.trackService.getTracksByArtistId(artistId, Number(page), Number(limit));

      if (tracks.length === 0) {
        return res.status(404).json({ message: 'No tracks found for this artist' });
      }

      return res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        tracks,
      });
    } catch (error) {
      errorLogger.error('Error getting tracks by artistId:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getTrackById(req: Request, res: Response) {
    const { id: trackId } = req.params;

    if (!trackId || !validate(trackId)) {
      return res.status(400).json({ message: 'Invalid trackId' });
    }

    try {
      const track = await this.trackService.getTrackById(trackId);

      if (!track) {
        return res.status(404).json({ message: 'Track not found' });
      }

      return res.status(200).json(track);
    } catch (error) {
      errorLogger.error('Error getting track by ID:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async createTrack(req: Request, res: Response) {
    const { name, duration, artistId, userId } = req.body;

    if (!name || !duration) {
      return res.status(400).json({ message: 'Name and duration are required' });
    }

    try {
      const newTrack = await this.trackService.createTrack(name, duration, artistId, userId);
      return res.status(201).json(newTrack);
    } catch (error) {
      if (error === 'Artist not found') {
        return res.status(400).json({ message: 'Artist not found' });
      }

      errorLogger.error('Error creating track:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateTrack(req: Request, res: Response) {
    const { id } = req.params;
    const { name, duration, artistId, albumId } = req.body;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid track ID' });
    }

    try {
      const existingTrack = await this.trackService.getTrackById(id);

      if (!existingTrack) {
        return res.status(404).json({ message: 'Track not found' });
      }

      const updatedTrack = await this.trackService.updateTrack(id, { name, duration, artistId, albumId });
      return res.status(200).json(updatedTrack);
    } catch (error) {
      if (error === 'Track not found') {
        return res.status(404).json({ message: 'Track not found' });
      }

      errorLogger.error('Error updating track:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async hideTrack(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.headers;

    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid track ID' });
    }

    try {
      const track = await this.trackService.hideTrack(userId as string, id);

      if (!track) {
        return res.status(404).json({ message: 'Track not found' });
      }

      return res.status(204).send();
    } catch (error) {
      errorLogger.error('Error hiding track:', { error, reqBody: req.body });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
