import { faker } from '@faker-js/faker/locale/en_CA';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  birth_date: z.date(),
});

export type User = z.infer<typeof userSchema>;

export interface IGetUsersService {
  getUsers(count: number): Promise<User[]>;
  createUser(user: Omit<User, 'id'>): Promise<User>;
  updateUser(
    id: number,
    updatedData: Partial<Omit<User, 'id'>>
  ): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
}

const usersDB: User[] = []; // Simulated in-memory database

export class GetUsersService {
  static async getUsers(count: number): Promise<User[]> {
    try {
      const users = Array.from({ length: count }, () => {
        const user = userSchema.parse({
          id: faker.number.int(),
          name: faker.person.firstName(),
          username: faker.internet.displayName(),
          email: faker.internet.email(),
          birth_date: faker.date.anytime(),
        });
        usersDB.push(user);
        return user;
      });
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async createUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: faker.number.int() };
    usersDB.push(newUser);
    return newUser;
  }

  static async updateUser(
    id: number,
    updatedData: Partial<Omit<User, 'id'>>
  ): Promise<User | null> {
    const userIndex = usersDB.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    usersDB[userIndex] = { ...usersDB[userIndex], ...updatedData };
    return usersDB[userIndex];
  }

  static async deleteUser(id: number): Promise<boolean> {
    const userIndex = usersDB.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    usersDB.splice(userIndex, 1);
    return true;
  }
}
