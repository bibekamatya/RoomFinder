'use server';

import { auth } from '../auth';
import { addFavorite } from './favorites';

export async function syncLocalFavorites(localFavoriteIds: string[]) {
  const session = await auth();
  if (!session?.user?.id || localFavoriteIds.length === 0) return;

  try {
    // Add all local favorites to database
    await Promise.all(
      localFavoriteIds.map(roomId => addFavorite(roomId).catch(() => null))
    );
    return { success: true };
  } catch (error) {
    console.error('Failed to sync favorites:', error);
    return { error: 'Failed to sync favorites' };
  }
}
