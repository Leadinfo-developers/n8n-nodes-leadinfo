import {
	NodeConnectionTypes,
	type IDataObject,
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
} from 'n8n-workflow';

const BASE_URL = 'https://api.leadinfo.com';

export class LeadinfoTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Leadinfo Trigger',
		name: 'leadinfoTrigger',
		icon: { light: 'file:leadinfo.svg', dark: 'file:leadinfo.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when Leadinfo identifies a company or contact',
		defaults: {
			name: 'Leadinfo Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'leadinfoOAuth2Api',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'trigger',
				description: 'Which Leadinfo event should start this workflow',
				options: [
					{ name: 'Company Recognized (Trigger)', value: 'trigger' },
					{ name: 'Company Shared', value: 'share' },
					{ name: 'Contact Recognized (Trigger)', value: 'trigger_contact' },
					{ name: 'Contact Shared', value: 'share_contact' },
				],
			},
		],
	};

	webhookMethods = {
		default: {
			// Called on activation to see if we already registered — we trust our stored id.
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				return webhookData.webhookId !== undefined;
			},

			// Called when the workflow is ACTIVATED → register the webhook with Leadinfo.
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const event = this.getNodeParameter('event') as string;

				const response = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'leadinfoOAuth2Api',
					{
						method: 'PUT',
						url: `${BASE_URL}/v1/webhook`,
						body: {
							integration: 'n8n_app',
							url: webhookUrl,
							type: event,
						},
						json: true,
					},
				)) as IDataObject;

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = response.value; // RegisterWebhookResponse.value = the webhook id
				return true;
			},

			// Called when the workflow is DEACTIVATED → unregister it.
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId !== undefined) {
					await this.helpers.httpRequestWithAuthentication.call(this, 'leadinfoOAuth2Api', {
						method: 'DELETE',
						url: `${BASE_URL}/v1/webhook/${webhookData.webhookId}`,
						json: true,
					});
					delete webhookData.webhookId;
				}
				return true;
			},
		},
	};

	// Called every time Leadinfo POSTs an event → push it into the workflow.
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		return {
			workflowData: [this.helpers.returnJsonArray(bodyData)],
		};
	}
}