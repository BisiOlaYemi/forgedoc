import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DocumentationPage from './pages/DocumentationPage'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          
          <Route path="/" element={<Navigate to="/docs/getting-started/introduction" replace />} />
          
          <Route path="/docs" element={<Navigate to="/docs/getting-started/introduction" replace />} />
          <Route path="/docs/:sectionId" element={<DocumentationPage />} />
          <Route path="/docs/:sectionId/:itemId" element={<DocumentationPage />} />
          
          
          <Route path="*" element={
            <div className="flex h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                <p className="mb-6">The page you're looking for doesn't exist.</p>
                <a 
                  href="/docs/getting-started/introduction" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Go to Documentation
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
