import {
	NodeConnectionTypes,
	type IDataObject, type IHookFunctions, type IWebhookFunctions,
	type INodeType, type INodeTypeDescription, type IWebhookResponseData,
} from 'n8n-workflow';
import { registerLeadinfoWebhook, deleteLeadinfoWebhook, leadinfoWebhookExists } from '../Leadinfo/GenericFunctions';

const TYPE = 'share_contact';

export class LeadinfoShareContact implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Leadinfo — Contact Shared',
		name: 'leadinfoShareContact',
		icon: { light: 'file:../../icons/leadinfo.svg', dark: 'file:../../icons/leadinfo.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Triggers when a contact is shared to n8n from the Leadinfo inbox',
		defaults: { name: 'Leadinfo — Contact Shared' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'leadinfoOAuth2Api', required: true }],
		webhooks: [{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' }],
		properties: [],   // no dropdown — type is fixed per node (like Make's dedicated modules)
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions) { return leadinfoWebhookExists.call(this); },
			async create(this: IHookFunctions) { return registerLeadinfoWebhook.call(this, TYPE); },
			async delete(this: IHookFunctions) { return deleteLeadinfoWebhook.call(this); },
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData() as IDataObject;
		const payload = (body.data ?? body) as IDataObject;   // unwrap {data:…}
		return { workflowData: [this.helpers.returnJsonArray(payload)] };
	}
}