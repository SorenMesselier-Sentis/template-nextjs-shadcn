import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { GetUsersService } from '@/services/getUsersService';

export const GET = async () => {
  try {
    const users = await GetUsersService.getUsers(5);
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newUser = await GetUsersService.createUser(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id, ...updatedData } = body;
    const updatedUser = await GetUsersService.updateUser(id, updatedData);

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    const success = await GetUsersService.deleteUser(id);

    if (!success) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
