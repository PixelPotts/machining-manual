import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

interface Chapter {
  id: string;
  title: string;
  filename: string;
  content: string;
}

const chapters: Omit<Chapter, 'content'>[] = [
  { id: '01', title: 'Aerospace Workshop Safety & Regulatory Compliance', filename: 'chapter-01-aerospace-workshop-safety.md' },
  { id: '03', title: 'Precision Measurement Tools and Calibration', filename: 'chapter-03-precision-measurement-calibration.md' },
  { id: '04', title: 'Advanced Metrology and CMM Operations', filename: 'chapter-04-advanced-metrology-cmm.md' },
  { id: '05', title: 'GD&T Interpretation for Aerospace Applications', filename: 'chapter-05-gdt-interpretation.md' },
  { id: '06', title: 'Aluminum Alloys (2024, 6061, 7075) - Properties and Machining', filename: 'chapter-06-aluminum-alloys.md' },
  { id: '07', title: 'Titanium Alloys - Properties and Machining Strategies', filename: 'chapter-07-titanium-alloys.md' },
  { id: '08', title: 'Stainless Steel Alloys - 300 and 400 Series Machining', filename: 'chapter-08-stainless-steel-alloys.md' },
  { id: '09', title: 'Inconel and Superalloy Machining', filename: 'chapter-09-inconel-superalloys.md' },
  { id: '10', title: 'Carbon Steel and Tool Steel Machining', filename: 'chapter-10-carbon-tool-steels.md' },
  { id: '11', title: 'Composite Materials and Advanced Aerospace Alloys', filename: 'chapter-11-composites-advanced-alloys.md' },
  { id: '12', title: 'CNC Programming Fundamentals', filename: 'chapter-12-cnc-programming-fundamentals.md' },
  { id: '13', title: 'Advanced Workholding and Fixture Design', filename: 'chapter-13-advanced-workholding-fixture-design.md' },
  { id: '14', title: 'High-Speed Machining Techniques', filename: 'chapter-14-high-speed-machining-techniques.md' },
  { id: '15', title: 'CAM Programming and Tool Path Optimization', filename: 'chapter-15-cam-programming-tool-path-optimization.md' },
  { id: '16', title: 'Surface Finish and Quality Control', filename: 'chapter-16-surface-finish-quality-control.md' },
  { id: '17', title: 'Advanced Materials and Cutting Strategies', filename: 'chapter-17.md' },
  { id: '18', title: 'Toolpath Optimization and Adaptive Machining', filename: 'chapter-18.md' },
  { id: '19', title: 'Quality Assurance and Statistical Process Control', filename: 'chapter-19.md' },
  { id: '20', title: 'Lean Manufacturing and Workflow Optimization', filename: 'chapter-20.md' },
  { id: '21', title: 'Advanced Inspection Techniques and CMM Programming', filename: 'chapter-21.md' },
  { id: '22', title: 'Cost Analysis and Production Economics', filename: 'chapter-22.md' }
];

function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapterContent, setChapterContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadChapter = async (chapter: Omit<Chapter, 'content'>) => {
    setLoading(true);
    try {
      const response = await fetch(`/chapters/${chapter.filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load chapter: ${response.statusText}`);
      }
      const content = await response.text();
      setChapterContent(content);
      setSelectedChapter({ ...chapter, content });
      setMenuOpen(false);
    } catch (error) {
      console.error('Error loading chapter:', error);
      setChapterContent('Error loading chapter content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load first chapter by default
    if (chapters.length > 0) {
      loadChapter(chapters[0]);
    }
  }, []);

  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return !isInline ? (
              <SyntaxHighlighter
                style={tomorrow as any}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <header className="header">
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <h1>Aerospace Machining Manual</h1>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑ Top
        </button>
      </header>

      <div className="container">
        <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Chapters</h2>
            <button 
              className="close-menu"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <ul className="chapter-list">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  className={`chapter-link ${selectedChapter?.id === chapter.id ? 'active' : ''}`}
                  onClick={() => loadChapter(chapter)}
                >
                  <span className="chapter-number">Ch. {chapter.id}</span>
                  <span className="chapter-title">{chapter.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="sidebar-footer">
            <p className="note">
              <strong>Note:</strong> This manual contains detailed procedures for aerospace machining. 
              Always follow company safety protocols and customer requirements.
            </p>
          </div>
        </nav>

        <main className="content">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading chapter...</p>
            </div>
          ) : selectedChapter ? (
            <div className="chapter-content">
              <div className="chapter-header">
                <div className="breadcrumb">
                  Chapter {selectedChapter.id}
                </div>
                <h1>{selectedChapter.title}</h1>
              </div>
              <div className="markdown-content">
                {renderMarkdown(chapterContent)}
              </div>
            </div>
          ) : (
            <div className="welcome">
              <h1>Welcome to the Aerospace Machining Manual</h1>
              <p>Select a chapter from the menu to begin reading.</p>
            </div>
          )}
        </main>
      </div>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </div>
  );
}

export default App;
