import { useQuery } from "@tanstack/react-query";
import { clashClient } from "../api/clashClient";
import type { PlayerProfile } from "../types/clash";

// We sanitize the tag (remove #) before sending it to the .NET route
const sanitizeTag = (tag: string) => tag.replace('#', '');

export function usePlayer(playerTag: string) {
    const cleanTag = sanitizeTag(playerTag);

    return useQuery<PlayerProfile, Error>({
        queryKey: ['player', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<PlayerProfile>(`/players/${cleanTag}`);
            return response.data;
        },
        enabled: !!cleanTag, // Only run the query if a tag is provided
    });
}

export function usePlayerLeagueHistory(playerTag: string) {
    const cleanTag = sanitizeTag(playerTag);

    return useQuery<any, Error>({
        queryKey: ['playerLeagueHistory', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/players/${cleanTag}/leaguehistory`);
            return response.data;
        },
        enabled: !!cleanTag,
    });
}

export function usePlayerBattleLog(playerTag: string) {
    const cleanTag = sanitizeTag(playerTag);

    return useQuery<any, Error>({
        queryKey: ['playerBattleLog', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/players/${cleanTag}/battlelog`);
            return response.data;
        },
        enabled: !!cleanTag,
    });
}