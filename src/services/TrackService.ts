import { TrackRepository } from '../repositories/TrackRepository';
import { ArtistRepository } from '../repositories/ArtistRepository';
import { Track } from '../models/Track';
import dataSource from '../config/dataSource';

export class TrackService {
  private trackRepository = TrackRepository(dataSource);
  private artistRepository = ArtistRepository(dataSource);

  async getTracks(title?: string, page: number = 1, limit: number = 10) {
    return this.trackRepository.getByFilter(title, page, limit);
  }

  async getTracksByAlbumId(albumId: string, page: number = 1, limit: number = 10) {
    return this.trackRepository.getByAlbumId(albumId, page, limit);
  }

  async getTracksByArtistId(artistId: string, page: number = 1, limit: number = 10) {
    return this.trackRepository.getByArtistId(artistId, page, limit);
  }

  async getTrackById(trackId: string) {
    return this.trackRepository.getById(trackId);
  }

  async createTrack(name: string, duration: number, artistId?: string, userId?: string, albumId?: string) {
    let artist;

    if (artistId) {
      artist = await this.artistRepository.getById(artistId);
      if (!artist) throw 'Artist not found';
    } else if (userId) {
      artist = await this.artistRepository.getByUserId(userId);
      if (!artist) {
        artist = this.artistRepository.create({ name: 'New Artist', userId });
        artist = await this.artistRepository.save(artist);
      }
    }

    const trackData = {
      name,
      duration,
      artistId: artist?.id || null,
    };

    const track = new Track(name, artistId ?? null, albumId ?? null);
    return this.artistRepository.save(track);
  }

  async updateTrack(id: string, updateData: Partial<{ name: string; duration: number; artistId: string | null; albumId: string | null }>) {
    return this.trackRepository.updateTrack(id, updateData);
  }

  async hideTrack(id: string): Promise<Track | null> {
    return this.trackRepository.markAsHidden(id);
  }

}
