import { useState } from 'react';
import { useClan, useClanMembers, useClanCurrentWar, useClanCapitalRaidSeasons } from '../hooks/useClanData';

function ClanDashboard() {
    const [tag, setTag] = useState('');
    const [activeTag, setActiveTag] = useState('');

    const { data: clan, isLoading: loadingClan, error: clanError } = useClan(activeTag);
    const { data: membersList } = useClanMembers(activeTag);
    const { data: currentWar } = useClanCurrentWar(activeTag);
    const { data: capitalRaids } = useClanCapitalRaidSeasons(activeTag);

    return (
        <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span>🛡️</span> Clan Analytics Hub
            </h2>
            <p className="text-slate-400 text-sm mt-1">Extract real-time metrics on current wars, raid outcomes, and track full roster activity profiles.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); if(tag.trim()) setActiveTag(tag.trim()); }} className="flex gap-3 max-w-md">
            <input 
            placeholder="e.g. #2PP92UGVJ" 
            value={tag} 
            onChange={e => setTag(e.target.value)} 
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors" 
            />
            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10">
            Inspect
            </button>
        </form>

        {loadingClan && <div className="text-slate-400 text-sm animate-pulse">Querying Supercell systems...</div>}
        {clanError && <div className="bg-red-950/30 border border-red-900/50 text-red-400 p-4 rounded-xl text-sm">{clanError.message}</div>}

        {clan && (
            <div className="space-y-6">
            
            {/* Header Dashboard Summary */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-center gap-5">
                {clan.badgeUrls?.medium && <img src={clan.badgeUrls.medium} alt="Clan Crest" className="w-16 h-16 object-contain" />}
                <div>
                    <h3 className="text-2xl font-black text-slate-100 tracking-wide">{clan.name}</h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2 max-w-xl">{clan.description || "No description loaded."}</p>
                    <span className="inline-block mt-2 font-mono text-xs text-slate-500">{clan.tag}</span>
                </div>
                </div>

                <div className="flex gap-6 border-l border-slate-800 pl-0 md:pl-6 w-full md:w-auto grid grid-cols-3 md:flex">
                <div className="text-center md:text-left"><p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Level</p><p className="text-lg font-black text-amber-500">{clan.clanLevel}</p></div>
                <div className="text-center md:text-left"><p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Points</p><p className="text-lg font-black text-slate-200">{clan.clanPoints}</p></div>
                <div className="text-center md:text-left"><p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Streak</p><p className="text-lg font-black text-orange-500">{clan.warWinStreak}🔥</p></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* War Standing Box */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2"><span>⚔️</span> War Room State</h4>
                {currentWar && currentWar.state !== 'notInWar' ? (
                    <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-900">
                        <span className="text-xs text-slate-400 font-medium">Match Status</span>
                        <span className="text-xs font-black uppercase text-rose-400 tracking-widest">{currentWar.state}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1">
                        <span className="font-bold text-slate-200 truncate max-w-[140px]">{clan.name}</span>
                        <span className="text-xs font-semibold text-slate-500">VS</span>
                        <span className="font-bold text-slate-200 truncate max-w-[140px]">{currentWar.opponent?.name || 'Searching...'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-950/50 px-4 py-2.5 rounded-xl font-mono text-center">
                        <span className="text-xl font-black text-amber-400">{currentWar.clan?.stars || 0} ⭐</span>
                        <span className="text-xs text-slate-600">SCORE</span>
                        <span className="text-xl font-black text-slate-400">{currentWar.opponent?.stars || 0} ⭐</span>
                    </div>
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm py-4 text-center border border-dashed border-slate-800 rounded-xl">Clan is resting between operational war declarations.</p>
                )}
                </div>

                {/* Capital Raid History Box */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                    <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2"><span>🏰</span> Clan Capital Event</h4>
                    {capitalRaids?.items && capitalRaids.items.length > 0 ? (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-300">Telemetry parsed from the latest weekend event window:</p>
                        <div className="grid grid-cols-2 gap-3 font-mono">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900"><p className="text-[10px] text-slate-500 uppercase">Total Loot</p><p className="text-sm font-black text-amber-400 mt-1">{capitalRaids.items[0].capitalTotalLoot} 🪙</p></div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900"><p className="text-[10px] text-slate-500 uppercase">Attacks Logged</p><p className="text-sm font-black text-slate-200 mt-1">{capitalRaids.items[0].totalAttacks}</p></div>
                        </div>
                    </div>
                    ) : <p className="text-slate-500 text-sm py-4 text-center">No structural capital weekend data detected.</p>}
                </div>
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">👥 Strategic Operational Roster</h4>
                <div className="max-h-72 overflow-y-auto border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-900 text-slate-400 sticky top-0 text-xs font-semibold tracking-wider uppercase border-b border-slate-800">
                    <tr>
                        <th className="p-3.5 w-16 text-center">Rank</th>
                        <th className="p-3.5">Name</th>
                        <th className="p-3.5">Role</th>
                        <th className="p-3.5 text-right pr-6">Trophies</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                    {(membersList?.items || clan.memberList || []).map((member: any) => (
                        <tr key={member.tag} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 text-center font-mono font-bold text-slate-500">{member.clanRank}</td>
                        <td className="p-3.5"><p className="font-bold text-slate-200">{member.name}</p><p className="text-[10px] text-slate-600 font-mono">{member.tag}</p></td>
                        <td className="p-3.5 text-xs text-slate-400 capitalize">{member.role.replace('admin', 'Elder').replace('coLeader', 'Co-Leader')}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-amber-400 pr-6">🏆 {member.trophies}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

            </div>
        )}
        </div>
    );
}

export default ClanDashboard;