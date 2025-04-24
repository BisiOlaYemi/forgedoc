import { useState, useEffect } from 'react';

export interface ScrollSpyItem {
  id: string;
  text: string;
  level: number;
}


export function useScrollSpy(items: ScrollSpyItem[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string | undefined>(
    items.length > 0 ? items[0].id : undefined
  );

  useEffect(() => {
    if (!items.length) return;

    const handleScroll = () => {
      
      const headingElements = items
        .map(item => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((item): item is { id: string; element: HTMLElement } => item.element !== null);

      if (!headingElements.length) return;


      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i];
        const rect = element.getBoundingClientRect();

        if (rect.top <= offset) {
          setActiveId(id);
          return;
        }
      }

      
      setActiveId(headingElements[0].id);
    };

    
    handleScroll();

    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, offset]);

  return activeId;
}

export default useScrollSpy;