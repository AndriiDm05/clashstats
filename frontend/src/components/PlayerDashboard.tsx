import { useState } from 'react';
import { usePlayer, usePlayerBattleLog } from '../hooks/usePlayerData';

function PlayerDashboard() {
    const [tag, setTag] = useState('');
    const [activeTag, setActiveTag] = useState('');

    const { data: player, isLoading: loadingProfile, error: profileError } = usePlayer(activeTag);
    const { data: battleLog } = usePlayerBattleLog(activeTag);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <span>👤</span> Player Profile Search
                </h2>
                <p className="text-slate-400 text-sm mt-1">Track comprehensive home village statistics, heroes, and real-time battle history.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if(tag.trim()) setActiveTag(tag.trim()); }} className="flex gap-3 max-w-md">
                <input 
                placeholder="e.g. #Y88P8VR0L" 
                value={tag} 
                onChange={e => setTag(e.target.value)} 
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors" 
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10">
                Search
                </button>
            </form>

            {loadingProfile && <div className="text-slate-400 text-sm animate-pulse">Querying live game servers...</div>}
            {profileError && <div className="bg-red-950/30 border border-red-900/50 text-red-400 p-4 rounded-xl text-sm">{profileError.message}</div>}

            {player && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                    {/* Column 1: Core Summary Card */}
                    <div className="md:col-span-1 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Profile Summary</span>
                            <h3 className="text-2xl font-black text-slate-100 mt-1 break-all">{player.name}</h3>
                            <p className="text-slate-500 text-xs mt-0.5 font-mono">{player.tag}</p>
                            
                            <div className="mt-6 space-y-3.5 text-sm">
                                <div className="flex justify-between border-b border-slate-900 pb-2"><span className="text-slate-400">Town Hall</span><span className="font-bold text-slate-200">Level {player.townHallLevel}</span></div>
                                <div className="flex justify-between border-b border-slate-900 pb-2"><span className="text-slate-400">Current Trophies</span><span className="font-bold text-amber-400">🏆 {player.trophies}</span></div>
                                <div className="flex justify-between border-b border-slate-900 pb-2"><span className="text-slate-400">Highest Trophies</span><span className="font-bold text-slate-300">⭐ {player.bestTrophies}</span></div>
                                <div className="flex justify-between border-b border-slate-900 pb-2"><span className="text-slate-400">War Stars</span><span className="font-bold text-orange-400">🔥 {player.warStars}</span></div>
                            </div>
                        </div>

                        {player.clan && (
                        <div className="mt-6 p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-3">
                            <span className="text-lg">🛡️</span>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Active Clan Association</p>
                                <p className="text-sm font-bold text-slate-200">{player.clan.name} <span className="text-xs font-normal text-slate-400">(Lvl {player.clan.clanLevel})</span></p>
                            </div>
                        </div>
                        )}
                    </div>

                    {/* Column 2 & 3: Roster and Activity */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Hero Roster */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                            <h4 className="text-sm font-bold tracking-wider text-slate-300 uppercase mb-4 flex items-center gap-2">
                                <span>🦸</span> Hero Units & Roster
                            </h4>
                            {player.heroes?.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {player.heroes.filter(h => h.village === 'home').map(hero => (
                                        <div key={hero.name} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                                            <span className="text-xs font-medium text-slate-400 truncate">{hero.name}</span>
                                            <div className="flex items-baseline gap-1 mt-1">
                                                <span className="text-lg font-black text-slate-100">{hero.level}</span>
                                                <span className="text-xs text-slate-600">/{hero.maxLevel}</span>
                                            </div>
                                            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                                                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: `${(hero.level / hero.maxLevel) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-slate-500 text-sm">No operational hero analytics tracked.</p>}
                        </div>

                        {/* Battle Log */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                            <h4 className="text-sm font-bold tracking-wider text-slate-300 uppercase mb-4 flex items-center gap-2">
                                <span>⚔️</span> Live Legend Match History
                            </h4>
                            {battleLog && battleLog.length > 0 ? (
                                <div className="divide-y divide-slate-800">
                                    {battleLog.slice(0, 3).map((log: any, idx: number) => (
                                        <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-sm">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-200 capitalize">{log.battleType}</span>
                                                <span className="text-xs text-slate-500">Destruction: {log.destructionPercentage}%</span>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                                                log.result === 'win' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50' : 'bg-slate-950 text-slate-400 border border-slate-800'
                                            }`}>
                                            {log.result ? log.result.toUpperCase() : 'CLOSED'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-slate-500 text-sm">No live tracking metrics found (Requires Legend League activity).</p>}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default PlayerDashboard;