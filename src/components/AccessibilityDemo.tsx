import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Type, Eye, Contrast, Plus, Minus } from "lucide-react"
import { Button } from "./ui/button"

export function AccessibilityDemo() {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(fontSize + 2)
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2)
  }

  const toggleContrast = () => {
    setHighContrast(!highContrast)
  }

  const toggleWidget = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="bg-[#0d1117] rounded-xl p-6 border border-gray-700 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Users className="w-5 h-5 text-blue-400 mr-2" />
        See Accessibility Widget in Action
      </h3>
      
      <div className="bg-gray-800 rounded-lg p-6 relative">
        {/* Sample Website Content */}
        <div 
          className={`transition-all duration-300 ${
            highContrast 
              ? 'bg-black text-yellow-300 border-yellow-300' 
              : 'bg-white text-gray-800'
          } rounded-lg p-4 mb-4 border`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <h4 className={`font-bold mb-2 ${highContrast ? 'text-yellow-300' : 'text-gray-900'}`}>
            Sample Website Content
          </h4>
          <p className={`mb-3 ${highContrast ? 'text-yellow-300' : 'text-gray-700'}`}>
            This demonstrates how our accessibility widget works. Users can adjust font size and toggle high contrast mode for better readability.
          </p>
          <button 
            className={`px-4 py-2 rounded transition-all ${
              highContrast 
                ? 'bg-yellow-300 text-black border-2 border-yellow-300 hover:bg-yellow-400' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            style={{ fontSize: `${fontSize - 2}px` }}
          >
            Sample Button
          </button>
        </div>

        {/* Accessibility Widget */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ 
            x: isActive ? 0 : 250, 
            opacity: isActive ? 1 : 0.8 
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 bg-blue-600 rounded-lg shadow-2xl"
        >
          {/* Widget Toggle Button */}
          <button
            onClick={toggleWidget}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
            aria-label="Accessibility Options"
          >
            <Users className="w-5 h-5" />
          </button>

          {/* Widget Panel */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl p-4 w-64 border"
            >
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Accessibility Options
              </h5>
              
              {/* Font Size Controls */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4 inline mr-1" />
                  Font Size
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={decreaseFontSize}
                    size="sm"
                    variant="outline"
                    className="p-1 h-8 w-8"
                    disabled={fontSize <= 12}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                    {fontSize}px
                  </span>
                  <Button
                    onClick={increaseFontSize}
                    size="sm"
                    variant="outline"
                    className="p-1 h-8 w-8"
                    disabled={fontSize >= 24}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Contrast className="w-4 h-4 inline mr-1" />
                  High Contrast
                </label>
                <button
                  onClick={toggleContrast}
                  className={`w-full p-2 rounded transition-all text-sm font-medium ${
                    highContrast
                      ? 'bg-yellow-400 text-black border-2 border-yellow-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {highContrast ? 'Disable' : 'Enable'} High Contrast
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setFontSize(16)
                  setHighContrast(false)
                }}
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all text-sm font-medium"
              >
                Reset to Default
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Try It Instructions */}
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm">
            <Eye className="w-4 h-4 inline mr-1" />
            <strong>Try it:</strong> Click the accessibility icon above to test font size adjustments and high contrast mode!
          </p>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-3">
        Our accessibility widget instantly improves your site's compliance with ADA/WCAG guidelines. 
        Users can adjust font size, toggle high contrast mode, and use keyboard navigation. 
        <strong className="text-white">Installation takes 30 seconds</strong> - just copy-paste the widget code.
      </p>
    </div>
  )
}