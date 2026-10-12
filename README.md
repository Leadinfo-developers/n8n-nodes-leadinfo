# n8n-nodes-leadinfo

An n8n community node for [Leadinfo](https://www.leadinfo.com). Leadinfo identifies the
companies and contacts visiting your website — this node **triggers your n8n workflows
automatically** when Leadinfo recognizes a visitor. No manual webhook URLs to copy.

## Installation

In n8n: **Settings → Community Nodes → Install**, then enter `n8n-nodes-leadinfo`.
(See the [community nodes guide](https://docs.n8n.io/integrations/community-nodes/installation/).)

## Credentials

Authenticate with **Leadinfo OAuth2 API**:
1. Create a new *Leadinfo OAuth2 API* credential in n8n.
2. Click **Connect**, sign in to Leadinfo, and approve access.

The node uses the `webhook` scope to register/remove your subscription automatically.

## Triggers

The package ships four trigger nodes, one per event:

| Node | Fires when |
|------|-----------|
| Leadinfo — Company Triggered | a company meets the rules of a Leadinfo trigger |
| Leadinfo — Contact Triggered | a company meets the rules of a Leadinfo trigger, with its contacts |
| Leadinfo — Company Shared | a company is shared to n8n from the Leadinfo inbox |
| Leadinfo — Contact Shared | a contact is shared to n8n from the Leadinfo inbox |

Activating the workflow registers the webhook with Leadinfo; deactivating removes it.

## Usage

1. Add one of the Leadinfo trigger nodes above and connect your credential.
2. **Activate** the workflow.
3. Use the delivered company/contact data downstream. If you run multiple workflows,
   filter on `trigger_id` in your flow to route to specific logic.

## Resources
* [Leadinfo](https://www.leadinfo.com)
* [Leadinfo n8n help article](https://help.leadinfo.com/en/n8n-integration)
* [n8n community nodes docs](https://docs.n8n.io/integrations/community-nodes/)

## License
[MIT](LICENSE.md)