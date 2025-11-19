import React from 'react';
import { BasicExample, ImageUploader, DocumentUploader } from '../components/ui/file-input-demos';
import { FileText, Sparkles } from 'lucide-react';

const FileInputDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              File Input Components
            </span>
          </h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
            Beautiful, accessible file upload components with validation and error handling
          </p>
        </div>

        {/* Features Banner */}
        <div className="glass-enhanced rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Features</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">✅ File Validation</h3>
              <p className="text-sm text-white/70">Size and type validation with clear error messages</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">🎨 Beautiful UI</h3>
              <p className="text-sm text-white/70">Modern design with smooth animations</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">♿ Accessible</h3>
              <p className="text-sm text-white/70">Keyboard navigation and screen reader support</p>
            </div>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Basic Example */}
          <div className="glass-enhanced rounded-2xl p-6 hover-glow">
            <BasicExample />
          </div>

          {/* Image Uploader */}
          <div className="glass-enhanced rounded-2xl p-6 hover-glow">
            <ImageUploader />
          </div>

          {/* Document Uploader */}
          <div className="glass-enhanced rounded-2xl p-6 hover-glow">
            <DocumentUploader />
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 glass-enhanced rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Usage Example</h2>
          <div className="bg-slate-950 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-green-400">
              <code>{`import { useFileInput } from "../hooks/use-file-input";
import { Button } from "../components/ui/button";

function MyComponent() {
  const { 
    fileName, 
    error, 
    fileInputRef, 
    handleFileSelect, 
    clearFile 
  } = useFileInput({
    accept: "image/*",
    maxSize: 5 // MB
  });

  return (
    <div>
      <Button onClick={() => fileInputRef.current?.click()}>
        Select File
      </Button>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      {fileName && <p>Selected: {fileName}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* API Reference */}
        <div className="mt-8 glass-enhanced rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">API Reference</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">useFileInput Options</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><code className="text-purple-400">accept</code> - File types to accept (e.g., "image/*", ".pdf")</li>
                <li><code className="text-purple-400">maxSize</code> - Maximum file size in MB</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Returned Values</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><code className="text-purple-400">fileName</code> - Name of selected file</li>
                <li><code className="text-purple-400">error</code> - Validation error message</li>
                <li><code className="text-purple-400">fileSize</code> - Size of file in bytes</li>
                <li><code className="text-purple-400">fileInputRef</code> - Ref for the input element</li>
                <li><code className="text-purple-400">handleFileSelect</code> - File selection handler</li>
                <li><code className="text-purple-400">clearFile</code> - Function to clear selection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInputDemo;
