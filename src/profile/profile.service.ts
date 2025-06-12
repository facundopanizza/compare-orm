import { Inject, Injectable } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { IProfileRepository } from './interfaces/profile-repository.interface';

const PROFILE_REPOSITORY = 'PROFILE_REPOSITORY';

@Injectable()
export class ProfileService {
    constructor(@Inject(PROFILE_REPOSITORY) private profileRepository: IProfileRepository) { }

    async createProfile(profile: Partial<Profile>): Promise<Profile> {
        return this.profileRepository.createProfile(profile);
    }

    async findProfileById(id: number): Promise<Profile> {
        const foundProfile = await this.profileRepository.findProfileById(id);
        if (!foundProfile) {
            throw new Error('Profile not found');
        }
        return foundProfile;
    }

    async updateProfile(id: number, profile: Partial<Profile>): Promise<Profile> {
        const updatedProfile = await this.profileRepository.updateProfile(id, profile);
        if (!updatedProfile) {
            throw new Error('Profile not found');
        }
        return updatedProfile;
    }

    async deleteProfile(id: number): Promise<true> {
        const deleted = await this.profileRepository.deleteProfile(id);
        if (!deleted) {
            throw new Error('Profile not found');
        }
        return true;
    }
}
