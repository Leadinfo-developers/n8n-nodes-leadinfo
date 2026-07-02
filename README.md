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

## Operations — Leadinfo Trigger

Starts a workflow on the event you choose:

| Event | Fires when |
|-------|-----------|
| Company Recognized (Trigger) | a company matching one of your Leadinfo triggers visits your site |
| Company Shared | a company is shared to n8n from the Leadinfo inbox |
| Contact Recognized (Trigger) | contacts from a trigger visit your site |
| Contact Shared | a contact is shared to n8n |

Activating the workflow registers the webhook with Leadinfo; deactivating removes it.

## Usage

1. Add the **Leadinfo Trigger** node, connect your credential, and pick an **Event**.
2. **Activate** the workflow.
3. Use the delivered company/contact data downstream. If you run multiple workflows,
   filter on `trigger_id` in your flow to route to specific logic.

## Resources
* [Leadinfo](https://www.leadinfo.com)
* [n8n community nodes docs](https://docs.n8n.io/integrations/community-nodes/)

## License
[MIT](LICENSE.md)