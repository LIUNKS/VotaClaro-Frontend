export interface PoliticalPartyRequest {
	name: string;
	ideology: string;
	members: string;
	location: string;
	description: string;
	dateFoundation: string;
}

export interface CreatePoliticalPartyPayload {
	politicalPartyRequest: PoliticalPartyRequest;
	urlLogo: File;
	urlListMembers: File;
}

export interface PoliticalParty {
	id: string;
	name: string;
	ideology: string;
	members: string;
	location: string;
	description: string;
	dateFoundation: string;
	urlLogo: string;
	urlListMembers: string;
	createdAt?: string;
	updatedAt?: string;
}
