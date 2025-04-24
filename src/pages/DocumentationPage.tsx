import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { docsData } from '../data/docs';
import DocLayout from '../layouts/DocLayout';
import MarkdownContent from '../components/MarkdownContent';
import TableOfContents from '../components/TableOfContents';
import useScrollSpy from '../hooks/useScrollSpy';
import { ScrollSpyItem } from '../hooks/useScrollSpy';

interface DocParams {
  [key: string]: string | undefined;
  sectionId?: string;
  itemId?: string;
}

const DocumentationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, itemId } = useParams<DocParams>();
  
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [activeItemId, setActiveItemId] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [headings, setHeadings] = useState<Array<ScrollSpyItem>>([]);
  
  
  const activeHeadingId = useScrollSpy(headings);

  
  const loadContent = useCallback((currentSectionId: string | undefined, currentItemId: string | undefined) => {
    console.log('Loading content for:', { currentSectionId, currentItemId });
    
    if (!currentSectionId || !currentItemId) {
      return;
    }

    setActiveSectionId(currentSectionId);
    
    
    const section = docsData.find(section => section.id === currentSectionId);
    if (section) {
      
      const item = section.items.find(item => item.slug === currentItemId) || 
                   section.items.find(item => item.id === currentItemId);
      
      if (item) {
        setActiveItemId(item.id); 
        
        if (item.content) {
          console.log('Setting content for item:', item.title);
          setContent(item.content);
          
          setHeadings([]);
          
          window.scrollTo(0, 0);
        } else {
          setContent('# Content not found');
          console.error('Item content not found for:', { currentSectionId, currentItemId });
        }
      } else {
        setContent('# Item not found');
        console.error('Item not found in section:', { currentSectionId, currentItemId });
      }
    } else {
      setContent('# Section not found');
      console.error('Section not found:', currentSectionId);
    }
  }, []);

  
  useEffect(() => {
    console.log('Route params or location changed:', { sectionId, itemId, pathname: location.pathname });
    
    
    if (!sectionId || !itemId) {
      if (docsData.length > 0 && docsData[0].items.length > 0) {
        navigate(`/docs/${docsData[0].id}/${docsData[0].items[0].slug}`);
      }
      return;
    }

    loadContent(sectionId, itemId);
  }, [sectionId, itemId, navigate, location.pathname, loadContent]);

  const handleSelectItem = (sectionId: string, itemId: string) => {
    console.log('Item selected:', { sectionId, itemId });
    
    
    const section = docsData.find(section => section.id === sectionId);
    if (section) {
      const item = section.items.find(item => item.id === itemId);
      if (item) {
        
        const urlPath = item.slug || item.id;
        console.log('Navigating to:', `/docs/${sectionId}/${urlPath}`);
        
        
        navigate(`/docs/${sectionId}/${urlPath}`);
        
        
        loadContent(sectionId, urlPath);
      }
    }
  };

  const handleHeadingsExtracted = (extractedHeadings: Array<{ id: string; text: string; level: number }>) => {
    setHeadings(extractedHeadings);
  };

  return (
    <DocLayout 
      sections={docsData}
      activeSectionId={activeSectionId}
      activeItemId={activeItemId}
      onSelectItem={handleSelectItem}
      rightSidebar={<TableOfContents headings={headings} activeId={activeHeadingId} />}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow max-w-3xl mx-auto">
          <MarkdownContent content={content} onHeadingsExtracted={handleHeadingsExtracted} />
        </div>
      </div>
    </DocLayout>
  );
};

export default DocumentationPage;