import { useQuery } from "@tanstack/react-query";
import { clashClient } from "../api/clashClient";
import type { ClanProfile } from "../types/clash";

// We sanitize the tag (remove #) before sending it to the .NET route
const sanitizeTag = (tag: string) => tag.replace('#', '');

export function useClan(clanTag: string) {
    const cleanTag = sanitizeTag(clanTag);

    return useQuery<ClanProfile, Error>({
        queryKey: ['clan', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<ClanProfile>(`/clans/${cleanTag}`);
            return response.data;
        },
        enabled: !!cleanTag, 
    });
}

export function useClanWarLog(clanTag: string) {
    const cleanTag = sanitizeTag(clanTag);

    return useQuery<any, Error>({
        queryKey: ['clanWarLog', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/clans/${cleanTag}/warlog`);
            return response.data;
        },
        enabled: !!cleanTag, 
    });
}

export function useClanCurrentWar(clanTag: string) {
    const cleanTag = sanitizeTag(clanTag);

    return useQuery<any, Error>({
        queryKey: ['clanCurrentWar', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/clans/${cleanTag}/currentwar`);
            return response.data;
        },
        enabled: !!cleanTag, 
    });
}

export function useClanMembers(clanTag: string) {
    const cleanTag = sanitizeTag(clanTag);

    return useQuery<any, Error>({
        queryKey: ['clanMembers', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/clans/${cleanTag}/members`);
            return response.data;
        },
        enabled: !!cleanTag, 
    });
}

export function useClanCapitalRaidSeasons(clanTag: string) {
    const cleanTag = sanitizeTag(clanTag);

    return useQuery<any, Error>({
        queryKey: ['clanCapitalRaidSeasons', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/clans/${cleanTag}/capitalraidseasons`);
            return response.data;
        },
        enabled: !!cleanTag, 
    });
}

export function useClanCurrentWarLeagueGroup(clanTag: string) {
    const cleanTag = sanitizeTag(clanTag);

    return useQuery<any, Error>({
        queryKey: ['clanCurrentWarLeagueGroup', cleanTag],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/clans/${cleanTag}/currentwar/leaguegroup`);
            return response.data;
        },
        enabled: !!cleanTag, 
    });
}