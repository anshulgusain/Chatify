export const tutorialSteps = [
  {
    id: "step-01",
    number: "01",
    title: "What is WhatsApp Cloud API",
    category: "setup",
    categoryLabel: "GET STARTED",
    estimatedMinutes: 5,
    summary: "Understand Meta Cloud API vs On-Premise architecture, 1,000 free monthly conversations, and core advantages.",
    whatYouWillDo: [
      "Learn the key differences between Cloud API and On-Premise BSP solutions.",
      "Understand Meta's 1,000 free service conversation monthly allowance.",
      "Discover the full data flow pipeline from customer to Node.js backend."
    ],
    whyItMatters: "Direct integration with Meta eliminates third-party markup fees, reduces server maintenance, and provides low-latency messaging directly via Meta's AWS cloud infrastructure.",
    mockup: {
      type: "architecture",
      title: "WhatsApp Cloud API Architecture Overview",
      description: "Direct server-to-server connection between Node.js Express and Meta Graph API v20.0"
    },
    hinglishNote: "Cloud API use karne se aapko On-Premise Docker containers setup nahi karne padte. Direct Meta ke servers se fast messaging hoti hai.",
    expectedResult: "Clear technical understanding of Cloud API capabilities, rate limits, and zero-infrastructure advantages.",
    commonMistakes: [
      "Assuming Cloud API requires paid BSP middleware like Twilio or360dialog.",
      "Confusing personal WhatsApp Web automation wrappers (which get banned) with the official Cloud API."
    ],
    nextAction: "Check your local prerequisites and tech stack.",
    nextStepId: "step-02"
  },
  {
    id: "step-02",
    number: "02",
    title: "Prerequisites & Tech Stack Setup",
    category: "setup",
    categoryLabel: "GET STARTED",
    estimatedMinutes: 5,
    summary: "Gather Meta Developer Account, dedicated test phone number, Node.js environment, and ngrok tunnel.",
    whatYouWillDo: [
      "Prepare a Meta (Facebook) Developer Account at developers.facebook.com.",
      "Obtain a dedicated phone number (NOT currently registered on personal WhatsApp app).",
      "Verify Node.js (v18+) and NPM installation locally.",
      "Install ngrok for secure HTTPS local tunneling."
    ],
    whyItMatters: "Meta strictly requires HTTPS callback endpoints for Webhook event delivery. Tools like ngrok enable local development before cloud deployment.",
    mockup: {
      type: "browser",
      title: "Prerequisites Verification Checklist",
      url: "https://developers.facebook.com/"
    },
    codeSnippet: {
      language: "bash",
      fileName: "terminal-prerequisites.sh",
      code: `# Verify Node.js & NPM version
node -v  # Expected: v18.0.0 or higher
npm -v   # Expected: v9.0.0 or higher

# Install ngrok globally (or use npx)
npm install -g ngrok`
    },
    hinglishNote: "Dhyan rakhein ki jo phone number aap API me add karenge wo personal WhatsApp app me registered NATIVE account nahi hona chahiye.",
    expectedResult: "Node.js environment verified and ngrok CLI ready for local tunneling.",
    commonMistakes: [
      "Trying to use a phone number actively attached to WhatsApp mobile app without deleting account first.",
      "Using plain HTTP URLs instead of HTTPS for Webhook testing."
    ],
    nextAction: "Create your Meta Developer Account and App.",
    nextStepId: "step-03"
  },
  {
    id: "step-03",
    number: "03",
    title: "Create Meta Developer Account",
    category: "setup",
    categoryLabel: "META SETUP",
    estimatedMinutes: 5,
    summary: "Log in to Meta for Developers and complete basic developer onboarding.",
    whatYouWillDo: [
      "Navigate to developers.facebook.com in your browser.",
      "Log in with your Facebook credentials.",
      "Click 'Get Started' or 'My Apps' in the top navigation bar.",
      "Accept Meta's Developer Terms and verify your developer profile."
    ],
    whyItMatters: "A verified Developer Account is mandatory to access Graph API tools, register sandbox test numbers, and create Webhook subscriptions.",
    mockup: {
      type: "annotated",
      screenTitle: "Meta for Developers — Developer Login",
      headerText: "developers.facebook.com",
      actionText: "Click 'My Apps' in the top right corner",
      targetButton: "My Apps"
    },
    hinglishNote: "Facebook account log in karke 'My Apps' button par click karein. Yeh aapka main control center banega.",
    expectedResult: "Access to Meta App Dashboard portal.",
    commonMistakes: [
      "Logging in with an unverified Facebook account without two-factor authentication enabled."
    ],
    nextAction: "Create a new Business App.",
    nextStepId: "step-04"
  },
  {
    id: "step-04",
    number: "04",
    title: "Create Meta App (Business Type)",
    category: "setup",
    categoryLabel: "META SETUP",
    estimatedMinutes: 6,
    summary: "Create a new application in Meta Developer Console selecting Business app type.",
    whatYouWillDo: [
      "Click the green 'Create App' button in My Apps portal.",
      "Select 'Other' -> Select 'Business' as the App Type.",
      "Enter App Display Name: 'WhatsApp Chatbot Masterclass'.",
      "Enter App Contact Email and select/link your Meta Business Account.",
      "Click 'Create App' and enter Facebook password for confirmation."
    ],
    whyItMatters: "Choosing the 'Business' app type ensures you get native access to WhatsApp Business API, Graph API permissions, and Webhook engines.",
    mockup: {
      type: "annotated",
      screenTitle: "Create an App — Select Business Type",
      headerText: "developers.facebook.com/apps/create",
      actionText: "Select [Other] ➔ Select [Business] ➔ Click [Next]",
      targetButton: "Business App Type"
    },
    hinglishNote: "App category me 'Business' select karna zaroori hai. Tabhi WhatsApp Cloud API ka setup option milega.",
    expectedResult: "Newly created App Dashboard created in Meta Portal.",
    commonMistakes: [
      "Selecting 'Consumer' or 'Gaming' app type which does not support WhatsApp Business Messaging."
    ],
    nextAction: "Add WhatsApp product to your newly created App.",
    nextStepId: "step-05"
  },
  {
    id: "step-05",
    number: "05",
    title: "Add WhatsApp Product to App",
    category: "setup",
    categoryLabel: "META SETUP",
    estimatedMinutes: 4,
    summary: "Add and configure the WhatsApp Business Platform product inside App Dashboard.",
    whatYouWillDo: [
      "Scroll down to 'Add products to your app' section on App Dashboard.",
      "Locate the WhatsApp tile.",
      "Click the 'Set up' button under WhatsApp.",
      "Select your Meta Business Account profile (or auto-generated test business profile) and click Continue."
    ],
    whyItMatters: "Setting up WhatsApp initializes Meta's cloud sandbox, creates your initial test business account, and enables the WhatsApp API sidebar menu.",
    mockup: {
      type: "annotated",
      screenTitle: "App Dashboard — Add WhatsApp Product",
      headerText: "developers.facebook.com/apps/{app-id}/dashboard",
      actionText: "Locate WhatsApp card ➔ Click [Set up]",
      targetButton: "Set up WhatsApp"
    },
    hinglishNote: "App Dashboard me niche scroll karke WhatsApp card par 'Set up' button dabayein.",
    expectedResult: "WhatsApp menu appears in left sidebar with 'API Setup' and 'Configuration' options.",
    commonMistakes: [
      "Navigating away from the dashboard before clicking Continue on Business Account selection."
    ],
    nextAction: "Get your test phone number and add recipient number.",
    nextStepId: "step-06"
  },
  {
    id: "step-06",
    number: "06",
    title: "Get Test Phone Number & Add Recipient",
    category: "setup",
    categoryLabel: "META SETUP",
    estimatedMinutes: 5,
    summary: "Access Meta's sandbox test phone number and add your personal number to the allowed recipient list.",
    whatYouWillDo: [
      "In left sidebar, navigate to WhatsApp -> API Setup.",
      "Locate Step 1: 'Select phone number' (Meta provides a pre-assigned Test Number).",
      "In Step 2: 'Send and receive messages', open the 'To' phone number dropdown.",
      "Click 'Manage phone number list'.",
      "Enter your personal mobile phone number with country code (e.g. +91XXXXXXXXXX).",
      "Verify via 6-digit SMS/WhatsApp OTP code received on your phone."
    ],
    whyItMatters: "In sandbox mode, Meta allows sending messages only to verified test recipient numbers for security until Business Verification is completed.",
    mockup: {
      type: "annotated",
      screenTitle: "WhatsApp API Setup — Recipient Number List",
      headerText: "developers.facebook.com/apps/{app-id}/whatsapp/api-setup",
      actionText: "Open 'To' dropdown ➔ Click [Manage phone number list] ➔ Verify OTP",
      targetButton: "Manage phone number list"
    },
    whatToEnter: "Phone Number: +91 9876543210 (Your personal mobile number)",
    hinglishNote: "Sandbox account se abhi sirf verified test numbers par hi message jayenge. Apka number verify karein.",
    expectedResult: "Personal phone number added and verified in Meta Sandbox.",
    commonMistakes: [
      "Forgetting country code when adding number (e.g., entering 9876543210 instead of +919876543210)."
    ],
    nextAction: "Generate temporary access token and inspect Phone Number ID.",
    nextStepId: "step-07"
  },
  {
    id: "step-07",
    number: "07",
    title: "Generate Access Token & Credentials",
    category: "setup",
    categoryLabel: "META SETUP",
    estimatedMinutes: 4,
    summary: "Locate and copy Temporary Access Token, Phone Number ID, and WABA ID.",
    whatYouWillDo: [
      "On WhatsApp -> API Setup screen, locate 'Temporary Access Token'.",
      "Click the 'Copy' button (valid for 24 hours).",
      "Locate 'Phone Number ID' (e.g. 109283746591029) and copy it.",
      "Locate 'WhatsApp Business Account ID' (WABA ID) and copy it."
    ],
    whyItMatters: "These credentials authorize outbound API calls to Meta's Graph API `v20.0/PHONE_NUMBER_ID/messages` endpoint.",
    mockup: {
      type: "credentials",
      title: "Meta API Credentials Panel",
      token: "EAAG... (Temporary 24h Token)",
      phoneId: "109283746591029",
      wabaId: "102938475610293"
    },
    codeSnippet: {
      language: "env",
      fileName: ".env.example",
      code: `# Meta WhatsApp Credentials
WHATSAPP_TOKEN=EAAG...YOUR_TEMPORARY_ACCESS_TOKEN
PHONE_NUMBER_ID=109283746591029
VERIFY_TOKEN=my_super_secret_webhook_verify_token_123`
    },
    hinglishNote: "Yahan milne wali Temporary Token 24 hours tak valid rehti hai. Production me permanent token banayege.",
    expectedResult: "Credentials copied and ready for backend configuration.",
    commonMistakes: [
      "Confusing Phone Number ID with the actual phone number digits.",
      "Sharing your access token publicly on GitHub."
    ],
    nextAction: "Send your first test Hello World message.",
    nextStepId: "step-08"
  },
  {
    id: "step-08",
    number: "08",
    title: "Send First Test Message (Hello World)",
    category: "setup",
    categoryLabel: "META SETUP",
    estimatedMinutes: 5,
    summary: "Send a test 'hello_world' template notification via Dashboard cURL tool to your personal phone.",
    whatYouWillDo: [
      "Select your verified personal number in the 'To' dropdown.",
      "Click the blue 'Send message' button in the dashboard.",
      "Check your personal WhatsApp app for the incoming 'Hello World' message.",
      "Inspect the generated cURL command displayed on screen."
    ],
    whyItMatters: "This confirms that Meta's outbound infrastructure is functioning properly before writing custom Node.js code.",
    mockup: {
      type: "annotated",
      screenTitle: "API Setup — Send Test Message",
      headerText: "developers.facebook.com/apps/{app-id}/whatsapp/api-setup",
      actionText: "Click [Send message] button",
      targetButton: "Send message"
    },
    codeSnippet: {
      language: "bash",
      fileName: "send-test-curl.sh",
      code: `curl -i -X POST \\
  https://graph.facebook.com/v20.0/YOUR_PHONE_NUMBER_ID/messages \\
  -H 'Authorization: Bearer YOUR_TEMPORARY_ACCESS_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "messaging_product": "whatsapp",
    "to": "YOUR_VERIFIED_PHONE_NUMBER",
    "type": "template",
    "template": {
      "name": "hello_world",
      "language": { "code": "en_US" }
    }
  }'`
    },
    hinglishNote: "'Send message' dabaate hi aapke mobile WhatsApp par Meta ka official Hello World message aayega.",
    expectedResult: "Instant arrival of hello_world message on your mobile phone.",
    commonMistakes: [
      "Attempting to send free-form text outside a 24-hour customer window before user sends initial message."
    ],
    nextAction: "Initialize your Node.js Express backend project.",
    nextStepId: "step-09"
  },
  {
    id: "step-09",
    number: "09",
    title: "Create Node.js Backend Project",
    category: "backend",
    categoryLabel: "BACKEND SETUP",
    estimatedMinutes: 7,
    summary: "Initialize a Node.js project directory and install express, axios, dotenv, and body-parser.",
    whatYouWillDo: [
      "Open your terminal and create directory: `mkdir whatsapp-chatbot && cd whatsapp-chatbot`.",
      "Initialize Node project: `npm init -y`.",
      "Install core dependencies: `npm install express body-parser dotenv axios`.",
      "Install dev tool for hot reload: `npm install --save-dev nodemon`."
    ],
    whyItMatters: "Express provides the HTTP web server framework to host `/webhook` routes and communicate with Meta's APIs via HTTP requests.",
    codeSnippet: {
      language: "bash",
      fileName: "terminal-backend-init.sh",
      code: `# 1. Create project folder
mkdir whatsapp-chatbot
cd whatsapp-chatbot

# 2. Initialize Node project
npm init -y

# 3. Install core packages
npm install express body-parser dotenv axios

# 4. Install nodemon for development
npm install --save-dev nodemon`
    },
    hinglishNote: "Terminal me in commands ko run karke apna backend project folder initialize karein.",
    expectedResult: "Initialized `package.json` with Express and Axios dependencies installed.",
    commonMistakes: [
      "Forgetting `npm init -y` before running `npm install`."
    ],
    nextAction: "Configure your `.env` environment variables.",
    nextStepId: "step-10"
  },
  {
    id: "step-10",
    number: "10",
    title: "Environment Variables Configuration",
    category: "backend",
    categoryLabel: "BACKEND SETUP",
    estimatedMinutes: 4,
    summary: "Create .env and .gitignore files to securely store tokens and configuration parameters.",
    whatYouWillDo: [
      "Create `.env` file in project root.",
      "Add `PORT=3000`, `WHATSAPP_TOKEN`, `PHONE_NUMBER_ID`, and `WEBHOOK_VERIFY_TOKEN`.",
      "Create `.gitignore` file and include `node_modules` and `.env`."
    ],
    whyItMatters: "Storing sensitive API keys in environment variables prevents secret leakage to public Git repositories.",
    codeSnippet: {
      language: "env",
      fileName: ".env",
      code: `# Server Port
PORT=3000

# Meta WhatsApp Cloud API Credentials
WHATSAPP_TOKEN=EAAG...YOUR_TEMPORARY_ACCESS_TOKEN
PHONE_NUMBER_ID=109283746591029

# Custom Webhook Secret Verification Token
WEBHOOK_VERIFY_TOKEN=my_super_secret_webhook_verify_token_123`
    },
    hinglishNote: "Never commit your `.env` file to GitHub! Always add `.env` in `.gitignore`.",
    expectedResult: "Secure local configuration setup with `.gitignore` protection.",
    commonMistakes: [
      "Committing `.env` file with live access tokens to GitHub."
    ],
    nextAction: "Build the Webhook GET verification route.",
    nextStepId: "step-11"
  },
  {
    id: "step-11",
    number: "11",
    title: "Configure Webhook GET Verification Route",
    category: "backend",
    categoryLabel: "BACKEND SETUP",
    estimatedMinutes: 8,
    summary: "Implement GET /webhook route to handle Meta's challenge-response verification handshake.",
    whatYouWillDo: [
      "Create `server.js` file in project root.",
      "Import express, dotenv, body-parser, and axios.",
      "Add GET `/webhook` handler parsing `hub.mode`, `hub.verify_token`, and `hub.challenge`.",
      "Validate token and return raw `hub.challenge` text with HTTP 200 status."
    ],
    whyItMatters: "When linking your Webhook URL in Meta dashboard, Meta sends a GET verification request to verify endpoint ownership.",
    codeSnippet: {
      language: "javascript",
      fileName: "server.js (Verification Handler)",
      code: `require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

// 1. GET /webhook - Verification Handshake with Meta Dashboard
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
            console.log('✅ WEBHOOK_VERIFIED SUCCESSFULLY!');
            return res.status(200).send(challenge);
        } else {
            console.error('❌ Verification failed. Token mismatch.');
            return res.sendStatus(403);
        }
    }
    res.sendStatus(400);
});`
    },
    hinglishNote: "Meta Webhook link karte waqt GET request bhejta hai. Match hone par raw `challenge` string send karna hota hai.",
    expectedResult: "Express GET `/webhook` route ready for Meta challenge response.",
    commonMistakes: [
      "Returning JSON object `res.json({challenge})` instead of raw text `res.send(challenge)`."
    ],
    nextAction: "Implement POST /webhook route to receive incoming messages.",
    nextStepId: "step-12"
  },
  {
    id: "step-12",
    number: "12",
    title: "Receive Incoming Messages (POST Webhook)",
    category: "backend",
    categoryLabel: "BACKEND SETUP",
    estimatedMinutes: 8,
    summary: "Build POST /webhook endpoint to parse incoming WhatsApp message payloads from Meta.",
    whatYouWillDo: [
      "Add POST `/webhook` route to `server.js`.",
      "Check if `body.object === 'whatsapp_business_account'`.",
      "Traverse `entry` -> `changes` -> `value` -> `messages` array.",
      "Extract sender phone number (`from`) and message text (`message.text.body`).",
      "Return `HTTP 200 OK ('EVENT_RECEIVED')` immediately within 20 seconds."
    ],
    whyItMatters: "Whenever a user sends a message on WhatsApp, Meta sends an asynchronous POST webhook request containing message content to your server.",
    codeSnippet: {
      language: "javascript",
      fileName: "server.js (POST Webhook Handler)",
      code: `// 2. POST /webhook - Receive Incoming WhatsApp Messages
app.post('/webhook', async (req, res) => {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry) {
            for (const change of entry.changes) {
                if (change.value && change.value.messages && change.value.messages[0]) {
                    const message = change.value.messages[0];
                    const from = message.from; // Sender WhatsApp phone number
                    const messageType = message.type;

                    if (messageType === 'text') {
                        const incomingText = message.text.body.trim();
                        console.log(\`📩 Received message from \${from}: "\${incomingText}"\`);
                        await handleIncomingText(from, incomingText);
                    }
                }
            }
        }
        return res.status(200).send('EVENT_RECEIVED');
    }
    return res.sendStatus(404);
});`
    },
    hinglishNote: "Jab bhi koi user WhatsApp par message bhejega, Meta yeh POST payload aapke server par bhejega.",
    expectedResult: "Webhook successfully receiving and parsing real-time incoming messages.",
    commonMistakes: [
      "Taking more than 20 seconds to respond with 200 OK, causing Meta to mark webhook dead and retry sending duplicates."
    ],
    nextAction: "Implement outbound message delivery helper using Graph API.",
    nextStepId: "step-13"
  },
  {
    id: "step-13",
    number: "13",
    title: "Send Automatic Reply via Graph API",
    category: "backend",
    categoryLabel: "BACKEND SETUP",
    estimatedMinutes: 7,
    summary: "Write HTTP POST helper using Axios to dispatch messages to Meta Graph API v20.0 messages endpoint.",
    whatYouWillDo: [
      "Create async function `sendWhatsAppTextMessage(toPhoneNumber, messageBody)`.",
      "Construct Meta endpoint URL: `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`.",
      "Set authorization header: `Bearer ${WHATSAPP_TOKEN}`.",
      "Send payload containing `messaging_product: 'whatsapp'`, `recipient_type: 'individual'`, `type: 'text'`, and `text: { body }`."
    ],
    whyItMatters: "This function connects your backend's logic to Meta's Graph API, physically delivering the reply text back to the customer's phone.",
    codeSnippet: {
      language: "javascript",
      fileName: "server.js (Graph API Outbound Message)",
      code: `// Send Message via Graph API v20.0
async function sendWhatsAppTextMessage(toPhoneNumber, messageBody) {
    try {
        const url = \`https://graph.facebook.com/v20.0/\${process.env.PHONE_NUMBER_ID}/messages\`;
        
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: toPhoneNumber,
            type: 'text',
            text: {
                preview_url: false,
                body: messageBody
            }
        };

        const response = await axios.post(url, payload, {
            headers: {
                'Authorization': \`Bearer \${process.env.WHATSAPP_TOKEN}\`,
                'Content-Type': 'application/json'
            }
        });

        console.log(\`📤 Message delivered to \${toPhoneNumber}! ID: \${response.data.messages[0].id}\`);
    } catch (error) {
        console.error('❌ Graph API Error:', error.response ? error.response.data : error.message);
    }
}`
    },
    hinglishNote: "Yeh function Axios post call se Meta API par request bhejta hai aur user ke WhatsApp par reply deliver hota hai.",
    expectedResult: "Working outbound message dispatch helper.",
    commonMistakes: [
      "Typo in Graph API URL or omitting 'Bearer ' prefix in Authorization header."
    ],
    nextAction: "Build keyword router bot logic.",
    nextStepId: "step-14"
  },
  {
    id: "step-14",
    number: "14",
    title: "Build Automated Bot Keyword Logic",
    category: "backend",
    categoryLabel: "BACKEND SETUP",
    estimatedMinutes: 8,
    summary: "Implement rule-based keyword router to handle greetings, pricing inquiries, menu requests, and default fallbacks.",
    whatYouWillDo: [
      "Create async function `handleIncomingText(recipientPhoneNumber, textContent)`.",
      "Convert text to lowercase for keyword matching.",
      "Handle keywords: `hi`/`hello` (Welcome message), `menu`/`help` (Command list), `pricing` (Plan info), `ping` (Health check).",
      "Add default fallback message for unrecognized inputs."
    ],
    whyItMatters: "Keyword routing transforms simple Webhook listeners into structured, interactive conversational assistants.",
    codeSnippet: {
      language: "javascript",
      fileName: "server.js (Bot Keyword Router)",
      code: `async function handleIncomingText(recipientPhoneNumber, textContent) {
    const query = textContent.toLowerCase().trim();
    let replyMessage = '';

    if (query === 'hi' || query === 'hello' || query === 'start') {
        replyMessage = '👋 *Welcome to our Automated WhatsApp Assistant!*\\n\\nType *menu* to see available commands.';
    } else if (query === 'menu' || query === 'help') {
        replyMessage = '📌 *Available Commands*:\\n1. Send *pricing* - View API pricing\\n2. Send *support* - Talk to human agent\\n3. Send *ping* - Check server status';
    } else if (query === 'pricing') {
        replyMessage = '💳 *Pricing Details*:\\nMeta Cloud API provides 1,000 FREE service conversations every month.';
    } else if (query === 'ping') {
        replyMessage = '🏓 *Pong!* Webhook server is healthy and running smoothly.';
    } else {
        replyMessage = \`🤖 You sent: "\${textContent}".\\n\\nType *menu* for options!\`;
    }

    await sendWhatsAppTextMessage(recipientPhoneNumber, replyMessage);
}`
    },
    hinglishNote: "Jab user 'hello' ya 'menu' likhega toh bot automatically exact formatting ke sath reply karega.",
    expectedResult: "Fully functional rule-based chatbot logic in Express server.",
    commonMistakes: [
      "Not trimming or lowercasing input strings leading to failed keyword matches."
    ],
    nextAction: "Setup database storage for state management.",
    nextStepId: "step-15"
  },
  {
    id: "step-15",
    number: "15",
    title: "Setup Database Storage (MongoDB)",
    category: "database",
    categoryLabel: "DATABASE",
    estimatedMinutes: 10,
    summary: "Integrate MongoDB to persist user sessions, message logs, and conversation states.",
    whatYouWillDo: [
      "Install Mongoose: `npm install mongoose`.",
      "Define `User`, `Message`, and `Conversation` Schemas.",
      "Connect to MongoDB Atlas or local MongoDB instance in `server.js`.",
      "Log every incoming and outgoing message with timestamp and `wamid` message ID."
    ],
    whyItMatters: "Databases enable stateful conversations (e.g., tracking order steps, user registration flows, lead capture).",
    codeSnippet: {
      language: "javascript",
      fileName: "models/Conversation.js",
      code: `const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, index: true },
    lastMessageText: String,
    currentStep: { type: String, default: 'START' },
    messageHistory: [
        {
            sender: { type: String, enum: ['user', 'bot'] },
            text: String,
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);`
    },
    hinglishNote: "MongoDB database me user ka phone number aur message history save hoti hai jisse chatbot user ka context yaad rakh sake.",
    expectedResult: "MongoDB schemas defined and ready for session persistence.",
    commonMistakes: [
      "Exposing database connection strings with passwords in git code repositories."
    ],
    nextAction: "Store conversation context dynamically.",
    nextStepId: "step-16"
  },
  {
    id: "step-16",
    number: "16",
    title: "Store Conversations & Context State",
    category: "database",
    categoryLabel: "DATABASE",
    estimatedMinutes: 8,
    summary: "Update bot logic to fetch and mutate user state in MongoDB during conversation flows.",
    whatYouWillDo: [
      "Fetch user record from MongoDB by `from` phone number.",
      "Check active step (e.g. `WAITING_FOR_NAME`, `WAITING_FOR_EMAIL`).",
      "Process state transition and save context back to database."
    ],
    whyItMatters: "Multi-step forms (like booking appointments or collecting leads) require persistent step context beyond single keyword replies.",
    codeSnippet: {
      language: "javascript",
      fileName: "services/botFlow.js",
      code: `const Conversation = require('./models/Conversation');

async function processStatefulBot(phone, text) {
    let session = await Conversation.findOne({ phoneNumber: phone });
    if (!session) {
        session = await Conversation.create({ phoneNumber: phone });
    }

    if (session.currentStep === 'START') {
        session.currentStep = 'AWAITING_NAME';
        await session.save();
        return "👋 Welcome! What is your full name?";
    } else if (session.currentStep === 'AWAITING_NAME') {
        session.currentStep = 'COMPLETED';
        await session.save();
        return \`Nice to meet you, \${text}! Your profile has been created.\`;
    }
}`
    },
    hinglishNote: "State management se bot ek multi-step form ki tarah sawaal pooch sakta hai.",
    expectedResult: "Stateful conversational flows backed by database persistence.",
    commonMistakes: [
      "Not handling database timeout errors gracefully during Webhook execution."
    ],
    nextAction: "Prepare Meta Business Portfolio and Business Verification.",
    nextStepId: "step-17"
  },
  {
    id: "step-17",
    number: "17",
    title: "Create Business Portfolio & Verification",
    category: "production",
    categoryLabel: "PRODUCTION & SECURITY",
    estimatedMinutes: 12,
    summary: "Submit Meta Business Verification to scale messaging tier limits beyond sandbox 250 contacts/day.",
    whatYouWillDo: [
      "Open Meta Business Settings at business.facebook.com.",
      "Navigate to Security Center -> Start Verification.",
      "Upload legal business document (GST Certificate, Business License, or Incorporation Document).",
      "Verify business phone number or domain ownership via DNS/Email."
    ],
    whyItMatters: "Unverified sandbox apps are capped at 250 messaging contacts per 24 hours. Verification upgrades your quota to Tier 1 (1,000 contacts/day), Tier 2 (10,000), Tier 3 (100,000), and Unlimited.",
    mockup: {
      type: "annotated",
      screenTitle: "Meta Business Manager — Business Verification",
      headerText: "business.facebook.com/settings/security-center",
      actionText: "Navigate to Security Center ➔ Click [Start Verification]",
      targetButton: "Start Verification"
    },
    hinglishNote: "Business verification complete hone par hi messaging limits 250 se badhakar 1,000 se 100,000+ messages per day hoti hain.",
    expectedResult: "Meta Business Verification request submitted.",
    commonMistakes: [
      "Uploading documents where business name does not match the registered Meta Business Manager legal name."
    ],
    nextAction: "Add your real production WhatsApp phone number.",
    nextStepId: "step-18"
  },
  {
    id: "step-18",
    number: "18",
    title: "Add Real Production WhatsApp Phone Number",
    category: "production",
    categoryLabel: "PRODUCTION & SECURITY",
    estimatedMinutes: 8,
    summary: "Register a real production phone number to your Meta WhatsApp Business Account.",
    whatYouWillDo: [
      "Go to Meta App Dashboard -> WhatsApp -> API Setup.",
      "Scroll to Step 5: 'Add phone number'.",
      "Enter WhatsApp Business Display Name, Category, and Business Description.",
      "Enter your real phone number and choose SMS or Voice Call verification.",
      "Enter the received OTP code."
    ],
    whyItMatters: "Replaces Meta's sandbox test number with your actual brand phone number for customer interactions.",
    mockup: {
      type: "annotated",
      screenTitle: "Add Phone Number for WhatsApp Cloud API",
      headerText: "developers.facebook.com/apps/{app-id}/whatsapp/api-setup",
      actionText: "Fill Display Name ➔ Enter Phone Number ➔ Click [Next] ➔ Verify OTP",
      targetButton: "Add Phone Number"
    },
    hinglishNote: "Zaroori Warning: Yeh phone number pehle se kisi personal WhatsApp mobile app me active nahi hona chahiye.",
    expectedResult: "Real WhatsApp number registered and active on Cloud API.",
    commonMistakes: [
      "Failing to delete account from WhatsApp mobile app settings prior to Cloud API registration."
    ],
    nextAction: "Generate a Permanent System User Access Token.",
    nextStepId: "step-19"
  },
  {
    id: "step-19",
    number: "19",
    title: "Generate Permanent System User Token",
    category: "production",
    categoryLabel: "PRODUCTION & SECURITY",
    estimatedMinutes: 8,
    summary: "Create a Meta Business System User with permanent, non-expiring access tokens.",
    whatYouWillDo: [
      "Open Meta Business Manager (`business.facebook.com`) -> Business Settings.",
      "Under Users, click System Users -> Click Add -> Set Role: Admin.",
      "Click 'Add Assets' -> Select your WhatsApp Business App with full control.",
      "Click 'Generate New Token' -> Select your App.",
      "Enable permissions: `whatsapp_business_messaging` and `whatsapp_business_management`.",
      "Copy permanent token into production `.env` file."
    ],
    whyItMatters: "Temporary tokens expire after 24 hours. Permanent System User tokens never expire, ensuring uninterrupted server operations.",
    mockup: {
      type: "annotated",
      screenTitle: "Meta Business Manager — Permanent System User Token",
      headerText: "business.facebook.com/settings/system-users",
      actionText: "Add System User ➔ Add Asset ➔ Generate Token ➔ Select whatsapp_business_messaging",
      targetButton: "Generate New Token"
    },
    codeSnippet: {
      language: "env",
      fileName: ".env.production",
      code: `# Permanent System User Access Token (Never Expires)
WHATSAPP_TOKEN=EAAG...PERMANENT_SYSTEM_USER_TOKEN
PHONE_NUMBER_ID=109283746591029
VERIFY_TOKEN=my_super_secret_webhook_verify_token_123`
    },
    hinglishNote: "System User Token kabhi expire nahi hoti. Production deployment me humesha issi token ka use karein.",
    expectedResult: "Permanent non-expiring System User Token configured.",
    commonMistakes: [
      "Forgetting to check the `whatsapp_business_messaging` permission scope when generating system user token."
    ],
    nextAction: "Configure security signature verification for production Webhooks.",
    nextStepId: "step-20"
  },
  {
    id: "step-20",
    number: "20",
    title: "Production Webhook & HMAC Security",
    category: "production",
    categoryLabel: "PRODUCTION & SECURITY",
    estimatedMinutes: 9,
    summary: "Validate incoming Webhook requests using Meta App Secret HMAC SHA256 signature verification.",
    whatYouWillDo: [
      "Locate your App Secret in Meta Developer Dashboard (App Settings -> Basic).",
      "Read `x-hub-signature-256` header on incoming Webhook POST requests.",
      "Compute HMAC SHA-256 hash of raw payload using your App Secret.",
      "Compare computed hash against header signature to reject forged requests."
    ],
    whyItMatters: "HMAC verification guarantees that incoming POST requests originated strictly from Meta's servers, preventing malicious payload injection.",
    codeSnippet: {
      language: "javascript",
      fileName: "middleware/verifyMetaSignature.js",
      code: `const crypto = require('crypto');

function verifySignature(req, res, next) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
        return res.status(401).send('Signature missing');
    }

    const elements = signature.split('=');
    const signatureHash = elements[1];

    const expectedHash = crypto
        .createHmac('sha256', process.env.APP_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (signatureHash !== expectedHash) {
        return res.status(403).send('Signature mismatch');
    }
    next();
}`
    },
    hinglishNote: "HMAC Security se ye verify hota hai ki incoming POST request sach me Meta ke servers se hi aayi hai.",
    expectedResult: "Secured Webhook endpoint with HMAC SHA-256 payload authentication.",
    commonMistakes: [
      "Calculating hash over parsed JSON object instead of raw unparsed request byte buffer."
    ],
    nextAction: "Deploy Express backend to production cloud hosting.",
    nextStepId: "step-21"
  },
  {
    id: "step-21",
    number: "21",
    title: "Deploy Backend Server to Cloud",
    category: "production",
    categoryLabel: "PRODUCTION & SECURITY",
    estimatedMinutes: 10,
    summary: "Deploy Node.js Express server to Render, Railway, AWS ECS, or Fly.io with custom HTTPS domain.",
    whatYouWillDo: [
      "Push code repository to GitHub.",
      "Connect repository to Render.com or Railway.app.",
      "Configure environment variables (`PORT`, `WHATSAPP_TOKEN`, `PHONE_NUMBER_ID`, `WEBHOOK_VERIFY_TOKEN`, `APP_SECRET`).",
      "Deploy service and copy assigned HTTPS URL (e.g., `https://my-whatsapp-bot.onrender.com`).",
      "Update Callback URL in Meta Dashboard -> WhatsApp -> Configuration."
    ],
    whyItMatters: "Replaces local ngrok tunnel with a persistent, 24/7 online production cloud endpoint.",
    mockup: {
      type: "annotated",
      screenTitle: "Render / Cloud Deployment Dashboard",
      headerText: "dashboard.render.com",
      actionText: "Connect GitHub repo ➔ Add Environment Variables ➔ Click [Deploy Web Service]",
      targetButton: "Deploy Web Service"
    },
    hinglishNote: "Render ya Railway par backend deploy karke URL milne ke baad Meta Dashboard me Webhook Callback URL update karein.",
    expectedResult: "Live 24/7 cloud server endpoint linked to Meta Cloud API.",
    commonMistakes: [
      "Forgetting to configure environment variables in cloud platform dashboard."
    ],
    nextAction: "Run end-to-end security and reliability audit.",
    nextStepId: "step-22"
  },
  {
    id: "step-22",
    number: "22",
    title: "End-to-End Audit & Testing Checklist",
    category: "advanced",
    categoryLabel: "TESTING & ADVANCED",
    estimatedMinutes: 5,
    summary: "Execute mandatory 12-point production readiness and security audit.",
    whatYouWillDo: [
      "Verify HTTPS SSL cert encryption.",
      "Confirm Permanent System User token setup.",
      "Validate `wamid` message deduplication.",
      "Verify 20-second HTTP 200 OK webhook response handling.",
      "Monitor Meta WhatsApp Manager Quality Rating."
    ],
    whyItMatters: "Conducting thorough production testing prevents unexpected bot downtime and quality rating degradation.",
    expectedResult: "All 12 production audit checkpoints verified green.",
    commonMistakes: [
      "Ignoring Meta Quality Rating alerts leading to phone number tier downgrades."
    ],
    nextAction: "Review common errors and troubleshooting guide.",
    nextStepId: "step-23"
  },
  {
    id: "step-23",
    number: "23",
    title: "Troubleshooting & Error Diagnostics",
    category: "advanced",
    categoryLabel: "TESTING & ADVANCED",
    estimatedMinutes: 6,
    summary: "Learn how to diagnose HTTP 403, HTTP 401, 24-hour customer window limits, and duplicate webhook events.",
    whatYouWillDo: [
      "Inspect Error 403 (Webhook verification token mismatch).",
      "Inspect Error 401 (Expired temporary access token).",
      "Inspect Error 131047 (Reaching 24-hour customer service window expiry).",
      "Implement idempotency checks using message `wamid`."
    ],
    whyItMatters: "Rapid error identification keeps your live chatbot operating smoothly without customer friction.",
    expectedResult: "Clear troubleshooting mental model for all Meta Graph API error codes.",
    nextAction: "Review Frequently Asked Questions.",
    nextStepId: "step-24"
  },
  {
    id: "step-24",
    number: "24",
    title: "Frequently Asked Questions (FAQ)",
    category: "advanced",
    categoryLabel: "TESTING & ADVANCED",
    estimatedMinutes: 5,
    summary: "Answers to common developer questions regarding Meta API pricing, sandbox limits, and permissions.",
    whatYouWillDo: [
      "Review pricing structure (1,000 free service conversations/month).",
      "Understand template messaging rules.",
      "Explore embedded signup for client onboarding."
    ],
    whyItMatters: "Comprehensive FAQ knowledge helps you make informed architectural decisions for client projects.",
    expectedResult: "Full clarity on platform policies and pricing models.",
    nextAction: "Explore AI Chatbot Integration extension.",
    nextStepId: "step-25"
  },
  {
    id: "step-25",
    number: "25",
    title: "Advanced AI Chatbot Extension (Gemini / OpenAI)",
    category: "advanced",
    categoryLabel: "TESTING & ADVANCED",
    estimatedMinutes: 10,
    summary: "Integrate Google Gemini 1.5 Flash or OpenAI GPT-4o to transform keyword bot into a smart conversational AI assistant.",
    whatYouWillDo: [
      "Install Google Generative AI SDK: `npm install @google/generative-ai`.",
      "Configure `GEMINI_API_KEY` in environment variables.",
      "Pass incoming user text prompt to Gemini LLM model.",
      "Return AI generated text response back to user via WhatsApp Graph API."
    ],
    whyItMatters: "Combining WhatsApp Cloud API with Generative AI allows your bot to answer complex customer queries naturally 24/7.",
    codeSnippet: {
      language: "javascript",
      fileName: "services/aiBotService.js",
      code: `const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIResponse(userPrompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemInstruction = "You are a helpful customer support assistant for WhatsApp. Keep answers concise, polite, and under 150 words.";
        
        const result = await model.generateContent([systemInstruction, userPrompt]);
        return result.response.text();
    } catch (error) {
        console.error("AI Generation Error:", error);
        return "I'm sorry, I'm having trouble processing that right now. Please try again later.";
    }
}`
    },
    hinglishNote: "OpenAI ya Google Gemini API connect karke aapka chatbot ek intelligent AI Assistant ban jata hai.",
    expectedResult: "Smart AI-powered conversational WhatsApp Chatbot.",
    commonMistakes: [
      "Sending long, unformatted 1000-word AI responses that exceed WhatsApp chat readability guidelines."
    ],
    nextAction: "Congratulations! You have completed the entire course.",
    nextStepId: null
  }
];
