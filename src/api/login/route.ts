import type { APIRoute } from 'astro';
import { db } from '../../db';
import { usersTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const post: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    // Find user
    const users = await db.select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }), 
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, users[0].password);
    if (!validPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }), 
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Login successful',
        user: { email: users[0].email }
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Login failed' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
