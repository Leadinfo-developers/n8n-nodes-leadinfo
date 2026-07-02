import type { IHookFunctions, IDataObject } from 'n8n-workflow';

const BASE_URL = 'https://api.leadinfo.com';

export async function registerLeadinfoWebhook(this: IHookFunctions, type: string): Promise<boolean> {
	const url = this.getNodeWebhookUrl('default') as string;
	const res = (await this.helpers.httpRequestWithAuthentication.call(this, 'leadinfoOAuth2Api', {
		method: 'PUT',
		url: `${BASE_URL}/v1/webhook/${type}`,   // type-path (dedicated), like Make
		body: { url, integration: 'n8n_app' },    // no "type" in body — it's in the path
		json: true,
	})) as IDataObject;
	this.getWorkflowStaticData('node').webhookId = res.value;
	return true;
}

export async function deleteLeadinfoWebhook(this: IHookFunctions): Promise<boolean> {
	const data = this.getWorkflowStaticData('node');
	if (data.webhookId !== undefined) {
		await this.helpers.httpRequestWithAuthentication.call(this, 'leadinfoOAuth2Api', {
			method: 'DELETE',
			url: `${BASE_URL}/v1/webhook/${data.webhookId}`,
			json: true,
		});
		delete data.webhookId;
	}
	return true;
}

export function leadinfoWebhookExists(this: IHookFunctions): boolean {
	return this.getWorkflowStaticData('node').webhookId !== undefined;
}