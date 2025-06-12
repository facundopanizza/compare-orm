import { Profile } from '../entities/profile.entity';

export interface IProfileRepository {
  createProfile(profile: Partial<Profile>): Promise<Profile>;
  findProfileById(id: number): Promise<Profile | null>;
  updateProfile(id: number, profile: Partial<Profile>): Promise<Profile | null>;
  deleteProfile(id: number): Promise<true | null>;
}
