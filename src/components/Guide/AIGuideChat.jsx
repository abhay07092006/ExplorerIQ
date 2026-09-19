import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Plus, 
  MessageSquare, 
  Clock, 
  Landmark, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useTravel } from '../../context/useTravel';
import { RECOGNIZED_MONUMENTS } from '../../data/monumentsData';

const INITIAL_SESSIONS = [
  {
    id: 's1',
    title: 'Whispering Gallery Acoustics',
    preview: 'How sound travels 11 times across Gol Gumbaz...',
    date: 'Today',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Tell me about the acoustic secrets of Gol Gumbaz in Bijapur.',
        time: '10:14 AM'
      },
      {
        id: 'm2',
        sender: 'ai',
        title: 'Gol Gumbaz Acoustic Marvel',
        text: "Gol Gumbaz in Vijayapura (Bijapur), Karnataka, features the world's second-largest unsupported dome after St. Peter's Basilica in Rome. Built in 1656 CE by Sultan Mohammed Adil Shah, its crowning engineering triumph is the central Whispering Gallery (Suno Gumbaz).\n\nEven the softest whisper against its circular perimeter wall resonates and echoes distinctly up to 11 times and can be heard 44 meters away on the opposing balcony! The acoustic geometry relies on curved basalt masonry brackets that funnel sound waves along circular focal paths without dissipation.",
        time: '10:14 AM',
        chips: ['How was the dome constructed?', 'Visiting hours for Gol Gumbaz', 'Other Adil Shahi monuments']
      }
    ]
  },
  {
    id: 's2',
    title: 'Chola Bronze Metallurgy',
    preview: 'Lost-wax casting secrets of Thanjavur sculptors...',
    date: 'Yesterday',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'How did Chola dynasty artisans create Nataraja bronze sculptures that never rust?',
        time: 'Yesterday'
      },
      {
        id: 'm2',
        sender: 'ai',
        title: 'Chola Lost-Wax Metallurgy',
        text: "The Imperial Cholas (9th–13th century CE) mastered the 'Madhuchehishtavidhanam' (Cire Perdue / Lost-Wax Casting) described in the ancient Shilpa Shastras. Artisans in Swamimalai fashioned models from beeswax and resin, wrapped them in unique alluvial clay from the Cauvery River, and poured molten 'Panchaloha' (an alloy of copper, zinc, tin, gold, and silver).\n\nThe resulting Nataraja bronzes exhibit microscopic crystal stability that resists corrosion for a millennium. CERN in Switzerland chose a 2-meter Chola Nataraja as an emblem of cosmic dance and subatomic particle physics.",
        time: 'Yesterday',
        chips: ['Visit Brihadeeswarar Temple', 'Swamimalai bronze workshops today', 'Chola naval expeditions']
      }
    ]
  },
  {
    id: 's3',
    title: 'Hampi Musical Pillars',
    preview: 'Vittala Temple stone pillars resonating Sa-Re-Ga-Ma...',
    date: '3 days ago',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Do the pillars of Vittala Temple in Hampi really produce musical notes?',
        time: '3 days ago'
      },
      {
        id: 'm2',
        sender: 'ai',
        title: 'Acoustic Granite of Vittala Temple',
        text: "Yes, the 56 monolithic pillars in the Ranga Mandapa of the 16th-century Vittala Temple in Hampi are celebrated as the 'SaReGaMa Pillars'. Carved during the reign of Vijayanagara Emperor King Deva Raya II and expanded by Krishnadevaraya, each principal pillar is surrounded by seven slender acoustic shafts.\n\nWhen gently tapped, these granite shafts produce distinct notes corresponding to classical Indian percussion instruments—Mrudangam, Damru, and Ghatam. Modern metallurgical analysis revealed varying concentrations of silica and iron inside the stone matrix, engineered intentionally through selective quarrying.",
        time: '3 days ago',
        chips: ['Stone Chariot secrets', 'Best time to tour Hampi', 'Virupaksha Temple history']
      }
    ]
  }
];

