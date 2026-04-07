import React, { useState } from 'react';
import { Globe, Leaf, AlertTriangle, BookOpen, Sparkles, CheckCircle, AlertCircle, Copy, Lightbulb } from 'lucide-react';

// --- DATA FOR ARBEIDSARKET ---

const part1Data = [
  {
    id: 'p1_1',
    icon: '⛽',
    title: 'Fossilt brensel (kull, olje, gass)',
    period: 'ca. 1750–i dag',
    past: 'Behov for energi til industri, transport og oppvarming.',
    present: 'Forbrenning slipper ut CO₂ og andre klimagasser – hovedårsak til global oppvarming.'
  },
  {
    id: 'p1_2',
    icon: '❄️',
    title: 'KFK-gasser (kjøleskap, spray)',
    period: 'ca. 1930–1987',
    past: 'Trygt kjølemiddel – ikke brannfarlig, lite reaktivt.',
    present: 'Brøt ned ozonlaget i stratosfæren. Ble forbudt via Montreal-protokollen.'
  },
  {
    id: 'p1_3',
    icon: '🌳',
    title: 'Storskala avskoging & intensivt landbruk',
    period: 'ca. 1800–i dag',
    past: 'Sikre matproduksjon til en voksende befolkning, og bygging av infrastruktur.',
    present: 'Tap av CO₂-lagre, tap av biodiversitet, økt erosjon – bidrar til klimaendringer.'
  }
];

