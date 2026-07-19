import { useState } from 'react';
import { useLocations, useLocationRankingsPlayers } from '../hooks/useLocationData';

function TopPlayersDashboard() {
    const { data: locationsData } = useLocations();
    const [selectedLocation, setSelectedLocation] = useState<number>(32000006);
    const { data: rankings, isLoading, error } = useLocationRankingsPlayers(selectedLocation);

    return (
        <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>🏆</span> Top Players by Location
            </h2>
            <p className="text-slate-400 text-sm mt-1">Track individual trophy pushing leaders across different server sectors.</p>
        </div>

        {/* Location Filter Dropdown */}
        <div className="flex flex-col gap-1.5 max-w-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Region</label>
            <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(Number(e.target.value))} 
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            >
            {locationsData?.items?.map((loc: any) => (
                <option key={loc.id} value={loc.id} className="bg-slate-950 text-slate-200">
                {loc.name}
                </option>
            ))}
            </select>
        </div>

        {isLoading && <div className="text-slate-400 text-sm animate-pulse">Compiling database rankings...</div>}
        {error && <div className="bg-red-950/30 border border-red-900/50 text-red-400 p-4 rounded-xl text-sm">{error.message}</div>}

        {/* Leaderboard Table */}
        {rankings?.items && (
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-sm shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-400 text-xs font-semibold tracking-wider uppercase border-b border-slate-800">
                    <tr>
                    <th className="p-4 w-20 text-center">Rank</th>
                    <th className="p-4">Player Profile</th>
                    <th className="p-4">Affiliated Clan</th>
                    <th className="p-4 text-right pr-6">Trophies</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                    {rankings.items.map((player: any) => (
                    <tr key={player.tag} className="hover:bg-slate-900/30 transition-colors">
                        <td className="p-4 text-center font-mono font-black text-slate-500">
                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                        </td>
                        <td className="p-4">
                        <div>
                            <p className="font-bold text-slate-200">{player.name}</p>
                            <p className="text-[10px] text-slate-600 font-mono">{player.tag}</p>
                        </div>
                        </td>
                        <td className="p-4">
                        {player.clan ? (
                            <div className="flex items-center gap-2">
                            {player.clan.badgeUrls?.small && (
                                <img src={player.clan.badgeUrls.small} alt="" className="w-5 h-5 object-contain" />
                            )}
                            <span className="text-slate-300 font-medium">{player.clan.name}</span>
                            </div>
                        ) : (
                            <span className="text-slate-600 text-xs italic">No Clan</span>
                        )}
                        </td>
                        <td className="p-4 text-right font-mono font-black text-amber-400 pr-6">
                        🏆 {player.trophies.toLocaleString()}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        )}
        </div>
    );
}

export default TopPlayersDashboard;