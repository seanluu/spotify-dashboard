'use client';

import { useState } from 'react';
import { Header } from './Header';
import { TopArtists } from './TopArtists';
import { TopGenres } from './TopGenres';
import { TopTracks } from './TopTracks';
import { useAuth } from '@/hooks/useAuth';
import { LoginPage } from './LoginPage';

export function Dashboard() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('tracks');
  const [timeRange, setTimeRange] = useState('medium_term');

  const tabs = [
    { id: 'tracks', name: 'Top Tracks', icon: '🎵' },
    { id: 'artists', name: 'Top Artists', icon: '🎤' },
    { id: 'genres', name: 'Top Genres', icon: '🎭' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-spotify-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-spotify-black">
      <Header user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Select time period */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'short_term', label: 'Last 4 weeks' },
              { value: 'medium_term', label: 'Last 6 months' },
              { value: 'long_term', label: 'All time' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  timeRange === range.value
                    ? 'bg-spotify-green text-white'
                    : 'bg-spotify-dark text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-1 bg-spotify-dark p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-spotify-green text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-8">
          {activeTab === 'tracks' && (
            <TopTracks timeRange={timeRange} />
          )}
          
          {activeTab === 'artists' && (
            <TopArtists timeRange={timeRange} />
          )}
          
          {activeTab === 'genres' && (
            <TopGenres timeRange={timeRange} />
          )}
        </div>
      </div>
    </div>
  );
}
