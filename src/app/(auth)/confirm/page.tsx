'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ConfirmEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      const next = searchParams.get('next') ?? '/sign-in?email=verified';

      if (token_hash && type === 'email') {
        const supabase = createClient();

        const { error } = await supabase.auth.verifyOtp({
          type: 'email',
          token_hash,
        });

        if (!error) {
          router.push(next);
        } else {
          router.push(`/error?message=${error.message}&code=${error.code}&name=${error.name}`);
        }
      } else {
        router.push('/sign-in');
      }
    };

    confirmEmail();
  }, [searchParams, router]);

  return <p>Confirming email...</p>;
}
