export const troubleshootItems = [
  {
    id: "err-403",
    code: "ERROR 403",
    title: "Webhook Verification Failed during Setup",
    category: "Webhook",
    cause: "Mismatch between Meta dashboard verify token and process.env.WEBHOOK_VERIFY_TOKEN, or using non-HTTPS URL.",
    howToCheck: [
      "Check terminal output to verify server received the GET /webhook request.",
      "Check if ngrok tunnel is active and URL starts with https://.",
      "Inspect query parameters sent by Meta: hub.mode, hub.verify_token, hub.challenge."
    ],
    howToFix: [
      "Ensure callback URL is a valid HTTPS endpoint (e.g. https://xxxx.ngrok-free.app/webhook).",
      "Ensure token string pasted in Meta dashboard matches WEBHOOK_VERIFY_TOKEN exactly.",
      "Ensure your server responds with raw text res.status(200).send(challenge) rather than JSON."
    ],
    badgeColor: "red"
  },
  {
    id: "err-401",
    code: "ERROR 401",
    title: "Meta Graph API Unauthorized / OAuth Exception (Code 190)",
    category: "Authentication",
    cause: "Temporary Access Token has expired (valid for 24 hours).",
    howToCheck: [
      "Inspect Graph API POST response body for error code 190 or OAuthException.",
      "Check if 24 hours have elapsed since copying token from API Setup."
    ],
    howToFix: [
      "For quick testing, copy a fresh Temporary Access Token from API Setup page.",
      "For production, generate a permanent System User Token in Meta Business Settings with whatsapp_business_messaging permission."
    ],
    badgeColor: "amber"
  },
  {
    id: "err-131047",
    code: "ERROR 131047",
    title: "Reaching 24-Hour Customer Service Window Expiry",
    category: "Permissions",
    cause: "Attempting to send free-form text messages after 24 hours have passed since the user's last incoming message.",
    howToCheck: [
      "Verify timestamp of user's last message in conversation logs.",
      "Check error payload code 131047 from Graph API response."
    ],
    howToFix: [
      "Outside the 24-hour window, you MUST send a pre-approved Message Template (type: 'template').",
      "Once user responds to template message, 24-hour free-form messaging window reopens."
    ],
    badgeColor: "amber"
  },
  {
    id: "err-no-post",
    code: "NO WEBHOOK",
    title: "POST /webhook not triggering on Node.js Server",
    category: "Webhook",
    cause: "The 'messages' field is not subscribed in App Webhook Subscription settings.",
    howToCheck: [
      "Check ngrok web inspector (http://localhost:4040) for incoming POST traffic.",
      "Check if user sent message to correct test phone number."
    ],
    howToFix: [
      "Go to Meta App Dashboard -> WhatsApp -> Configuration.",
      "Under Webhook Fields, click Manage -> Check 'messages' -> Click Done."
    ],
    badgeColor: "red"
  },
  {
    id: "err-tier-limit",
    code: "LIMIT 250",
    title: "Messaging Tier Limit Reached (250 contacts/day cap)",
    category: "Permissions",
    cause: "Unverified Meta Business Manager Account is capped at 250 unique recipient contacts per 24 hours.",
    howToCheck: [
      "Check Meta WhatsApp Manager -> Account Overview for current messaging tier.",
      "Check Graph API response for error code 131056."
    ],
    howToFix: [
      "Submit Meta Business Verification in Business Settings -> Security Center.",
      "Maintain high quality phone number rating to automatically scale to Tier 1 (1,000/day), Tier 2 (10,000/day), and higher."
    ],
    badgeColor: "green"
  }
];
