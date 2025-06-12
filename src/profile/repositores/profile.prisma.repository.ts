import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileInputDto } from '../dtos/input/profile.input.dto';
import { Profile } from '../entities/profile.entity';
import { IProfileRepository } from '../interfaces/profile-repository.interface';
import { Profile as ProfilePrisma } from '@prisma/client';

@Injectable()
export class ProfilePrismaRepository implements IProfileRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createProfile(profile: ProfileInputDto): Promise<Profile> {
        const savedProfile = await this.prisma.profile.create({ data: profile });
        return this.toProfile(savedProfile);
    }

    async findProfileById(id: number): Promise<Profile | null> {
        const foundProfile = await this.prisma.profile.findUnique({ where: { id } });
        return foundProfile ? this.toProfile(foundProfile) : null;
    }

    async updateProfile(id: number, profile: ProfileInputDto): Promise<Profile | null> {
        const foundProfile = await this.prisma.profile.findUnique({ where: { id } });
        if (!foundProfile) return null;
        const updatedProfile = await this.prisma.profile.update({ where: { id }, data: profile });
        return this.toProfile(updatedProfile);
    }

    async deleteProfile(id: number): Promise<true | null> {
        const foundProfile = await this.prisma.profile.findUnique({ where: { id } });
        if (!foundProfile) return null;
        await this.prisma.profile.delete({ where: { id } });
        return true;
    }

    private toProfile(profile: ProfilePrisma): Profile {
        return new Profile({
            id: profile.id,
            bio: profile.bio,
            avatar: profile.avatar,
            userId: profile.userId,
        });
    }
}

