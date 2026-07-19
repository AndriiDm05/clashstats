import { useState } from 'react';

import './index.css';

import PlayerDashboard from './components/PlayerDashboard';
import ClanDashboard from './components/ClanDashboard';
import TopClansDashboard from './components/TopClansDashboard';
import TopPlayersDashboard from './components/TopPlayersDashboard';

type TabType = 'player' | 'clan' | 'top-clans' | 'top-players';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('player');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'player', label: 'Player Stats', icon: '👤' },
    { id: 'clan', label: 'Clan Stats', icon: '🛡️' },
    { id: 'top-clans', label: 'Top Clans', icon: '🏰' },
    { id: 'top-players', label: 'Top Players', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚔️</span>
            <h1 className="text-xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Clash Analytics
            </h1>
          </div>
          
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 border ${
                  activeTab === tab.id
                    ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 shadow-offset-2'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          {activeTab === 'player' && <PlayerDashboard />}
          {activeTab === 'clan' && <ClanDashboard />}
          {activeTab === 'top-clans' && <TopClansDashboard />}
          {activeTab === 'top-players' && <TopPlayersDashboard />}
        </div>
      </main>
    </div>
  );
}

export default App;