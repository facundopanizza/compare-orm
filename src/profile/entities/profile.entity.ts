export class Profile {
  id: number;
  bio?: string | null;
  avatar?: string | null;
  userId: number;

  constructor(profile: Profile) {
    this.bio = profile.bio;
    this.avatar = profile.avatar;
    this.userId = profile.userId;
  }
}
