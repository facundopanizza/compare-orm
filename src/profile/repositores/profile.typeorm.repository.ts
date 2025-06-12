import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileTypeorm } from '../profile.entity.typeorm';
import { ProfileInputDto } from '../dtos/input/profile.input.dto';
import { IProfileRepository } from '../interfaces/profile-repository.interface';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileTypeormRepository implements IProfileRepository {
  constructor(
    @InjectRepository(ProfileTypeorm)
    private readonly profileRepo: Repository<ProfileTypeorm>,
  ) { }

  async createProfile(profile: ProfileInputDto): Promise<Profile> {
    const entity = this.profileRepo.create(profile);
    const saved = await this.profileRepo.save(entity);
    const createdUser = await this.findProfileById(saved.id)

    return createdUser!;
  }

  async findProfileById(id: number): Promise<Profile | null> {
    const found = await this.profileRepo.findOne({ where: { id }, relations: { user: true } });
    return found ? this.toProfile(found) : null;
  }

  async updateProfile(id: number, profile: ProfileInputDto): Promise<Profile | null> {
    const found = await this.profileRepo.findOne({ where: { id } });
    if (!found) return null;
    Object.assign(found, profile);
    const saved = await this.profileRepo.save(found);
    return this.toProfile(saved);
  }

  async deleteProfile(id: number): Promise<true | null> {
    const result = await this.profileRepo.delete(id);
    return result.affected ? true : null;
  }

  private toProfile(profile: ProfileTypeorm): Profile {
    return new Profile({
      id: profile.id,
      bio: profile.bio,
      avatar: profile.avatar,
      userId: profile.user.id,
    });
  }
}
