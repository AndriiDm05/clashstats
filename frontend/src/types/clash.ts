export type BadgeUrls = {
    small: string;
    large: string;
    medium: string;
}

export type IconUrls = {
    small: string;
    large: string;
}

export type ClanHeader = {
    tag: string;
    name: string;
    clanLevel: number;
    badgeUrls: BadgeUrls;
}

export type PlayerProfile = {
    tag: string;
    name: string;
    townHallLevel: number;
    expLevel: number;
    trophies: number;
    bestTrophies: number;
    warStars: number;
    clan?: ClanHeader;
    donations?: number;
    donationsReceived?: number;
    leagueTier: {
        id: number;
        name: string;
        iconUrls: IconUrls;
    };
    troops: Array<{
        name: string;
        level: number;
        maxLevel: number;
        village: 'home' | 'builderBase';
    }>;
    heroes: Array<{
        name: string;
        level: number;
        maxLevel: number;
        village: 'home' | 'builderBase';
    }>;
}

export type ClanProfile = {
    tag: string;
    name: string;
    type: 'open' | 'inviteOnly' | 'closed';
    description: string;
    badgeUrls: BadgeUrls;
    clanLevel: number;
    clanPoints: number;
    requiredTrophies: number;
    isWarLogPublic: boolean;
    warWinStreak: number;
    warWins?: number;
    warTies?: number;
    warLosses?: number;
    members: number;
    memberList: Array<{
        tag: string;
        name: string;
        role: string;
        expLevel: number;
        trophies: number;
        clanRank: number;
        donations: number;
        donationsReceived: number;
    }>;
}