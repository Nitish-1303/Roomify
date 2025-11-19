import React from "react";
import { useFileInput } from "../hooks/use-file-input";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";

export function BasicExample() {
  const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
    useFileInput({
      maxSize: 2,
    });

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Basic File Upload
      </h3>
      <div className="flex gap-4 items-center">
        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          Select File
        </Button>
        {fileName && (
          <Button onClick={clearFile} variant="ghost" size="sm">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      {fileName && (
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          Selected: <span className="font-medium">{fileName}</span>
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          Error: {error}
        </p>
      )}
    </div>
  );
}

export function ImageUploader() {
  const { fileName, error, fileInputRef, handleFileSelect, fileSize, clearFile } =
    useFileInput({
      accept: "image/*",
      maxSize: 5,
    });

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <ImageIcon className="w-5 h-5" />
        Image Upload
      </h3>
      <div className="flex gap-4 items-center">
        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          <ImageIcon className="w-4 h-4 mr-2" />
          Select Image
        </Button>
        {fileName && (
          <Button onClick={clearFile} variant="ghost" size="sm">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      {fileName && (
        <div className="space-y-1 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Selected:</span> {fileName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Size:</span>{" "}
            {(fileSize / (1024 * 1024)).toFixed(2)}MB
          </p>
        </div>
      )}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          Error: {error}
        </p>
      )}
    </div>
  );
}

export function DocumentUploader() {
  const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
    useFileInput({
      accept: ".pdf,.doc,.docx",
      maxSize: 10,
    });

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Document Upload
      </h3>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          "hover:border-blue-500 transition-colors cursor-pointer",
          error && "border-red-500"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        {fileName ? (
          <div className="space-y-2">
            <FileText className="w-12 h-12 text-blue-600 mx-auto" />
            <p className="text-sm font-medium text-gray-900">{fileName}</p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              variant="ghost"
              size="sm"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
              <br />
              PDF, DOC up to 10MB
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          Error: {error}
        </p>
      )}
    </div>
  );
}

export default function FileUploadExamples() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            File Upload Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Different file upload patterns with validation and error handling
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <BasicExample />
          <ImageUploader />
          <DocumentUploader />
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  File Size Validation
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically validates file size against maximum limit
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  File Type Validation
                </h3>
                <p className="text-sm text-gray-600">
                  Restricts uploads to specific file types
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Error Handling
                </h3>
                <p className="text-sm text-gray-600">
                  Clear error messages for validation failures
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Reset</h3>
                <p className="text-sm text-gray-600">
                  Clear selected files with one click
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
