import { ArtistRepository } from '../repositories/ArtistRepository';
import dataSource from '../config/dataSource';
import { Artist } from '../models/Artist';

export class ArtistService {
  private artistRepository = ArtistRepository(dataSource);

  async createArtist(name: string, userId?: string | null): Promise<Artist> {
    const artist = new Artist(name, userId ?? null);
    return this.artistRepository.save(artist);
  }

  async getArtists(title?: string, page: number = 1, limit: number = 10) {
    return this.artistRepository.getByFilter(title, page, limit);
  }

  async getArtistById(id: string) {
    return this.artistRepository.getById(id);
  }

  async updateArtist(id: string, updateData: Partial<Artist>) {
    return this.artistRepository.updateArtist(id, updateData);
  }

  async hideArtist(id: string) {
    this.artistRepository.markAsHidden(id);
  }
}
