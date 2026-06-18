import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable() // The @Injectable() decorator is used to mark the ProfilesService class as a provider that can be injected into other parts of the application. This allows you to use dependency injection to manage the lifecycle of the service and its dependencies. In a real application, you would typically implement methods in the ProfilesService class to handle business logic related to profiles, such as fetching profiles from a database, creating new profiles, updating existing profiles, and deleting profiles. The service would then be injected into the ProfilesController to handle incoming requests and return responses based on the business logic defined in the service.
export class ProfilesService {
    private profiles = [
        {
          id: randomUUID(),
      name: 'Brianna Watts',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let’s commit to something beautiful together.`
    },
    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: `Seeking a partner in crime to compile my heart. Must be comfortable with the terminal because I only speak fluent bash. Swipe right if you can appreciate a good kernel panic every now and then.`
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: `You think you know VIM? Try Neovim. I'll make your modal dreams come true. Want to escape the matrix and explore the perfect keyboard shortcut for love?`  
        }
    ];

    findAll(){
        return this.profiles;
    }

    findOne(id: string){
        return this.profiles.find((profile) => profile.id === id);
    }

    create(createProfileDto: CreateProfileDto){
        const createdProfile = {
            id: randomUUID(),
            ...createProfileDto
        };
        this.profiles.push(createdProfile);
        return createdProfile;
    }

    update(id: string, updateProfileDto: any){
        const profileIndex = this.profiles.findIndex((profile) => profile.id === id);
        if (profileIndex !== -1) {
            this.profiles[profileIndex] = { ...this.profiles[profileIndex], ...updateProfileDto };
            return this.profiles[profileIndex];
        }
        return null;
    }

    delete(id: string){
        const profileIndex = this.profiles.findIndex((profile) => profile.id === id);
        if (profileIndex !== -1) {
            this.profiles.splice(profileIndex, 1);
            return true;
        }
        return false;
    }

}