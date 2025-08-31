import { ArtistRepository } from '../repositories/ArtistRepository';
import { FavoriteRepository } from '../repositories/FavoriteRepository';
import { FavoriteService } from './FavoriteService';
import { EntityType } from '../models/Favorite';
import dataSource from '../config/dataSource';
import { Artist } from '../models/Artist';

export class ArtistService {
  private artistRepository = ArtistRepository(dataSource);
  private favoriteRepository = FavoriteRepository(dataSource);
  private favoriteService: FavoriteService;

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

  async hideArtist(userId: string, id: string) {
    // Handle favorites if they exist
    const existingFavorite = await this.favoriteRepository.findByUserIdAndEntity(userId, id, EntityType.ARTIST);
    if (existingFavorite) {
      await this.favoriteService.removeArtistFromFavorites(userId as string, id);
    }

    // Mark artist as hidden
    await this.artistRepository.markAsHidden(id);
    
    // Set artistId to null in all related albums
    await dataSource
      .createQueryBuilder()
      .update('album')
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId: id })
      .execute();
      
    // Set artistId to null in all related tracks  
    await dataSource
      .createQueryBuilder()
      .update('track')
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId: id })
      .execute();
  }
}
