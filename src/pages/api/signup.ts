import type { APIRoute } from 'astro';
import { db } from '../../db';
import { usersTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    if (!request.body) {
      throw new Error('No request body');
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }), 
        { status: 400, headers }
      );
    }

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
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers }
    );
  }
};
