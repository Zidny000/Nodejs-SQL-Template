import { FavoriteRepository } from '../repositories/FavoriteRepository';
import { EntityType } from '../models/Favorite';
import dataSource from '../config/dataSource';
import { UserRepository } from '../repositories/UserRepository';
import { TrackRepository } from '../repositories/TrackRepository';
import { ArtistRepository } from '../repositories/ArtistRepository';
import { AlbumRepository } from '../repositories/AlbumRepository';
import { Favorite } from '../models/Favorite';
import { validate } from 'uuid';


export class FavoriteService {
  private favoriteRepository = FavoriteRepository(dataSource);
  private userRepository = UserRepository(dataSource);
  private trackRepository = TrackRepository(dataSource);
  private artistRepository = ArtistRepository(dataSource);
  private albumRepository = AlbumRepository(dataSource);

  async getUserFavorites(userId: string) {
    const favorites = await this.favoriteRepository.findAllByUser(userId);

    const artists = [];
    const albums = [];
    const tracks = [];

    for (const fav of favorites) {
      if (fav.entityType === EntityType.ARTIST) {
        const artist = await this.artistRepository.findOne({ where: { id: fav.entityId, hidden: false } });
        if (artist) artists.push(artist);
      } else if (fav.entityType === EntityType.ALBUM) {
        const album = await this.albumRepository.findOne({ where: { id: fav.entityId, hidden: false } });
        if (album) albums.push(album);
      } else if (fav.entityType === EntityType.TRACK) {
        const track = await this.trackRepository.findOne({ where: { id: fav.entityId, hidden: false } });
        if (track) tracks.push(track);
      }
    }

    return {
      artists: artists.map(artist => ({
        name: artist.name,
      })),
      albums: albums.map(album => ({
        name: album.name,
        year: album.year,
      })),
      tracks: tracks.map(track => ({
        name: track.name,
        duration: track.duration,
      })),
    };
  }

  async addTrackToFavorites(userId: string, trackId: string) {
    if (!validate(trackId)) {
      throw 'Invalid UUID';
    }

    const track = await this.trackRepository.findOne({ where: { id: trackId, hidden: false } });
    if (!track) {
      throw 'Track not found';
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw 'User not found';
    }

    const existingFavorite = await this.favoriteRepository.findByUserIdAndEntity(userId, trackId, EntityType.TRACK);
    if (existingFavorite) {
      return 'Track is already in favorites';
    }

    const favorite = new Favorite(trackId, EntityType.TRACK, user);
    await this.favoriteRepository.save(favorite);
    return 'Track added to favorites';
  }

  async removeTrackFromFavorites(userId: string, trackId: string) {
    if (!validate(trackId)) {
      throw 'Invalid UUID';
    }

    const favorite = await this.favoriteRepository.findByUserIdAndEntity(userId, trackId, EntityType.TRACK);
    if (!favorite) {
      throw 'Favorite not found';
    }

    await this.favoriteRepository.remove(favorite);
  }

  async addAlbumToFavorites(userId: string, albumId: string) {
    if (!validate(albumId)) {
      throw new Error('Invalid album ID');
    }

    const album = await this.albumRepository.findOne({ where: { id: albumId, hidden: false } });
    if (!album) {
      throw 'Album not found';
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw 'User not found';
    }

    const existingFavorite = await this.favoriteRepository.findByUserIdAndEntity(userId, albumId, EntityType.ALBUM);
    if (existingFavorite) {
      return 'Album is already in favorites';
    }

    const favorite = new Favorite(albumId, EntityType.ALBUM, user);
    await this.favoriteRepository.save(favorite);

    return { message: 'Album added to favorites', status: 201 };
  }

  async removeAlbumFromFavorites(userId: string, albumId: string) {
    if (!validate(albumId)) {
      throw 'Invalid UUID';
    }

    const favorite = await this.favoriteRepository.findByUserIdAndEntity(userId, albumId, EntityType.ALBUM);
    if (!favorite) {
      throw 'Favorite not found';
    }

    await this.favoriteRepository.remove(favorite);
  }

  async addArtistToFavorites(userId: string, artistId: string) {
    if (!validate(artistId)) {
      throw new Error('Invalid artist ID');
    }

    const artist = await this.artistRepository.findOne({ where: { id: artistId, hidden: false } });
    if (!artist) {
      throw 'Artist not found';
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw 'User not found';
    }

    const existingFavorite = await this.favoriteRepository.findByUserIdAndEntity(userId, artistId, EntityType.ARTIST);
    if (existingFavorite) {
      return 'Artist is already in favorites';
    }

    const favorite = new Favorite(artistId, EntityType.ARTIST, user);
    await this.favoriteRepository.save(favorite);

    return { message: 'Artist added to favorites', status: 201 };
  }

  async removeArtistFromFavorites(userId: string, artistId: string) {
    if (!validate(artistId)) {
      throw 'Invalid UUID';
    }

    const favorite = await this.favoriteRepository.findByUserIdAndEntity(userId, artistId, EntityType.ALBUM);
    if (!favorite) {
      throw 'Favorite not found';
    }

    await this.favoriteRepository.remove(favorite);
  }
}
