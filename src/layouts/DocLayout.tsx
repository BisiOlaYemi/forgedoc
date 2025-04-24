import React, { useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight, Search, ExternalLink } from 'lucide-react';
import { DocSection } from '../types';
import Header from '../components/Header';

interface DocLayoutProps {
  children: React.ReactNode;
  sections: DocSection[];
  activeSectionId: string;
  activeItemId: string;
  onSelectItem: (sectionId: string, itemId: string) => void;
  rightSidebar?: ReactNode;
}

const DocLayout: React.FC<DocLayoutProps> = ({
  children,
  sections,
  activeSectionId,
  activeItemId,
  onSelectItem,
  rightSidebar,
}) => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  
  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
    
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: section.id === activeSectionId }), {})
  );

  
  useEffect(() => {
    if (activeSectionId) {
      setExpandedSections(prev => ({
        ...prev,
        [activeSectionId]: true,
      }));
    }
  }, [activeSectionId]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar  */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors shadow-sm"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Left sidebar - Navigation */}
        <motion.aside
          className={`fixed lg:static inset-y-0 left-0 top-16 pt-4 z-40 w-72 bg-gray-900 border-r border-gray-700 flex-shrink-0 overflow-y-auto transition-transform transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
          initial={false}
          animate={{ 
            width: sidebarOpen ? 288 : 0,
            boxShadow: sidebarOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none'
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold text-gray-100">Documentation</h1>
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-1 rounded-md hover:bg-gray-800"
              >
                <X size={20} className="text-gray-300" />
              </button>
            </div>

            {/* Search box */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 sm:text-sm transition-colors" 
                placeholder="Search documentation..." 
              />
            </div>

            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div
                    className="flex items-center justify-between py-2 px-3 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="font-medium text-gray-200">{section.title}</span>
                    <motion.div
                      initial={false}
                      animate={{ rotate: expandedSections[section.id] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={18} className="text-gray-400" />
                    </motion.div>
                  </div>
                  
                  {expandedSections[section.id] && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 mt-1 space-y-1"
                    >
                      {section.items.map((item) => (
                        <motion.li 
                          key={item.id}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            className={`block w-full text-left px-3 py-2 rounded-md transition-all ${
                              activeSectionId === section.id && activeItemId === item.id
                                ? 'bg-blue-900/30 text-blue-400 font-medium shadow-sm'
                                : 'hover:bg-gray-800 text-gray-300'
                            }`}
                            onClick={() => onSelectItem(section.id, item.id)}
                          >
                            {item.title}
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ))}
            </nav>

            
            <div className="border-t border-gray-700 mt-8 pt-4">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <a href="https://github.com/goforgl/forge/" className="flex items-center hover:text-blue-400">
                  <ExternalLink size={14} className="mr-1" />
                  GitHub
                </a>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </motion.aside>

        
        <div className="flex flex-1 overflow-hidden">
          
          <motion.div 
            className="flex-1 h-full overflow-y-auto p-8 bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>

          
          <motion.div 
            className="hidden xl:block w-80 bg-gray-900 border-l border-gray-700 overflow-y-auto p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-lg font-medium mb-4 text-gray-200">On This Page</h3>
            <div className="flow-section">
              {rightSidebar}
            </div>
          </motion.div>
        </div>

        
        {sidebarOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 bg-black z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default DocLayout;