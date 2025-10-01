'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { exchangeCodeForTokens } from '@/lib/spotifyAuth';
import Cookies from 'js-cookie';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage('Access denied. Please try again.');
        return;
      }

      if (!code) {
        setStatus('error');
        setErrorMessage('No authorization code received.');
        return;
      }

      // Exchange code for tokens directly with Spotify
      const { access_token, expires_in } = await exchangeCodeForTokens(code);

      // Store tokens in cookies (no domain restriction for localhost/127.0.0.1 compatibility)
      
      Cookies.set('spotify_access_token', access_token, {
        expires: new Date(Date.now() + expires_in * 1000),
        secure: false,
        sameSite: 'lax',
        path: '/',
        // Don't set domain to allow access from both localhost and 127.0.0.1
      });
      

      setStatus('success');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        // Use current origin instead of hardcoded URL
        window.location.href = window.location.origin + '/';
      }, 2000);

    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to authenticate with Spotify. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-spotify-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Failed</h1>
          <p className="text-gray-400 mb-6">{errorMessage}</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Successfully Connected!</h1>
        <p className="text-gray-400 mb-6">Redirecting to your dashboard...</p>
        <div className="w-8 h-8 border-2 border-spotify-green border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
