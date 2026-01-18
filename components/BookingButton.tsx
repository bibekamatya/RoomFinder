'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function BookingButton({ roomId, ownerId }: { roomId: string; ownerId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (!session) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (session.user.id === ownerId) {
      alert('You cannot book your own property');
      return;
    }

    // Open booking form or navigate to booking page
    router.push(`/property/${roomId}/book`);
  };

  return (
    <Button onClick={handleClick} className="w-full">
      {session ? 'Book Now' : 'Login to Book'}
    </Button>
  );
}
