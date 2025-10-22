import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  // Create a new user
  createUser(name: string, email: string, password: string, role = 'user'): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      password,
      role,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Find user by email
  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  // Return all users (for testing)
  findAll(): User[] {
    return this.users;
  }
}
