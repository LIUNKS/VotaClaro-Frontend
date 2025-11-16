export interface PolicyPlanRequest {
	political_party_id: string;
}

export interface CreatePolicyPlanPayload {
	policyPlanRequest: PolicyPlanRequest;
	urlPdf?: File;
}

export interface PolicyPlan {
	id: string;
	political_party_id: string;
	urlPdf: string;
	createdAt?: string;
	updatedAt?: string;
}
