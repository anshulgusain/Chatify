import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, RefreshCw, Bot, User, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Simulated bot response logic — realistic, educational
const getBotResponse = (msg) => {
  const lower = msg.toLowerCase().trim();

  const rules = [
    { patterns: ['hello', 'hi', 'hey', 'namaste', 'hola'], response: '👋 Hello! I am your WhatsApp Chatbot powered by Meta Cloud API.\n\nTry sending:\n• `menu` — see options\n• `status` — check webhook status\n• `help` — list commands\n• `token` — learn about access tokens' },
    { patterns: ['menu', 'options', 'option', 'help'], response: '📋 *Main Menu:*\n\n1️⃣ `status` — Webhook connectivity\n2️⃣ `token` — Access token guide\n3️⃣ `webhook` — Webhook setup\n4️⃣ `deploy` — Deployment steps\n5️⃣ `error` — Common errors\n6️⃣ `test` — Send a test message' },
    { patterns: ['status', 'online', 'connection'], response: '✅ *Webhook Status: ACTIVE*\n\n• Webhook URL: Connected\n• Verify Token: Validated\n• API Version: v20.0\n• Phone Number ID: Registered\n\nAll systems operational! 🚀' },
    { patterns: ['token', 'access token', 'bearer'], response: '🔑 *Access Token Types:*\n\n1. **Temporary Token** (24h) — from Meta Dashboard, good for testing\n2. **Permanent Token** — requires System User via Business Manager\n\n⚠️ Never commit tokens to GitHub!\n\nStore in `.env` file as:\n`WHATSAPP_TOKEN=EAAxxxxxx`' },
    { patterns: ['webhook', 'ngrok', 'tunnel'], response: '🔗 *Webhook Setup:*\n\n1. Start ngrok: `ngrok http 3000`\n2. Copy HTTPS URL (e.g. https://abc123.ngrok.io)\n3. Go to Meta Dashboard → WhatsApp → Configuration\n4. Paste URL as: `https://abc123.ngrok.io/webhook`\n5. Set Verify Token to match your `.env`\n6. Subscribe to `messages` field\n\nThen send a WhatsApp message and watch your terminal logs!' },
    { patterns: ['deploy', 'production', 'render', 'railway', 'heroku', 'vps'], response: '🚀 *Deployment Checklist:*\n\n✅ Set all env vars on hosting platform\n✅ Use permanent token (System User)\n✅ Register real WhatsApp number\n✅ Update webhook URL in Meta Dashboard\n✅ Enable HTTPS (required by Meta)\n✅ Test with real device\n✅ Set up MongoDB Atlas for production\n✅ Add rate limiting & error handling' },
    { patterns: ['error', 'problem', 'issue', '400', '401', '403', '404'], response: '🔧 *Common Errors & Fixes:*\n\n❌ 400 Bad Request — Check JSON body format\n❌ 401 Unauthorized — Token expired or wrong\n❌ 403 Forbidden — Phone number ID mismatch\n❌ 404 Not Found — Wrong API endpoint version\n❌ Webhook not receiving — Check ngrok is running\n\nRun: `curl -X GET "https://graph.facebook.com/v20.0/me?access_token=YOUR_TOKEN"` to debug.' },
    { patterns: ['test', 'send message', 'curl'], response: '🧪 *Test Your Bot via cURL:*\n\n```bash\ncurl -X POST \\\n"https://graph.facebook.com/v20.0/PHONE_ID/messages" \\\n-H "Authorization: Bearer YOUR_TOKEN" \\\n-H "Content-Type: application/json" \\\n-d \'{"messaging_product":"whatsapp","to":"919876543210","type":"text","text":{"body":"Hello!"}}\'\n```\n\nReplace PHONE_ID, YOUR_TOKEN, and phone number with your values.' },
    { patterns: ['mongodb', 'database', 'db', 'mongoose'], response: '🗄️ *MongoDB Integration:*\n\n1. Create free cluster at mongodb.com/atlas\n2. Get connection string\n3. Add to .env: `MONGO_URI=mongodb+srv://...`\n4. Install: `npm install mongoose`\n5. Connect in server.js\n6. Create Message schema to log all conversations\n\nThis lets you track user sessions and analytics!' },
    { patterns: ['ai', 'gpt', 'openai', 'gemini', 'llm', 'chatgpt'], response: '🤖 *AI Integration:*\n\nTo make your bot intelligent:\n\n**With OpenAI:**\n`npm install openai`\nCall `openai.chat.completions.create()` inside your webhook handler\n\n**With Google Gemini:**\n`npm install @google/generative-ai`\nUse `model.generateContent(userMessage)`\n\nPass the user\'s WhatsApp message as the prompt and send AI\'s response back!' },
  ];

  for (const rule of rules) {
    if (rule.patterns.some(p => lower.includes(p))) {
      return { text: rule.response, delay: 800 + Math.random() * 600 };
    }
  }

  return {
    text: `🤔 I didn't understand "*${msg}*".\n\nTry: \`menu\`, \`status\`, \`webhook\`, \`token\`, \`deploy\`, \`error\`, \`test\`, \`mongodb\`, or \`ai\``,
    delay: 600,
  };
};

