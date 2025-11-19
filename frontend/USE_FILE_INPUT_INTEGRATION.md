# useFileInput Hook - Integration Guide

## ✅ Successfully Integrated!

The useFileInput custom hook has been converted from TypeScript to JavaScript and integrated into your Roomify application with three example implementations.

## 📁 Files Created

### 1. Custom Hook
- **Location**: `frontend/src/hooks/use-file-input.js`
- **Type**: Reusable file input hook with validation
- **Purpose**: Simplify file upload handling across the app

### 2. Examples Page
- **Location**: `frontend/src/pages/FileUploadExamples.jsx`
- **Route**: `/file-upload-examples`
- **Purpose**: Showcase three different file upload patterns

## 🎨 Hook Features

### File Validation
- **Size Validation** - Check file size against maximum limit
- **Type Validation** - Restrict to specific file types
- **Error Messages** - Clear validation error feedback

### State Management
- **fileName** - Currently selected file name
- **fileSize** - File size in bytes
- **error** - Validation error message
- **fileInputRef** - Reference to hidden input element

### Methods
- **handleFileSelect** - Handle file selection
- **validateAndSetFile** - Validate and set file
- **clearFile** - Reset file selection

## 🚀 How to Use

### Basic Usage

```jsx
import { useFileInput } from '../hooks/use-file-input';

const { 
  fileName, 
  error, 
  fileInputRef, 
  handleFileSelect, 
  clearFile 
} = useFileInput({
  maxSize: 2  // 2MB max
});

<input
  type="file"
  ref={fileInputRef}
  onChange={handleFileSelect}
  className="hidden"
/>
```

### Hook Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `accept` | String | undefined | File type restriction (e.g., "image/*") |
| `maxSize` | Number | undefined | Maximum file size in MB |

### Return Values

| Value | Type | Description |
|-------|------|-------------|
| `fileName` | String | Selected file name |
| `fileSize` | Number | File size in bytes |
| `error` | String | Validation error message |
| `fileInputRef` | Ref | Reference to input element |
| `handleFileSelect` | Function | File selection handler |
| `validateAndSetFile` | Function | Validation function |
| `clearFile` | Function | Reset file selection |

## 📍 Example Implementations

### 1. Basic File Upload
- Simple file selection
- 2MB size limit
- Clear button
- Error display

```jsx
const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
  useFileInput({ maxSize: 2 });
```

### 2. Image Uploader
- Image files only (`image/*`)
- 5MB size limit
- Shows file size
- Visual feedback

```jsx
const { fileName, error, fileInputRef, handleFileSelect, fileSize, clearFile } =
  useFileInput({ accept: "image/*", maxSize: 5 });
```

### 3. Document Uploader
- PDF, DOC, DOCX only
- 10MB size limit
- Drag-and-drop style UI
- Click to upload

```jsx
const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
  useFileInput({ accept: ".pdf,.doc,.docx", maxSize: 10 });
```

## 🎯 Use Cases

### Where to Use This Hook

1. **Profile Picture Upload** - User avatars
2. **Document Submission** - Forms and applications
3. **Image Gallery** - Photo uploads
4. **File Attachments** - Email-style attachments
5. **Report Issues** - Maintenance photos
6. **Resume Upload** - Job applications
7. **Invoice Upload** - Billing documents

## 🎨 Customization Examples

### Custom File Types

```jsx
// Images only
useFileInput({ accept: "image/*" })

// PDFs only
useFileInput({ accept: ".pdf" })

// Multiple types
useFileInput({ accept: ".pdf,.doc,.docx,.txt" })

// Videos
useFileInput({ accept: "video/*" })
```

### Custom Size Limits

```jsx
// 1MB limit
useFileInput({ maxSize: 1 })

// 10MB limit
useFileInput({ maxSize: 10 })

// 50MB limit
useFileInput({ maxSize: 50 })
```

### Combined Validation

