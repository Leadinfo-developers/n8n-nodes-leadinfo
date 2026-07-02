import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class LeadinfoOAuth2Api implements ICredentialType {
	name = 'leadinfoOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Leadinfo OAuth2 API';

	documentationUrl = 'https://www.leadinfo.com';

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://portal.leadinfo.com/oauth2/authorize',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.leadinfo.com/oauth2/token',  
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'webhook',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}