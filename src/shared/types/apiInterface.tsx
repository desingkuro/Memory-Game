export interface ApiLocation {
    name: string;
    url: string;
}

export interface ApiInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface Character {
    id: number;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: CharacterGender;
    origin: ApiLocation;
    location: ApiLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
    state?:boolean;
    uniqueId?:string;
    delete?:boolean;
}

export interface CharactersResponse {
    info: ApiInfo;
    results: Character[];
}

export type TypeApi = 'game' | 'auth';

export interface GetArguments {
    path: string;
    type: TypeApi;
}

export interface PostArguments extends GetArguments {
    data: object;
}