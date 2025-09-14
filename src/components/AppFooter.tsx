import { Github, Heart, ExternalLink, Linkedin, Instagram } from 'lucide-react';
import { Logo } from './Logo';

export function AppFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo size={32} />
              <h3 className="text-lg font-semibold text-gray-900">MyStaticSite</h3>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Build beautiful static websites with our intuitive drag-and-drop builder. 
              Generate clean HTML, CSS, and JavaScript code instantly.
            </p>
          </div>

          {/* Developer Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Developer</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Developed by <span className="font-semibold text-gray-900">Aryaneel Shivam</span>
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/aryaneelshivam/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.instagram.com/aryaneelshivam/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://github.com/aryaneelshivam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by Aryaneel Shivam</span>
            </div>
            
            <div className="text-sm text-gray-600">
              © 2024 MyStaticSite. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
