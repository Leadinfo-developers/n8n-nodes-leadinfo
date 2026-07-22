import {
	NodeConnectionTypes,
	type IDataObject, type IHookFunctions, type IWebhookFunctions,
	type INodeType, type INodeTypeDescription, type IWebhookResponseData,
} from 'n8n-workflow';
import { registerLeadinfoWebhook, deleteLeadinfoWebhook, leadinfoWebhookExists } from '../Leadinfo/GenericFunctions';

const TYPE = 'trigger_contact';

export class LeadinfoTriggerContact implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Leadinfo — Contact Triggered',
		name: 'leadinfoTriggerContact',
		icon: 'file:../../icons/leadinfo.svg',
		subtitle: 'Contact Triggered',
		usableAsTool: true,
		group: ['trigger'],
		version: 1,
		description: 'Triggers when a contact is triggered to n8n from the Leadinfo inbox',
		defaults: { name: 'Leadinfo — Contact Triggered' },
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