'use client';

import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="bg-spotify-dark border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              🎵 Spotify Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">{user.display_name}</span>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}