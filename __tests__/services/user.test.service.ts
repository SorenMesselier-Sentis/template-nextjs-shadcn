import { describe, test, expect, beforeEach } from '@jest/globals';

import type { User } from '@/services/getUsersService';
import { GetUsersService } from '@/services/getUsersService';

let testUsers: User[] = [];

beforeEach(async () => {
  testUsers = await GetUsersService.getUsers(5);
});

describe('User Service', () => {
  test('Should return 5 users', async () => {
    expect(testUsers).toHaveLength(5);
    expect(testUsers[0]).toHaveProperty('id');
    expect(testUsers[0]).toHaveProperty('name');
  });

  test('Should create a new user', async () => {
    const newUser = await GetUsersService.createUser({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      birth_date: new Date('1990-01-01'),
    });

    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe('John Doe');
  });

  test('Should update an existing user', async () => {
    const userToUpdate = testUsers[0];
    const updatedUser = await GetUsersService.updateUser(userToUpdate.id, {
      name: 'Updated Name',
    });

    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.name).toBe('Updated Name');
  });

  test('Should delete a user', async () => {
    const userToDelete = testUsers[0];
    const result = await GetUsersService.deleteUser(userToDelete.id);
    expect(result).toBe(true);
  });

  test('Should return false when deleting a non-existent user', async () => {
    const result = await GetUsersService.deleteUser(99999);
    expect(result).toBe(false);
  });
});
