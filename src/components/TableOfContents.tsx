import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeId?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, activeId }) => {
  useEffect(() => {
    console.log('Table of Contents headings updated:', headings.length);
  }, [headings]);

  if (!headings || headings.length === 0) {
    return (
      <div className="text-sm text-gray-400 italic">
        No headings available in this document
      </div>
    );
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={headings.length > 0 ? headings[0].id : 'empty'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        {headings.map((heading) => (
          <motion.div 
            key={heading.id} 
            className="cursor-pointer"
            style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className={`py-1.5 pl-2 text-sm border-l-2 transition-all ${
                activeId === heading.id 
                  ? 'text-blue-400 border-blue-500 font-medium' 
                  : 'text-gray-400 hover:text-blue-400 border-transparent hover:border-blue-700'
              }`}
              onClick={() => handleClick(heading.id)}
            >
              {heading.text}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TableOfContents;