export const BotSimulator = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: '👋 Welcome to the *WhatsApp Bot Simulator!*\n\nThis is how your chatbot will behave once deployed. Try sending:\n\n• `hello` — Greet the bot\n• `menu` — See all commands\n• `webhook` — Webhook setup guide\n• `token` — Access token info\n• `deploy` — Production checklist',
      time: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollBottom(); }, [messages, isTyping]);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: input.trim(),
      time: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const { text, delay } = getBotResponse(input.trim());
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'bot',
        text,
        time: new Date(),
      }]);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickMessages = ['hello', 'menu', 'webhook', 'deploy', 'token', 'error', 'ai'];

  const formatBotText = (text) => {
    return text
      .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-700/60 px-1 py-0.5 rounded text-emerald-300 text-xs font-mono">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div id="interactive-demo" className="scroll-mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#d1c9c0] dark:border-slate-800">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
          Interactive Demo
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Bot Simulator
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Experience your WhatsApp bot before building it. Type any message or click quick-send chips below.
        </p>
      </div>

      {/* Phone Frame */}
      <div className="max-w-md mx-auto">
        <div className="bg-[#111b21] rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50" style={{ height: '580px', display: 'flex', flexDirection: 'column' }}>
          {/* WhatsApp-style Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] border-b border-slate-700/50">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">WhatsApp Bot</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </div>
            </div>
            <button
              onClick={() => {
                setMessages([{
                  id: Date.now(),
                  from: 'bot',
                  text: '🔄 Chat cleared! Send a message to get started again.\n\nTry: `hello`, `menu`, `webhook`',
                  time: new Date(),
                }]);
              }}
              className="p-1.5 rounded-full hover:bg-slate-700/60 transition-colors text-slate-400 hover:text-slate-200"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Background */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{
              background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(135deg, #111b21 0%, #0b141a 100%)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.from === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mr-2 mt-auto mb-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.from === 'user'
                      ? 'bg-[#005c4b] text-white rounded-tr-sm'
                      : 'bg-[#202c33] text-slate-200 rounded-tl-sm'
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: formatBotText(msg.text) }}
                  />
                  <div className={`text-[10px] mt-1 text-right ${msg.from === 'user' ? 'text-emerald-300/70' : 'text-slate-500'}`}>
                    {formatTime(msg.time)}
                    {msg.from === 'user' && ' ✓✓'}
                  </div>
                </div>
                {msg.from === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 ml-2 mt-auto mb-1">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-[#202c33] px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="px-3 pb-3 pt-2 bg-[#202c33] border-t border-slate-700/50">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickMessages.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  className="px-2 py-0.5 bg-slate-700/80 hover:bg-emerald-800/60 text-slate-300 hover:text-emerald-300 rounded-full text-[10px] font-mono font-bold transition-colors border border-slate-600 hover:border-emerald-700"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-[#2a3942] border border-slate-600/50 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-600 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-500 dark:text-slate-500 mt-3 font-medium">
          🎯 Simulation only — no real API calls. Build the real thing by following the tutorial above.
        </p>
      </div>
    </div>
  );
};
