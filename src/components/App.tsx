import { useState, useCallback, useEffect } from 'preact/hooks';
import { generateNote, GenerateNoteParams } from '../api/generateNote';

export const App = () => {
  const [shorthand, setShorthand] = useState(
    '65M, hx CHF, CKD stg 3, DM2. c/o DOE & B/L LE edema. Meds: Lasix, Coreg, Lantus. Labs: Cr 2.3, BNP 1220. Echo: EF 35%. Plan: ^Lasix, start Entresto, fluid restriction, cardio f/u.'
  );
  const [generatedNote, setGeneratedNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [mode, setMode] = useState<GenerateNoteParams['mode']>('summarize');
  const [outputTitle, setOutputTitle] = useState('Summarized Patient Note');

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleGenerate = async () => {
    if (!shorthand.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setGeneratedNote('');
    setCopyButtonText('Copy');
    setOutputTitle(
      mode === 'expand' ? 'Expanded Patient Note' : 'Summarized Patient Note'
    );

    try {
      await generateNote({ shorthand, mode }, (chunk) => {
        setGeneratedNote(chunk);
      });
    } catch (e) {
      console.error(e);
      setError(
        'Failed to generate the note. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback(() => {
    if (!generatedNote || copyButtonText === 'Copied!') return;
    navigator.clipboard.writeText(generatedNote);
    setCopyButtonText('Copied!');
    setTimeout(() => setCopyButtonText('Copy'), 2000);
  }, [generatedNote, copyButtonText]);

  return (
    <div class="app-wrapper">
      <div className="app-container">
        <header>
          <div className="header-title">
            <h1>
              <span>🩺</span>MedScribe AI
            </h1>
            <p>Your AI-powered medical transcription assistant</p>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${
              theme === 'light' ? 'dark' : 'light'
            } mode`}
          >
            {theme === 'light' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>

                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </header>
        <main>
          <div className="input-section">
            <label htmlFor="shorthand-input">Clinical Shorthand</label>
            <textarea
              id="shorthand-input"
              value={shorthand}
              onInput={(e) =>
                setShorthand((e.target as HTMLTextAreaElement).value)
              }
              placeholder="e.g., 55F with DM2, HTN. c/o HA x 2 days..."
              disabled={isLoading}
              rows={10}
            />
            <div className="toggle-group-container">
              <label id="mode-label">Mode</label>
              <div
                className="toggle-group"
                role="group"
                aria-labelledby="mode-label"
              >
                <button
                  className={mode === 'expand' ? 'active' : ''}
                  onClick={() => setMode('expand')}
                  disabled={isLoading}
                  aria-pressed={mode === 'expand'}
                >
                  Expand
                </button>
                <button
                  className={mode === 'summarize' ? 'active' : ''}
                  onClick={() => setMode('summarize')}
                  disabled={isLoading}
                  aria-pressed={mode === 'summarize'}
                >
                  Summarize
                </button>
              </div>
            </div>
            <div className="action-bar">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !shorthand.trim()}
              >
                {isLoading && <div className="spinner-small" />}
                {mode === 'expand' ? 'Expand Note' : 'Summarize Note'}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="output-section">
            <div className="output-header">
              <h2>{outputTitle}</h2>
              {generatedNote && !isLoading && (
                <button
                  className="copy-button"
                  onClick={handleCopy}
                  disabled={copyButtonText === 'Copied!'}
                >
                  {copyButtonText}
                </button>
              )}
            </div>
            <div className="output-container" aria-live="polite">
              {isLoading && !generatedNote && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                </div>
              )}
              <div
                id="output-content"
                className={!generatedNote && !isLoading ? 'placeholder' : ''}
              >
                {generatedNote
                  ? generatedNote
                  : !isLoading && 'Generated note will appear here...'}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
