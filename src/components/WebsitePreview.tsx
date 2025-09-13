import { WebsiteConfig } from '@/types/website';

interface WebsitePreviewProps {
  config: WebsiteConfig;
}

export function WebsitePreview({ config }: WebsitePreviewProps) {
  const getAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
    switch (alignment) {
      case 'left': return 'text-left justify-start';
      case 'center': return 'text-center justify-center';
      case 'right': return 'text-right justify-end';
    }
  };

  const getFontFamily = (font: string) => {
    return { fontFamily: font };
  };

  const getHeroHeight = (height: 'small' | 'medium' | 'large' | 'full') => {
    switch (height) {
      case 'small': return '300px';
      case 'medium': return '500px';
      case 'large': return '700px';
      case 'full': return '100vh';
    }
  };

  return (
    <div className="h-full overflow-y-auto preview-bg">
      <div className="bg-white min-h-full">
        {/* Announcement Bar */}
        {config.announcement.enabled && (
          <div className="bg-gradient-primary text-white py-2 px-4 text-center text-sm">
            {config.announcement.text}
          </div>
        )}

        {/* Navbar */}
        {config.navbar.enabled && (
          <nav className="bg-white shadow-sm border-b px-6 py-4">
            <div className={`flex items-center ${getAlignmentClass(config.navbar.alignment)}`}>
              {/* Logo */}
              <div className="mr-8">
                {config.navbar.logo.type === 'text' ? (
                  <span className="text-xl font-bold" style={getFontFamily(config.navbar.font)}>
                    {config.navbar.logo.content}
                  </span>
                ) : (
                  <img 
                    src={config.navbar.logo.content} 
                    alt="Logo" 
                    className="h-8 w-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              
              {/* Navigation Links */}
              <div className="flex space-x-6">
                {config.navbar.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-gray-700 hover:text-primary transition-colors"
                    style={getFontFamily(config.navbar.font)}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}

        {/* Hero Section */}
        <section 
          className="px-6 relative flex items-center"
          style={{
            backgroundImage: config.hero.backgroundImage ? `url(${config.hero.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: getHeroHeight(config.hero.height),
            minHeight: getHeroHeight(config.hero.height)
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className={`relative max-w-4xl mx-auto ${getAlignmentClass(config.hero.alignment)}`}>
            <h1 
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              style={getFontFamily(config.hero.font)}
            >
              {config.hero.heading}
            </h1>
          </div>
        </section>

        {/* Scrolling Text Bar */}
        <div className="bg-gray-900 text-white py-4 overflow-hidden">
          <div className="animate-scroll whitespace-nowrap text-lg font-medium">
            {config.scrollingText.text}
          </div>
        </div>

        {/* Cards Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.cards.cards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg shadow-md p-6 transition-smooth hover:shadow-lg">
                  {card.image && (
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Text Area Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <p className="text-lg leading-relaxed text-gray-700">
                {config.textArea.content}
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-6">
          <div className={`max-w-6xl mx-auto ${getAlignmentClass(config.footer.alignment)}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <p>{config.footer.text}</p>
              <div className="flex space-x-6">
                {config.footer.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}