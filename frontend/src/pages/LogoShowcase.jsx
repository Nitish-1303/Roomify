import React from 'react';
import RoomifyLogo from '../components/RoomifyLogo';
import { 
  RoomifyLogoMinimal, 
  RoomifyLogoBadge, 
  RoomifyLogoHorizontal,
  RoomifyLogoAnimated,
  RoomifyFavicon 
} from '../components/RoomifyLogoVariants';
import { Download } from 'lucide-react';

const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Roomify Logo Showcase
            </span>
          </h1>
          <p className="text-xl text-white text-opacity-80">
            Multiple variations for different use cases
          </p>
        </div>

        {/* Main Logo */}
        <div className="glass-enhanced rounded-2xl p-12 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Main Logo</h2>
          <div className="flex flex-col items-center gap-8">
            <div className="bg-white rounded-xl p-8">
              <RoomifyLogo size={60} showText={true} animated={true} />
            </div>
            <div className="bg-gray-900 rounded-xl p-8">
              <RoomifyLogo size={60} showText={true} />
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8">
              <RoomifyLogo size={60} showText={true} />
            </div>
          </div>
        </div>

        {/* Logo Variations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Icon Only */}
          <div className="glass-enhanced rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Icon Only</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <RoomifyLogo size={80} showText={false} />
              </div>
              <p className="text-sm text-white text-opacity-70">
                Perfect for app icons and small spaces
              </p>
            </div>
          </div>

          {/* Minimal Logo */}
          <div className="glass-enhanced rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Minimal</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <RoomifyLogoMinimal size={80} />
              </div>
              <p className="text-sm text-white text-opacity-70">
                Simple R letter with room concept
              </p>
            </div>
          </div>

          {/* Badge Logo */}
          <div className="glass-enhanced rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Badge</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <RoomifyLogoBadge size={100} />
              </div>
              <p className="text-sm text-white text-opacity-70">
                Circular badge for certificates
              </p>
            </div>
          </div>

          {/* Animated Logo */}
          <div className="glass-enhanced rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Animated</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <RoomifyLogoAnimated size={100} />
              </div>
              <p className="text-sm text-white text-opacity-70">
                Animated version for loading screens
              </p>
            </div>
          </div>

          {/* Favicon */}
          <div className="glass-enhanced rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Favicon</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <RoomifyFavicon size={64} />
              </div>
              <p className="text-sm text-white text-opacity-70">
                Browser tab icon (32x32)
              </p>
            </div>
          </div>

          {/* Horizontal Logo */}
          <div className="glass-enhanced rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Horizontal</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <RoomifyLogoHorizontal height={60} />
              </div>
              <p className="text-sm text-white text-opacity-70">
                Wide format for headers
              </p>
            </div>
          </div>
        </div>

        {/* Size Variations */}
        <div className="glass-enhanced rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Size Variations</h2>
          <div className="bg-white rounded-xl p-8 flex items-center justify-center gap-8 flex-wrap">
            <RoomifyLogo size={24} showText={false} />
            <RoomifyLogo size={32} showText={false} />
            <RoomifyLogo size={48} showText={false} />
            <RoomifyLogo size={64} showText={false} />
            <RoomifyLogo size={96} showText={false} />
            <RoomifyLogo size={128} showText={false} />
          </div>
        </div>

        {/* Usage Examples */}
        <div className="glass-enhanced rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Usage Examples</h2>
          <div className="space-y-4">
            {/* Navbar Example */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <RoomifyLogo size={40} showText={true} />
              <div className="flex gap-4 text-gray-700">
                <span>Home</span>
                <span>Rooms</span>
                <span>Bookings</span>
              </div>
            </div>

            {/* Login Card Example */}
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
              <div className="flex justify-center mb-4">
                <RoomifyLogo size={60} showText={true} animated={true} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Sign in to continue to Roomify</p>
            </div>

            {/* Footer Example */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <RoomifyLogo size={36} showText={true} />
                <p className="text-gray-400 text-sm">© 2024 Roomify. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="glass-enhanced rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-lg p-6">
              <p className="text-purple-400 text-sm mb-2">// Main Logo with Text</p>
              <pre className="text-green-400 text-sm">
                <code>{`import RoomifyLogo from './components/RoomifyLogo';

<RoomifyLogo 
  size={60} 
  showText={true} 
  animated={true} 
/>`}</code>
              </pre>
            </div>

            <div className="bg-slate-950 rounded-lg p-6">
              <p className="text-purple-400 text-sm mb-2">// Icon Only</p>
              <pre className="text-green-400 text-sm">
                <code>{`<RoomifyLogo 
  size={40} 
  showText={false} 
/>`}</code>
              </pre>
            </div>

            <div className="bg-slate-950 rounded-lg p-6">
              <p className="text-purple-400 text-sm mb-2">// Badge Logo</p>
              <pre className="text-green-400 text-sm">
                <code>{`import { RoomifyLogoBadge } from './components/RoomifyLogoVariants';

<RoomifyLogoBadge size={100} />`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="glass-enhanced rounded-2xl p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Export Logo</h2>
          <p className="text-white text-opacity-70 mb-6">
            All logos are SVG-based and can be exported at any size without quality loss
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center gap-2 mx-auto">
            <Download className="w-5 h-5" />
            Download Logo Pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
