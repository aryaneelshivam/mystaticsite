# HTML Creator App 🚀

A powerful, no-code static website builder that lets you create stunning, responsive websites with drag-and-drop simplicity. Generate clean, production-ready HTML, CSS, and JavaScript code instantly.

## ✨ Features

### 🎨 **Visual Website Builder**
- **Drag & Drop Interface** - Intuitive section-based website building
- **Real-time Preview** - See your changes instantly in desktop and mobile views
- **Section Reordering** - Easily rearrange sections with drag-and-drop
- **Live Editing** - Edit content and see changes in real-time

### 📱 **Responsive Design**
- **Mobile-First Approach** - Perfect scaling across all devices
- **Viewport Switching** - Toggle between desktop and mobile previews
- **Responsive Components** - All sections adapt beautifully to different screen sizes

### 🧩 **Rich Section Library**
- **🍞 Announcement Bar** - Eye-catching promotional banners
- **🍔 Navigation Bar** - Customizable header with logo and links
- **🍕 Hero Section** - Stunning landing sections with CTAs
- **🌮 Scrolling Text** - Animated text marquees
- **🍜 Text Sections** - Rich content areas with images
- **🍰 Cards Section** - Showcase content in beautiful card layouts
- **🧠 Statistics** - Display metrics and numbers with animations
- **🌍 Google Maps** - Interactive location maps
- **🍩 Call-to-Action** - Compelling conversion sections
- **🍪 Footer** - Professional site footers with links

### 🎯 **Advanced Features**
- **Code Generation** - Export clean, production-ready HTML/CSS/JS
- **Tabbed Code View** - Separate HTML, CSS, and JavaScript files
- **Screenshot Capture** - Generate high-quality images of your website
- **SEO Optimization** - Built-in meta tags and social media optimization
- **User Authentication** - Secure login system with Supabase
- **Image Management** - Upload custom images or use placeholder images

### 🛠 **Developer Experience**
- **TypeScript** - Full type safety and better development experience
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- **Clean Code Output** - Semantic HTML with modern CSS and JavaScript
- **Performance Optimized** - Fast loading and smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd html-creator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your Supabase credentials in `.env.local`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── editors/         # Section-specific editors
│   ├── ui/              # Reusable UI components
│   ├── AuthButton.tsx   # Authentication component
│   ├── CodeGenerator.tsx # Code generation logic
│   ├── Maps.tsx         # Google Maps component
│   ├── Stats.tsx        # Statistics component
│   ├── UserAvatar.tsx   # User avatar popup
│   ├── WebsiteBuilder.tsx # Main builder interface
│   └── WebsitePreview.tsx # Live preview component
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🎨 How to Use

### 1. **Create Your Website**
- Start with the default template or build from scratch
- Use the section editor to customize each part of your website
- Drag and drop sections to reorder them

### 2. **Customize Sections**
- **Hero Section**: Add compelling headlines, descriptions, and call-to-action buttons
- **Text Sections**: Create rich content with images and formatted text
- **Cards**: Showcase products, services, or features
- **Statistics**: Display key metrics with animated counters
- **Maps**: Embed Google Maps for location information
- **Footer**: Add contact information and social links

### 3. **Preview & Test**
- Switch between desktop and mobile views
- Test responsiveness across different screen sizes
- Use the screenshot feature to capture your design

### 4. **Generate Code**
- Click the "Code" tab to view generated HTML, CSS, and JavaScript
- Copy individual files or download them
- Deploy to any web hosting service

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui for consistent, accessible components
- **Authentication**: Supabase Auth for user management
- **Database**: Supabase for data persistence
- **Icons**: Lucide React for beautiful icons
- **Code Generation**: Custom HTML/CSS/JS generation
- **Image Processing**: html2canvas for screenshot functionality

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup
1. Create a new Supabase project
2. Enable authentication
3. Set up Row Level Security (RLS) policies
4. Configure your environment variables

## 📱 Responsive Design

The app is built with a mobile-first approach:
- **Breakpoints**: Optimized for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Flexible Layouts**: All components adapt to different screen sizes
- **Touch-Friendly**: Optimized for touch interactions on mobile devices

## 🎯 Code Generation

The app generates clean, semantic code:
- **HTML5**: Modern, accessible markup
- **CSS3**: Responsive styles with modern features
- **JavaScript**: Interactive functionality with smooth animations
- **SEO Ready**: Proper meta tags and structured data
- **Performance**: Optimized for fast loading

## 🚀 Deployment

### Static Hosting
Deploy the generated files to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the generated files
- **GitHub Pages**: Push to a GitHub repository
- **AWS S3**: Upload files to an S3 bucket

### Custom Domain
- Configure your domain's DNS settings
- Point to your hosting provider
- Enable HTTPS for security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Authentication by [Supabase](https://supabase.com/)

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Happy Building! 🎉**