```jsx
useFileInput({
  accept: "image/*",
  maxSize: 5
})
```

## 📱 Responsive Design

### All Examples
- Mobile-optimized layouts
- Touch-friendly buttons
- Responsive grid
- Adaptive spacing

### Desktop (> 768px)
- 3-column grid
- Larger upload areas
- Side-by-side buttons

### Mobile (< 768px)
- Single column
- Stacked elements
- Full-width buttons
- Compact spacing

## 🔧 Technical Details

### Validation Logic

```javascript
// Size validation
if (maxSize && file.size > maxSize * 1024 * 1024) {
  setError(`File size must be less than ${maxSize}MB`);
  return;
}

// Type validation
if (accept && !file.type.match(accept.replace("/*", "/"))) {
  setError(`File type must be ${accept}`);
  return;
}
```

### File Size Formatting

```javascript
// Convert bytes to MB
{(fileSize / (1024 * 1024)).toFixed(2)}MB
```

### Clear Functionality

```javascript
const clearFile = () => {
  setFileName("");
  setError("");
  setFileSize(0);
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
```

## 💡 Integration Examples

### In a Form

```jsx
function MyForm() {
  const { fileName, fileInputRef, handleFileSelect } = useFileInput({
    accept: "image/*",
    maxSize: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    // Upload file...
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => fileInputRef.current?.click()}>
        Select File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
      {fileName && <p>Selected: {fileName}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### With Preview

```jsx
function ImageUploadWithPreview() {
  const [preview, setPreview] = useState(null);
  const { fileName, fileInputRef, handleFileSelect } = useFileInput({
    accept: "image/*",
    maxSize: 5
  });

  const handleChange = (e) => {
    handleFileSelect(e);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
}
```

## 🐛 Troubleshooting

### File Not Clearing?
- Check if `clearFile()` is called
- Verify ref is properly set
- Check input value reset

### Validation Not Working?
- Verify `accept` format
- Check `maxSize` value
- Console log file properties

### Error Not Showing?
- Check error state
- Verify error display component
- Test with invalid files

## 📊 Validation Rules

### File Size
- Specified in MB
- Converted to bytes for comparison
- Error message includes limit

### File Type
- Uses MIME type matching
- Supports wildcards (`image/*`)
- Supports extensions (`.pdf`)

### Error Messages
- Clear and descriptive
- Includes expected values
- User-friendly language

## 🎉 Next Steps

1. **Visit Examples Page**
   - Navigate to `/file-upload-examples`
   - Test each upload pattern
   - Try validation errors

2. **Use in Your Forms**
   - Import the hook
   - Add to form components
   - Customize validation

3. **Extend Functionality**
   - Add drag-and-drop
   - Add file preview
   - Add multiple files
   - Add progress bars

## 🔗 Related Components

- **FileUpload** - Drag-and-drop component
- **Button** - UI button component
- **Input** - Form input component

## 📦 Dependencies

### NPM Packages
- ✅ React hooks (useState, useRef)
- ✅ No external dependencies needed!

### Component Dependencies
- ✅ Button component (already exists)
- ✅ Lucide React icons (already installed)
- ✅ Tailwind CSS (already configured)

## 🎨 Styling Tips

### Custom Button Styles

```jsx
<Button 
  onClick={() => fileInputRef.current?.click()}
  className="bg-blue-600 hover:bg-blue-700"
>
  Upload File
</Button>
```

### Custom Error Styles

```jsx
{error && (
  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
    <p className="text-red-600 text-sm">{error}</p>
  </div>
)}
```

### Custom File Display

```jsx
{fileName && (
  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
    <FileIcon className="w-4 h-4" />
    <span className="text-sm">{fileName}</span>
    <button onClick={clearFile}>×</button>
  </div>
)}
```

## 📞 Support

For issues or questions, check the main README.md or contact the development team.

---

**Your useFileInput hook is ready to simplify file uploads!** 📁