const SUGGESTION_PROMPTS = [
  'Tell me an untold legend about the Taj Mahal',
  'What engineering secret keeps Konark Sun Temple balanced?',
  'Explain Ajanta Cave rock-cut paintings and minerals',
  'What is the best culinary trail in Old Varanasi?',
  'Which UNESCO monuments in India are best to visit in winter?'
];

export default function AIGuideChat() {
  const { playAudio, pauseAudio, audioState } = useTravel();
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState('s1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);
  const counterRef = useRef(100);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isTyping]);

  const handleStartNewSession = () => {
    counterRef.current += 1;
    const newSession = {
      id: 's_' + counterRef.current,
      title: 'New Cultural Inquiry',
      preview: 'Ask any question regarding Indian heritage...',
      date: 'Just now',
      messages: [
        {
          id: 'm_welcome',
          sender: 'ai',
          title: 'ExplorerIQ Cultural Intelligence',
          text: "Namaste! I am your AI Heritage Guide and Cultural Historian. Ask me anything about India's 100+ UNESCO monuments, ancient architectural treatises, dynastic chronicles, sacred temples, or regional culinary legends.",
          time: 'Just now',
          chips: [
            'Tell me a historical story',
            'Architecture & construction secrets',
            'Hidden gems in Rajasthan',
            'Visiting tips & ticket guides'
          ]
        }
      ]
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const generateAIResponse = (query) => {
    const lower = query.toLowerCase();
    
    // Check if query matches any monument in database
    const matchedMonument = RECOGNIZED_MONUMENTS.find((m) => 
      lower.includes(m.name.toLowerCase()) || 
      lower.includes(m.city.toLowerCase()) || 
      (m.hindiName && lower.includes(m.hindiName))
    );

    if (matchedMonument) {
      return {
        title: `${matchedMonument.name} (${matchedMonument.city}, ${matchedMonument.state})`,
        text: `${matchedMonument.audioGuideTranscript}\n\n• Era & Dynasty: Built in ${matchedMonument.constructionEra} commissioned by ${matchedMonument.commissionedBy}.\n• Architecture & Craft: Built with ${matchedMonument.material}. Architectural Style: ${matchedMonument.architecturalStyle}.\n• Visiting Info: Open ${matchedMonument.openingHours}. Closed: ${matchedMonument.closedOn}. Ticket: Indian ${matchedMonument.ticketPricing?.indian || '₹50'}, Foreigner ${matchedMonument.ticketPricing?.foreigner || '₹600'}.\n• Folklore: ${matchedMonument.legendsAndFacts || 'A protected national treasure of unparalleled artistic depth.'}`,
        chips: [
          `Key highlights of ${matchedMonument.name}`,
          `Where to eat near ${matchedMonument.name}`,
          `Nearby attractions in ${matchedMonument.city}`
        ]
      };
    }

    // Check if query is about food / cuisine
    if (lower.includes('food') || lower.includes('cuisine') || lower.includes('eat') || lower.includes('culinary')) {
      return {
        title: 'Imperial & Regional Culinary Heritage',
        text: "India's culinary legacy is deeply tied to its historical monuments and royal courts! In Agra, Mughlai shahi cuisine and 500-year-old Agra Petha (confection made of ash gourd for Taj Mahal artisans) rule the streets. In Varanasi, start your dawn with Kachori Jalebi at Thatheri Bazaar and evening Malaiyo (saffron milk cloud foam). In Jaipur, savour Dal Baati Churma and Ghevar at Johari Bazaar. In Hyderabad, authentic Dum Biryani cooked with dum pukht techniques originated under the Nizams.",
        chips: ['Street food in Varanasi', 'Mughlai food in Old Delhi', 'Rajasthani royal thali']
      };
    }

    // Check if query is about architecture
    if (lower.includes('architect') || lower.includes('stone') || lower.includes('build') || lower.includes('temple')) {
      return {
        title: 'Classical Indian Architectural Traditions',
        text: "Ancient and medieval Indian architecture flourished under three principal temple styles codified in the Vastu Shastras:\n\n1. Nagara (North India): Featuring curvilinear beehive-shaped spires (shikharas) over the sanctum, as seen in Khajuraho and Konark.\n2. Dravida (South India): Characterized by stepped pyramidical towers (vimanas) and towering gateway towers (gopurams), immortalized by Brihadeeswarar in Thanjavur and Meenakshi in Madurai.\n3. Vesara (Deccan Fusion): Hybrid style perfected by the Chalukyas and Hoysalas at Belur and Halebidu with star-shaped plinths and soapstone lace filigree.",
        chips: ['Brihadeeswarar Temple vimana', 'Khajuraho Nagara carvings', 'Konark magnetic mystery']
      };
    }

    // Generic knowledgeable response
    return {
      title: 'Indian Cultural Chronicle',
      text: `Regarding "${query}": India's heritage spans over 5,000 years, from the planned brick citadels of the Indus Valley Civilization to monumental Dravidian gopurams and Indo-Islamic marble masterpieces.\n\nEvery stone tells a tale of dynastic patronage—from the Mauryans, Guptas, and Cholas to the Vijayanagara Emperors, Rajputs, and Mughals. Our ExplorerIQ system incorporates verified architectural records, Archaeological Survey of India (ASI) guides, and oral folklore to illuminate these treasures.`,
      chips: [
        'Tell me a historical story',
        'Architecture & construction secrets',
        'Visiting tips & best season',
        'Local culinary legends'
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    counterRef.current += 1;
    const userMessage = {
      id: 'm_' + counterRef.current,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session with user message
    const updatedMessages = [...activeSession.messages, userMessage];
    const updatedSessions = sessions.map((s) => {
      if (s.id === activeSession.id) {
        return {
          ...s,
          title: s.title === 'New Cultural Inquiry' ? text.slice(0, 30) + '...' : s.title,
          preview: text.slice(0, 40) + '...',
          messages: updatedMessages
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      counterRef.current += 1;
      const aiReplyData = generateAIResponse(text);
      const aiMessage = {
        id: 'm_ai_' + counterRef.current,
        sender: 'ai',
        title: aiReplyData.title,
        text: aiReplyData.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: aiReplyData.chips
      };

      setSessions((prevSessions) => 
        prevSessions.map((s) => {
          if (s.id === activeSession.id) {
            return {
              ...s,
              messages: [...updatedMessages, aiMessage]
            };
          }
          return s;
        })
      );
      setIsTyping(false);
    }, 800);
  };

  const handleAudioNarration = (text, title) => {
    if (audioState.isPlaying && audioState.title === title) {
      pauseAudio();
    } else {
      playAudio(text, title);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#121824] border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-serif font-semibold text-amber-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Active Heritage Intelligence</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#E2D9CC] tracking-wide">
                Personal AI Cultural Guide
              </h1>
              <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-xl">
                Real-time architectural analysis, dynastic chronicles, folklore, and visitor intelligence across 100+ Indian heritage destinations.
              </p>
            </div>
          </div>

          <button
            onClick={handleStartNewSession}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold text-xs rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Session</span>
          </button>
        </div>
      </div>

      {/* Main Chat Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px] bg-[#121824] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* LEFT PANEL: Conversation History & Cultural Topics */}
        <div className="lg:col-span-4 bg-[#0B0F14] border-r border-amber-500/20 flex flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-serif font-bold text-xs tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Exploration Archives</span>
            </h3>
            <span className="text-[10px] font-serif text-slate-400 bg-[#1A2232] px-2 py-0.5 rounded-full border border-amber-500/20">
              {sessions.length} Saved
            </span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pr-1">
            {sessions.map((session) => {
              const isActive = session.id === activeSession.id;
              return (
                <button
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#1A2232] border-amber-400/60 shadow-lg text-[#E2D9CC]'
                      : 'bg-[#121824]/60 border-amber-500/10 hover:border-amber-500/30 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-xs truncate max-w-[70%] text-amber-300">
                      {session.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {session.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 font-sans">
                    {session.preview}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Cultural Knowledge Pills */}
          <div className="mt-4 pt-4 border-t border-amber-500/20 px-2 space-y-2">
            <span className="text-[10px] font-serif font-bold text-amber-400/80 uppercase tracking-wider block">
              Historical Knowledge Base
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Mughal Era', 'Chola Bronzes', 'Vijayanagara', 'Nagara Style', 'Dravidian Temples', 'Vastu Shastra'].map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-[#1A2232] border border-amber-500/20 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Conversation Stream & Interactive Input */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#121824] min-h-[620px]">
          
          {/* Active Session Header */}
          <div className="px-6 py-4 bg-[#0B0F14]/70 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-sm text-[#E2D9CC]">
                  {activeSession.title}
                </h2>
                <p className="text-[11px] text-amber-400/80 font-serif flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Arya • Senior AI Heritage Historian</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const s = sessions.find((x) => x.id === activeSession.id);
                if (s) {
                  s.messages = [s.messages[0]];
                  setSessions([...sessions]);
                }
              }}
              title="Reset Conversation"
              className="p-2 rounded-xl bg-[#1A2232] border border-amber-500/20 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[460px]">
            {activeSession.messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              const isPlayingAudio = audioState.isPlaying && audioState.title === msg.title;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-4 sm:p-5 max-w-xl text-xs leading-relaxed shadow-lg ${
                      isAi
                        ? 'bg-[#1A2232] border border-amber-500/30 text-[#E2D9CC] rounded-tl-none'
                        : 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/40 text-amber-100 rounded-tr-none'
                    }`}
                  >
                    {isAi && msg.title && (
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 mb-3">
                        <span className="font-serif font-bold text-xs text-amber-300 flex items-center gap-1.5">
                          <Landmark className="w-3.5 h-3.5 text-amber-400" />
                          {msg.title}
                        </span>
                        
                        <button
                          onClick={() => handleAudioNarration(msg.text, msg.title)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-serif font-bold border transition-colors cursor-pointer ${
                            isPlayingAudio
                              ? 'bg-rose-600 text-white border-rose-400'
                              : 'bg-[#121824] text-amber-300 border-amber-500/30 hover:border-amber-400'
                          }`}
                        >
                          {isPlayingAudio ? (
                            <>
                              <VolumeX className="w-3 h-3" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <p className="whitespace-pre-line font-sans leading-relaxed text-[12px] text-slate-200">
                      {msg.text}
                    </p>

                    <div className="mt-2 text-[10px] text-slate-400 text-right">
                      {msg.time}
                    </div>

                    {/* Quick follow-up chips attached to AI message */}
                    {isAi && msg.chips && msg.chips.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-amber-500/20 flex flex-wrap gap-1.5">
                        {msg.chips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(chip)}
                            className="px-2.5 py-1 rounded-lg bg-[#121824] hover:bg-[#0B0F14] border border-amber-500/30 text-amber-300 text-[10px] font-serif transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>{chip}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-amber-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-xl bg-[#1A2232] border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3 animate-in fade-in">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-[#1A2232] border border-amber-500/30 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="font-serif text-[11px] text-slate-400 ml-1">Arya is referencing heritage chronicles...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick-Suggestion Prompts Strip */}
          <div className="px-6 py-2 bg-[#0B0F14]/50 border-t border-amber-500/20 overflow-x-auto scrollbar-none flex gap-2">
            {SUGGESTION_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-xl bg-[#1A2232] hover:bg-[#222C3E] border border-amber-500/25 hover:border-amber-400 text-amber-200 text-[11px] font-serif whitespace-nowrap transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-4 sm:p-6 bg-[#0B0F14] border-t border-amber-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about architectural secrets, dynasties, folklore, or visiting tips..."
                  className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-[#121824] border border-amber-500/30 text-[#E2D9CC] placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-serif font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
