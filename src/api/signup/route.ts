import type { APIRoute } from 'astro';
import { db } from '../../db';
import { usersTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const { email, password } = await request.json();

    const existingUsers = await db.select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUsers.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }), 
        { status: 400, headers }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.insert(usersTable)
      .values({
        email,
        password: hashedPassword,
      })
      .returning();

    return new Response(
      JSON.stringify({ 
        success: true,
        user: { email: newUser[0].email }
      }), 
      { status: 201, headers }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create account' }), 
      { status: 500, headers }
    );
  }
};
