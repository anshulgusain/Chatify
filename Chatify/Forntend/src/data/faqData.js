export const faqItems = [
  {
    id: "faq-01",
    question: "What is the WhatsApp Cloud API?",
    answer: "WhatsApp Cloud API is Meta's cloud-hosted solution allowing developers to send and receive messages programmatically directly via Meta's Graph API infrastructure, eliminating third-party middleware fees."
  },
  {
    id: "faq-02",
    question: "Is WhatsApp Cloud API free to use?",
    answer: "Meta provides every WhatsApp Business Account with 1,000 free service conversations every month. Additional utility, marketing, and service conversations start at low per-conversation rates (approx. $0.005–$0.01 per conversation depending on country)."
  },
  {
    id: "faq-03",
    question: "Do I need a Meta Developer Account?",
    answer: "Yes. A Meta Developer Account (free at developers.facebook.com) is mandatory to create a WhatsApp Business App, obtain access tokens, and configure Webhook endpoints."
  },
  {
    id: "faq-04",
    question: "Can I use a personal phone number?",
    answer: "Yes, but the number must NOT be currently registered on personal WhatsApp or WhatsApp Business mobile apps. You must delete the mobile app account before adding it to Cloud API."
  },
  {
    id: "faq-05",
    question: "What is a Phone Number ID vs WABA ID?",
    answer: "Phone Number ID is Meta's unique ID for your sending number used in Graph API URLs. WABA ID (WhatsApp Business Account ID) is the parent account entity owning your numbers and templates."
  },
  {
    id: "faq-06",
    question: "What is a Webhook?",
    answer: "A Webhook is an HTTPS callback URL on your server where Meta sends real-time POST notifications whenever a user sends a message or a message status updates."
  },
  {
    id: "faq-07",
    question: "How do I generate a Permanent Access Token?",
    answer: "In Meta Business Manager (business.facebook.com), create an Admin System User under Users -> System Users, assign your WhatsApp App asset, and generate a token with 'whatsapp_business_messaging' permission."
  },
  {
    id: "faq-08",
    question: "Can I connect MongoDB to store conversations?",
    answer: "Yes! Connecting MongoDB or PostgreSQL allows your backend to store user message history, manage multi-step forms, and maintain conversation state across user interactions."
  },
  {
    id: "faq-09",
    question: "Can I integrate AI models like OpenAI or Google Gemini?",
    answer: "Absolutely. Instead of hardcoded keyword rules, pass the incoming message text to OpenAI GPT-4o or Google Gemini 1.5 Flash API, and send the AI-generated text back to the user."
  },
  {
    id: "faq-10",
    question: "Where can I deploy my Node.js Express backend?",
    answer: "You can host your backend on cloud platforms like Render, Railway, AWS ECS, or Fly.io. Ensure environment variables are configured in the cloud dashboard and update your Webhook URL in Meta settings."
  }
];
