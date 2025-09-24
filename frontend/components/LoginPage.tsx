'use client';

import { useAuth } from '@/hooks/useAuth';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center">
            <MusicalNoteIcon className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Spotify Dashboard
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          View your music stats and create playlists
        </p>

        <button
          onClick={login}
          className="btn-primary text-lg px-8 py-4 font-bold hover:scale-105 transform transition-all duration-200"
        >
          Connect with Spotify
        </button>
        <p className="text-gray-400 mt-4 text-sm">
          We will only access your public profile and listening data
        </p>
      </div>
    </div>
  );
}
