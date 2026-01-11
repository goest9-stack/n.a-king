import React, { useState, useRef, useEffect } from 'react';
import { FEATURES } from './constants';
import { FeatureConfig } from './types';
import { FeatureCard } from './components/FeatureCard';
import { Icon } from './components/Icon';
import { generateAIResponse } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

const App: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureConfig>(FEATURES[0]);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for auto-scrolling output if needed, though layout keeps it visible
  const outputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear state when switching features
    setResponse(null);
    setInputText('');
    setError(null);
  }, [selectedFeature]);

  const handleExecute = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    // Do not clear response immediately if you want to compare, but standard UX is to clear or show loading
    setResponse(null);

    try {
      const result = await generateAIResponse(
        selectedFeature.model,
        inputText,
        selectedFeature.systemInstruction
      );
      setResponse(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#050505] text-white overflow-hidden selection:bg-red-900/30 selection:text-white">
      
      {/* LEFT SIDEBAR - Navigation */}
      <aside className="w-80 h-full flex flex-col border-r border-white/5 bg-[#080808] relative z-20 flex-shrink-0 hidden md:flex">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Icon name="Crown" className="text-red-700" size={24} />
            <h1 className="text-xl font-bold tracking-[0.2em] brand-font text-white">
              N.A KING
            </h1>
          </div>
          <p className="text-[10px] text-neutral-600 mt-2 uppercase tracking-widest font-semibold">
            Premium AI Suite
          </p>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isSelected={selectedFeature.id === feature.id}
              onClick={() => setSelectedFeature(feature)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="text-[10px] text-neutral-700 text-center uppercase tracking-wider">
            System Status: Operational
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER (Visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#080808] border-b border-white/5 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
           <Icon name="Crown" className="text-red-700" size={20} />
           <span className="font-bold tracking-widest brand-font">N.A KING</span>
        </div>
        <button className="text-neutral-400">
          <Icon name="Sparkles" size={20} />
        </button>
      </div>

      {/* MAIN WORKSPACE - Split Pane Layout */}
      <main className="flex-1 flex flex-col h-full relative z-10 md:pt-0 pt-16">
        
        {/* Top Info Bar */}
        <header className="h-20 border-b border-white/5 flex items-center px-8 justify-between bg-[#050505]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-white/5 text-red-500">
               <Icon name={selectedFeature.icon} size={20} />
            </div>
            <div>
              <h2 className="text-lg font-serif tracking-wide text-white">
                {selectedFeature.name}
              </h2>
              <p className="text-xs text-neutral-500 font-light">
                {selectedFeature.description}
              </p>
            </div>
          </div>
        </header>

        {/* WORKSPACE GRID: Input (Left) | Output (Right) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* INPUT PANEL */}
          <section className="flex-1 flex flex-col p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#050505] min-h-[40%] lg:h-full relative">
            <label className="text-xs text-red-700 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Icon name="Feather" size={12} />
              Input Command
            </label>
            
            <div className="flex-1 relative group">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={selectedFeature.placeholder}
                className="w-full h-full bg-transparent border-0 text-neutral-200 placeholder-neutral-700 focus:ring-0 resize-none text-lg font-light leading-relaxed outline-none"
                spellCheck={false}
              />
            </div>

            <div className="pt-6 flex items-center justify-between">
              <div className="text-[10px] text-neutral-600 uppercase tracking-wider">
                {inputText.length} Characters
              </div>
              <button
                onClick={handleExecute}
                disabled={isLoading || !inputText.trim()}
                className={`
                  h-12 px-8 rounded-sm font-medium tracking-widest text-xs uppercase transition-all duration-300
                  ${isLoading || !inputText.trim()
                    ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
                    : 'bg-white text-black hover:bg-red-700 hover:text-white border border-white hover:border-red-700'
                  }
                `}
              >
                {isLoading ? 'Processing...' : selectedFeature.buttonLabel}
              </button>
            </div>
          </section>

          {/* OUTPUT PANEL */}
          <section className="flex-1 flex flex-col bg-[#080808] relative min-h-[60%] lg:h-full">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/0 via-red-900/50 to-red-900/0 opacity-20" />
             
             <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scroll" ref={outputContainerRef}>
                <label className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-6 flex items-center gap-2 sticky top-0 bg-[#080808] py-2 z-10">
                  <Icon name="Sparkles" size={12} className={isLoading ? "animate-spin text-red-500" : "text-neutral-500"} />
                  {isLoading ? 'Generating Royal Decree...' : 'System Output'}
                </label>

                {error && (
                  <div className="p-6 border border-red-900/30 bg-red-900/5 text-red-200 text-sm font-light leading-relaxed animate-fade-in">
                    <strong className="block font-serif text-red-500 mb-2">Error Encountered</strong>
                    {error}
                  </div>
                )}

                {response ? (
                  <div className="prose prose-invert prose-p:font-light prose-headings:font-serif prose-strong:text-red-400 prose-a:text-red-400 max-w-none animate-fade-in">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                ) : !isLoading && !error && (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-800 gap-4 select-none">
                    <Icon name="Bot" size={48} strokeWidth={1} />
                    <p className="font-serif text-sm tracking-widest opacity-50">Awaiting Input</p>
                  </div>
                )}
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;