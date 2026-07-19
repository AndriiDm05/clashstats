import { useQuery } from "@tanstack/react-query";
import { clashClient } from "../api/clashClient";

export function useLocations() {
    return useQuery<any, Error>({
        queryKey: ['locations'],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/locations`);
            return response.data;
        },
    });
}

export function useLocation(locationId: number) {
    return useQuery<any, Error>({
        queryKey: ['location', locationId],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/locations/${locationId}`);
            return response.data;
        },
        enabled: !!locationId, 
    });
}

export function useLocationRankingsClans(locationId: number) {
    return useQuery<any, Error>({
        queryKey: ['locationRankingsClans', locationId],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/locations/${locationId}/rankings/clans`);
            return response.data;
        },
        enabled: !!locationId, 
    });
}

export function useLocationRankingsPlayers(locationId: number) {
    return useQuery<any, Error>({
        queryKey: ['locationRankingsPlayers', locationId],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/locations/${locationId}/rankings/players`);
            return response.data;
        },
        enabled: !!locationId, 
    });
}

export function useLocationRankingsCapitals(locationId: number) {
    return useQuery<any, Error>({
        queryKey: ['locationRankingsCapitals', locationId],
        queryFn: async () => {
            const response = await clashClient.get<any>(`/locations/${locationId}/rankings/capitals`);
            return response.data;
        },
        enabled: !!locationId, 
    });
}