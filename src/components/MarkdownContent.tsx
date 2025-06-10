import React, { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import go from 'react-syntax-highlighter/dist/esm/languages/hljs/go';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import { Copy, Check } from 'lucide-react';


SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('yaml', yaml);

interface MarkdownContentProps {
  content: string;
  onHeadingsExtracted?: (headings: { id: string; text: string; level: number }[]) => void;
}


const CopyableCodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 group">
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={handleCopy} 
          className="p-2 rounded bg-gray-950 border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-300" />}
        </button>
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={docco}
        customStyle={{
          backgroundColor: '#1F2937', 
          borderRadius: '0.375rem',
          padding: '1rem',
          paddingRight: '3rem'
        }}
        codeTagProps={{
          style: {
            color: '#E5E7EB'
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, onHeadingsExtracted }) => {
  const [processedContent, setProcessedContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!content) {
      setProcessedContent([]);
      return;
    }

    const headings: { id: string; text: string; level: number }[] = [];
    const lines = content.split('\n');
    const result: React.ReactNode[] = [];

    let codeBlock: { language: string; content: string[] } | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      
      if (line.trim().startsWith('```')) {
        if (codeBlock) {
          
          const code = codeBlock.content.join('\n');
          const language = codeBlock.language.toLowerCase();
          
          
          if (language === 'bash' || language === 'shell' || language === '') {
            result.push(
              <CopyableCodeBlock 
                key={`code-${i}`} 
                language={language || 'bash'} 
                code={code} 
              />
            );
          } else {
            result.push(
              <CopyableCodeBlock 
                key={`code-${i}`} 
                language={language} 
                code={code}
              />
            );
          }
          codeBlock = null;
        } else {
          
          const language = line.trim().replace('```', '');
          codeBlock = { language, content: [] };
        }
        continue;
      }

      if (codeBlock) {
        codeBlock.content.push(line);
        continue;
      }

      
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s+/, '').trim();
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

        headings.push({ id, text, level });

        
        result.push(
          React.createElement(
            `h${level}`,
            { 
              key: `heading-${i}`,
              id: id,
              className: `mt-6 mb-4 font-bold text-gray-100 ${level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl'}`
            },
            text
          )
        );
      }
      
      else if (line.trim().startsWith('- ')) {
        const listItemText = line.trim().substring(2);
        result.push(
          <ul key={`ul-${i}`} className="ml-6 my-2 list-disc text-gray-100">
            <li>{listItemText}</li>
          </ul>
        );
      }
      
      else if (line.trim()) {
        let paragraphContent = line.trim();
        
        
        paragraphContent = paragraphContent.replace(
          /\*\*(.*?)\*\*/g,
          '<strong>$1</strong>'
        );

        
        paragraphContent = paragraphContent.replace(
          /\*(.*?)\*/g,
          '<em>$1</em>'
        );

        
        paragraphContent = paragraphContent.replace(
          /`(.*?)`/g,
          '<code class="px-1 py-0.5 bg-gray-800 text-blue-300 rounded text-sm font-mono">$1</code>'
        );

        result.push(
          <p 
            key={`p-${i}`} 
            className="my-3 text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: paragraphContent }}
          />
        );
      } else {
        
        result.push(<div key={`empty-${i}`} className="h-4" />);
      }
    }

    setProcessedContent(result);
    
    
    if (onHeadingsExtracted) {
      onHeadingsExtracted(headings);
    }
  }, [content, onHeadingsExtracted]);

  return <div className="markdown-content">{processedContent}</div>;
};

export default MarkdownContent;