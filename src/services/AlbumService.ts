import { AlbumRepository } from '../repositories/AlbumRepository';
import { FavoriteRepository } from '../repositories/FavoriteRepository';
import { FavoriteService } from './FavoriteService';
import { EntityType } from '../models/Favorite';
import dataSource from '../config/dataSource';
import { Album } from '../models/Album';

export class AlbumService {
  private albumRepository = AlbumRepository(dataSource);
  private favoriteRepository = FavoriteRepository(dataSource);
  private favoriteService: FavoriteService;

  async createAlbum(name: string, year: number, artistId?: string | null): Promise<Album> {
    const album = new Album(name, year, artistId ?? null);
    return this.albumRepository.save(album);
  }

  async getAlbums(title?: string, year?: number, page: number = 1, limit: number = 10) {
    return this.albumRepository.getByFilter(title, year, page, limit);
  }

  async getAlbumById(id: string) {
    return this.albumRepository.getById(id);
  }

  async getAlbumsByArtistId(artistId: string, page: number = 1, limit: number = 10) {
    return this.albumRepository.getByArtistId(artistId, page, limit);
  }

  async updateAlbum(id: string, updateData: Partial<Album>) {
    return this.albumRepository.updateAlbum(id, updateData);
  }

  async hideAlbum(userId: string, id: string) {
    const existingFavorite = await this.favoriteRepository.findByUserIdAndEntity(userId, id, EntityType.ARTIST);
    if (existingFavorite) {
      await this.favoriteService.removeArtistFromFavorites(userId as string, id);
    }

    this.albumRepository.markAsHidden(id);
  }
}
