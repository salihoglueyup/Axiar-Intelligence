import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  FileText, 
  Languages, 
  Brain,
  Zap,
  BookOpen,
  Mic,
  Volume2,
  Download,
  Upload,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Target,
  Hash,
  Quote,
  Globe,
  Headphones
} from 'lucide-react';

const NaturalLanguageProcessing = () => {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState('');
  const [translationResults, setTranslationResults] = useState(null);

  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'chatbot', label: 'AI Chatbot', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'summarization', label: 'Text Summarization', icon: <FileText className="w-4 h-4" /> },
    { id: 'translation', label: 'Translation', icon: <Globe className="w-4 h-4" /> },
    { id: 'speech', label: 'Speech Recognition', icon: <Mic className="w-4 h-4" /> }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'tr', name: 'Turkish' }
  ];

  useEffect(() => {
    // Auto-scroll chat to bottom
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    // Mock AI response - replace with actual API call
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(inputText),
        timestamp: new Date().toISOString(),
        confidence: 0.92
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const generateAIResponse = (input) => {
    const responses = [
      "That's an interesting question! Let me help you with that.",
      "Based on my analysis, I can provide you with the following insights...",
      "I understand what you're looking for. Here's what I found...",
      "Great point! Let me elaborate on that topic for you.",
      "I've processed your request and here are the key takeaways..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSentimentAnalysis = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Mock sentiment analysis - replace with actual API call
    setTimeout(() => {
      const sentiment = Math.random();
      let label, color, emoji;

      if (sentiment > 0.6) {
        label = 'Positive';
        color = 'text-green-500';
        emoji = '😊';
      } else if (sentiment < 0.4) {
        label = 'Negative';
        color = 'text-red-500';
        emoji = '😞';
      } else {
        label = 'Neutral';
        color = 'text-yellow-500';
        emoji = '😐';
      }

      setAnalysisResults({
        sentiment: sentiment,
        label: label,
        color: color,
        emoji: emoji,
        confidence: 0.85 + Math.random() * 0.15,
        emotions: {
          joy: Math.random(),
          anger: Math.random(),
          fear: Math.random(),
          sadness: Math.random(),
          surprise: Math.random()
        },
        keywords: extractKeywords(inputText)
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const extractKeywords = (text) => {
    // Mock keyword extraction
    const words = text.toLowerCase().split(' ');
    return words.slice(0, 5).map(word => ({
      word: word,
      score: Math.random()
    }));
  };

  const handleSummarization = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Mock summarization - replace with actual API call
    setTimeout(() => {
      setAnalysisResults({
        originalText: inputText,
        summary: "This is a summarized version of the original text, containing the key points and main ideas in a more concise format.",
        compressionRatio: 0.3,
        keyPoints: [
          "First key point extracted from the text",
          "Second important concept highlighted",
          "Third main idea identified"
        ],
        readingTime: {
          original: Math.floor(inputText.split(' ').length / 200),
          summary: 1
        }
      });
      
      setIsProcessing(false);
    }, 3000);
  };

  const handleTranslation = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Mock translation - replace with actual API call
    setTimeout(() => {
      setTranslationResults({
        originalText: inputText,
        translatedText: "Este es el texto traducido al español como ejemplo.",
        sourceLanguage: 'en',
        targetLanguage: 'es',
        confidence: 0.94,
        alternatives: [
          "Alternative translation 1",
          "Alternative translation 2"
        ]
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Mock recording - replace with actual Web Audio API
      setTimeout(() => {
        setIsRecording(false);
        setAudioTranscript("This is the transcribed text from the audio recording.");
      }, 5000);
    } catch (error) {
      console.error('Microphone access denied:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const renderChatbot = () => (
    <div className="space-y-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
        <div 
          ref={textAreaRef}
          className="h-96 overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4" />
              <p>Start a conversation with the AI assistant</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                    {message.confidence && (
                      <span className="text-xs opacity-70">
                        {Math.round(message.confidence * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              disabled={isProcessing}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isProcessing}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSentimentAnalysis = () => (
    <div className="space-y-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Analyze Text Sentiment</h3>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
        />
        
        <button
          onClick={handleSentimentAnalysis}
          disabled={!inputText.trim() || isProcessing}
          className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </div>

      {analysisResults && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Overall Sentiment</h4>
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{analysisResults.emoji}</span>
                <div>
                  <div className={`text-2xl font-bold ${analysisResults.color}`}>
                    {analysisResults.label}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {Math.round(analysisResults.confidence * 100)}% confidence
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Emotion Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(analysisResults.emotions).map(([emotion, value]) => (
                  <div key={emotion} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{emotion}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{ width: `${value * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {Math.round(value * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysisResults.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {keyword.word} ({Math.round(keyword.score * 100)}%)
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSummarization = () => (
    <div className="space-y-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Text Summarization</h3>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to summarize..."
          className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
        />
        
        <button
          onClick={handleSummarization}
          disabled={!inputText.trim() || isProcessing}
          className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>

      {analysisResults && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
          
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-gray-300">{analysisResults.summary}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-cyan-500 text-lg font-bold">
                {Math.round(analysisResults.compressionRatio * 100)}%
              </div>
              <div className="text-gray-400 text-sm">Compression</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-cyan-500 text-lg font-bold">
                {analysisResults.readingTime.original}min
              </div>
              <div className="text-gray-400 text-sm">Original Reading Time</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-cyan-500 text-lg font-bold">
                {analysisResults.readingTime.summary}min
              </div>
              <div className="text-gray-400 text-sm">Summary Reading Time</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Key Points</h4>
            <ul className="space-y-2">
              {analysisResults.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  const renderTranslation = () => (
    <div className="space-y-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Text Translation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Source Language
            </label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Target Language
            </label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
        />
        
        <button
          onClick={handleTranslation}
          disabled={!inputText.trim() || isProcessing}
          className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Translating...' : 'Translate'}
        </button>
      </div>

      {translationResults && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Translation Results</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Original Text</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300">{translationResults.originalText}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Translated Text</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300">{translationResults.translatedText}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Confidence: {Math.round(translationResults.confidence * 100)}%</span>
              <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center space-x-1">
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSpeechRecognition = () => (
    <div className="space-y-4">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Speech Recognition</h3>
        
        <div className="flex items-center justify-center py-8">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-6 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-cyan-600 hover:bg-cyan-700'
            }`}
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        </div>
        
        {isRecording && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400">Recording...</span>
            </div>
            <p className="text-gray-400 text-sm">Click the microphone to stop recording</p>
          </div>
        )}
        
        {audioTranscript && (
          <div className="mt-6">
            <h4 className="text-white font-medium mb-2">Transcript</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300">{audioTranscript}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Languages className="w-8 h-8 text-cyan-500" />
            <span>Natural Language Processing</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Advanced text analysis, translation, and language understanding
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'chatbot' && renderChatbot()}
        {activeTab === 'sentiment' && renderSentimentAnalysis()}
        {activeTab === 'summarization' && renderSummarization()}
        {activeTab === 'translation' && renderTranslation()}
        {activeTab === 'speech' && renderSpeechRecognition()}
      </div>
    </div>
  );
};

export default NaturalLanguageProcessing;