const part3Data = [
  {
    id: 'p3_1',
    text: 'Hva har de tre løsningene i Del 1 til felles? Hva slags type tenkning manglet da løsningene ble laget?'
  },
  {
    id: 'p3_2',
    text: 'Hva mener du med «bærekraftig løsning»? Skriv din egen definisjon med egne ord.'
  },
  {
    id: 'p3_3',
    text: 'Hvilke kriterier bør en løsning oppfylle for å ikke bli et fremtidig klimaproblem?'
  },
  {
    id: 'p3_4',
    text: 'Finner du noen løsninger i dag som kanskje blir et klima- eller miljøproblem i fremtiden? Begrunn svaret.'
  }
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  // Håndter endringer i input-feltene
  const handleInputChange = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Generer prompt og kopier til utklippstavle
  const handleCopyForAI = () => {
    const answeredCount = Object.keys(answers).filter(key => answers[key]?.trim() !== '').length;
    if (answeredCount < 3) {
      setError('Du må fylle ut litt mer av arbeidsarket (minst 3 felt) før du kan be om tilbakemelding!');
      return;
    }

    setError('');
    
    // --- Bygg opp prompten for KI-en ---
    let promptText = 'Du er en pedagogisk, støttende og faglig dyktig geofaglærer for Vg3-elever i videregående skole. Jeg er en Vg3-elev som nettopp har fylt ut et arbeidsark om "Bærekraftig problemløsning". Lag et motiverende og lærerikt sammendrag (ca. 3-4 avsnitt) av arbeidet mitt. Trekk frem gode poenger jeg har kommet med, spesielt de egne eksemplene og refleksjonene mine. Gi meg et lite tips til videre tenkning på slutten. Skriv direkte til meg (bruk "du").\n\nHer er besvarelsen min:\n\n';
    
    // Del 1
    promptText += '--- DEL 1: Mine alternative løsninger på historiske problemer ---\n';
    part1Data.forEach(item => {
      promptText += `Problem: ${item.title}\nMitt forslag til hva som kunne vært gjort annerledes: ${answers[`${item.id}_alt`] || '[Ikke besvart]'}\n\n`;
    });

    // Del 2
    promptText += '--- DEL 2: Mine egne eksempler på historiske "løsninger" som ble problemer ---\n';
    [1, 2, 3].forEach(num => {
      const sol = answers[`p2_${num}_sol`];
      if (sol) {
        promptText += `Eksempel ${num}: ${sol}\n`;
        promptText += `- Problemet da: ${answers[`p2_${num}_past`] || '[Ikke besvart]'}\n`;
        promptText += `- Problemet nå: ${answers[`p2_${num}_curr`] || '[Ikke besvart]'}\n`;
        promptText += `- Hva kunne vært gjort annerledes: ${answers[`p2_${num}_alt`] || '[Ikke besvart]'}\n\n`;
      }
    });

    // Del 3
    promptText += '--- DEL 3: Refleksjonsspørsmål ---\n';
    part3Data.forEach(q => {
      promptText += `Spørsmål: ${q.text}\nSvar: ${answers[q.id] || '[Ikke besvart]'}\n\n`;
    });

    // Bruker en eldre metode for kopiering for å sikre at det fungerer i alle nettlesere og iFrames
    const textArea = document.createElement("textarea");
    textArea.value = promptText;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 8000); // Skjul bekreftelsen etter 8 sekunder
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      setError('Kunne ikke kopiere teksten automatisk. Vennligst prøv igjen.');
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white rounded-3xl shadow-lg p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Globe className="w-64 h-64 absolute -top-10 -left-10" />
            <Leaf className="w-64 h-64 absolute -bottom-10 -right-10" />
          </div>
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <Globe className="w-8 h-8 text-emerald-100" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Bærekraftig Problemløsning</h1>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg leading-relaxed">
              Kan du finne historiske «løsninger» som ble et klimaproblem? Mange oppfinnelser virket geniale da de ble laget, men skapte uforutsette problemer for fremtiden. 
            </p>
          </div>
        </div>

        {/* DEL 1 */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 border-b-2 border-emerald-200 pb-2">
            <div className="bg-emerald-100 p-2 rounded-lg"><BookOpen className="w-6 h-6 text-emerald-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">DEL 1 – Tre gitte eksempler</h2>
          </div>
          <p className="text-slate-600">Analyser disse tre historiske eksemplene. Fyll inn hva du mener man burde gjort annerledes med den kunnskapen vi har i dag.</p>
          
          <div className="grid gap-6">
            {part1Data.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <span className="text-sm text-slate-500 font-medium">{item.period}</span>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hva var problemet da?</h4>
                    <p className="text-sm text-slate-700">{item.past}</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Hva er problemet nå?</h4>
                    <p className="text-sm text-red-900">{item.present}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-emerald-700">
                    Hva kunne man gjort annerledes?
                  </label>
                  <textarea
                    value={answers[`${item.id}_alt`] || ''}
                    onChange={(e) => handleInputChange(`${item.id}_alt`, e.target.value)}
                    placeholder="Din analyse..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white resize-y"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEL 2 */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center space-x-3 border-b-2 border-emerald-200 pb-2">
            <div className="bg-emerald-100 p-2 rounded-lg"><Lightbulb className="w-6 h-6 text-emerald-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">DEL 2 – Finn tre egne eksempler!</h2>
          </div>
          <p className="text-slate-600">Finn tre historiske "løsninger" som du mener senere ble et klima- eller miljøproblem.</p>
          
          <div className="grid gap-8">
            {[1, 2, 3].map((num) => (
              <div key={`p2_${num}`} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 ml-4">Ditt eksempel #{num}</h3>
                
                <div className="space-y-4 ml-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Hva var løsningen / oppfinnelsen?</label>
                    <input
                      type="text"
                      value={answers[`p2_${num}_sol`] || ''}
                      onChange={(e) => handleInputChange(`p2_${num}_sol`, e.target.value)}
                      placeholder="F.eks: Engangsplast..."
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Hva var problemet da?</label>
                      <textarea
                        value={answers[`p2_${num}_past`] || ''}
                        onChange={(e) => handleInputChange(`p2_${num}_past`, e.target.value)}
                        placeholder="Hvorfor var dette en god idé den gangen?"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 resize-y"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Hva er problemet nå?</label>
                      <textarea
                        value={answers[`p2_${num}_curr`] || ''}
                        onChange={(e) => handleInputChange(`p2_${num}_curr`, e.target.value)}
                        placeholder="Hvilke konsekvenser ser vi i dag?"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 resize-y"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-700 mb-1">Hva kunne man gjort annerledes?</label>
                    <textarea
                      value={answers[`p2_${num}_alt`] || ''}
                      onChange={(e) => handleInputChange(`p2_${num}_alt`, e.target.value)}
                      placeholder="Din refleksjon..."
                      className="w-full px-4 py-2 rounded-lg border border-emerald-300 bg-emerald-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 resize-y"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEL 3 */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center space-x-3 border-b-2 border-emerald-200 pb-2">
            <div className="bg-emerald-100 p-2 rounded-lg"><AlertTriangle className="w-6 h-6 text-emerald-700" /></div>
            <h2 className="text-2xl font-bold text-slate-800">DEL 3 – Refleksjon</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-8">
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-800 text-sm flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p><strong>Tips:</strong> Bruk gjerne internett, lærebok eller KI til å finne eksempler og hjelp – men begrunn alltid svarene med din egen forståelse.</p>
              </div>

              {part3Data.map((q, index) => (
                <div key={q.id} className="space-y-3">
                  <label className="block text-lg font-medium text-slate-800 leading-relaxed">
                    <span className="text-emerald-600 font-bold mr-2">{index + 1}.</span> 
                    {q.text}
                  </label>
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="↳ Ditt svar her..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-slate-50 focus:bg-white resize-y"
                  />
                </div>
              ))}
            </div>
            
            {/* Innlevering / KI-Knapp */}
            <div className="bg-slate-50 p-8 border-t border-slate-200">
              <button
                onClick={handleCopyForAI}
                className="w-full flex items-center justify-center space-x-3 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.01] shadow-md"
              >
                <Copy className="w-6 h-6" />
                <span>Kopier arbeidet mitt for KI-tilbakemelding!</span>
              </button>
              
              {error && (
                <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bekreftelse på kopiering */}
        {isCopied && (
          <div className="bg-emerald-900 text-emerald-50 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 mt-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CheckCircle className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6 border-b border-emerald-800 pb-6">
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Kopiert!</h2>
                  <p className="text-emerald-300 font-medium text-lg mt-1">Arbeidet ditt er nå klart for læreren (KI).</p>
                </div>
              </div>
              
              <div className="bg-emerald-800/50 rounded-xl p-6 border border-emerald-700">
                <h3 className="font-bold text-xl mb-3 text-white flex items-center"><Sparkles className="w-5 h-5 mr-2 text-emerald-400"/> Hva gjør du nå?</h3>
                <ol className="list-decimal list-inside space-y-3 text-emerald-100 text-lg">
                  <li>Åpne KI-tjenesten skolen din bruker (f.eks. SkoleGPT, ChatGPT eller lignende).</li>
                  <li>Klikk i skrivefeltet og velg <strong>Lim inn</strong> (eller trykk Ctrl+V / Cmd+V).</li>
                  <li>Send meldingen og se hva slags tilbakemelding du får på innsatsen din!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
