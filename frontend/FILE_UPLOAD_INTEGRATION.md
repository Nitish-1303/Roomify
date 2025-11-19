# File Upload Component - Integration Guide

## ✅ Successfully Integrated!

The FileUpload component has been converted from TypeScript/Next.js to JavaScript/React and integrated into your Roomify Maintenance page for reporting issues with photo attachments.

## 📁 Files Created

### 1. File Upload Component
- **Location**: `frontend/src/components/ui/file-upload.jsx`
- **Type**: Drag-and-drop file upload with animations
- **Dependencies**: `react-dropzone`, `@tabler/icons-react`, `framer-motion`

### 2. Integration Location
- **Updated**: `frontend/src/pages/Maintenance.jsx`
- **Section**: "Report Issue" modal
- **Purpose**: Allow users to attach photos when reporting maintenance issues

## 🎨 Component Features

### Drag and Drop
- Drag files directly onto the upload area
- Visual feedback when dragging
- Smooth animations on drop
- Click to browse files

### File Preview
- Shows uploaded file name
- Displays file size in MB
- Shows file type
- Last modified date
- Animated appearance

### Visual Effects
- Animated grid pattern background
- Hover effects with 3D transforms
- Pulsing upload icon
- Smooth transitions
- Gradient mask overlay

### User Experience
- Clear upload instructions
- Visual drop zone
- File information display
- Responsive design
- Touch-friendly

## 🚀 How to Use

### Basic Usage

```jsx
import { FileUpload } from '../components/ui/file-upload';

const [files, setFiles] = useState([]);

const handleFileUpload = (files) => {
  setFiles(files);
  console.log(files);
};

<FileUpload onChange={handleFileUpload} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | Function | undefined | Callback when files are uploaded |

### File Object Structure

```javascript
{
  name: "photo.jpg",        // File name
  size: 1024000,            // Size in bytes
  type: "image/jpeg",       // MIME type
  lastModified: 1234567890  // Timestamp
}
```

## 📍 Where It's Used

### Maintenance Page (`/maintenance`)
- **Modal**: "Report Issue"
- **Field**: "Attach Photo (Optional)"
- **Purpose**: Upload photos of maintenance issues
- **Location**: After description field

### Use Cases
1. **Equipment Malfunction** - Photo of broken equipment
2. **Cleanliness Issues** - Photo of area needing attention
3. **Damage Report** - Photo of damaged furniture/fixtures
4. **Network Problems** - Screenshot of error messages
5. **Other Issues** - Visual documentation

## 🎯 Integration Details

### State Management

```javascript
const [uploadedFiles, setUploadedFiles] = useState([]);

const handleFileUpload = (files) => {
  setUploadedFiles(files);
  console.log('Uploaded files:', files);
};
```

### Form Submission

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const issueData = {
    ...formData,
    attachments: uploadedFiles.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type
    }))
  };
  await api.post('/maintenance', issueData);
};
```

## 🎨 Customization Examples

### Change Upload Text

```jsx
<FileUpload onChange={handleFileUpload}>
  <p>Upload your documents</p>
</FileUpload>
```

### Restrict File Types

```jsx
const { getRootProps } = useDropzone({
  accept: {
    'image/*': ['.png', '.jpg', '.jpeg']
  },
  onDrop: handleFileChange
});
```

### Multiple Files

```jsx
const { getRootProps } = useDropzone({
  multiple: true,  // Allow multiple files
  onDrop: handleFileChange
});
```

## 📱 Responsive Design

### Desktop (> 768px)
- Large upload area
- Full file information display
- Hover effects enabled
- Spacious layout

### Tablet (768px - 1024px)
- Medium upload area
- Condensed file info
- Touch-optimized
- Adjusted spacing

### Mobile (< 768px)
- Compact upload area
- Stacked file information
- Touch-friendly
- Full-width layout

## 🔧 Technical Details

### Dropzone Configuration

```javascript
const { getRootProps, isDragActive } = useDropzone({
  multiple: false,      // Single file only
  noClick: true,        // Disable click on root
  onDrop: handleFileChange,
  onDropRejected: (error) => {
    console.log(error);
  },
});
```

### Animation Variants

```javascript
const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 }
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
```

### Grid Pattern

```javascript
export function GridPattern() {
  const columns = 41;
  const rows = 11;
  // Generates checkerboard pattern
}
```

## 🎨 Styling Details

### Upload Area
- Padding: 2.5rem (p-10)
- Rounded corners: 0.5rem
- Cursor: pointer
- Relative positioning
- Overflow hidden

### File Display
- Background: white
- Shadow: subtle
- Padding: 1rem
- Rounded: 0.375rem
- Animated entrance

### Grid Background
- Checkerboard pattern
- 41 columns × 11 rows
- Alternating shadows
- Radial gradient mask
- Scale: 105%

## 💡 Usage Ideas

### Where to Use This Component

1. **Maintenance Reports** - Photo evidence
2. **User Profile** - Avatar upload
3. **Room Images** - Add room photos
4. **Document Upload** - PDF attachments
5. **Feedback Forms** - Screenshot uploads
6. **Support Tickets** - Issue documentation

### Content Ideas

- Equipment photos
- Damage documentation
- Before/after images
- Error screenshots
- Floor plans
- Receipts/invoices

## 🐛 Troubleshooting

### Files Not Uploading?
- Check file size limits
- Verify file type restrictions
- Check browser console for errors
- Test with different file types

### Drag and Drop Not Working?
- Ensure `react-dropzone` is installed
- Check browser compatibility
- Verify dropzone configuration
- Test on different browsers

### Animations Not Smooth?
- Check Framer Motion installation
- Verify animation variants
- Test browser performance
- Reduce animation complexity

## 📊 File Information Display

### Displayed Data
- **File Name** - Truncated if too long
- **File Size** - Converted to MB
- **File Type** - MIME type
- **Modified Date** - Formatted date

### Format Examples

```javascript
// File size
{(file.size / (1024 * 1024)).toFixed(2)} MB

// Modified date
{new Date(file.lastModified).toLocaleDateString()}
```

## 🎉 Next Steps

1. **Test the Upload**
   - Navigate to `/maintenance`
   - Click "Report Issue"
   - Try drag-and-drop
   - Try click-to-browse

2. **Customize Behavior**
   - Adjust file type restrictions
   - Change upload area size
   - Modify animations
   - Update styling

3. **Backend Integration**
   - Set up file storage (AWS S3, etc.)
   - Create upload endpoint
   - Handle file processing
   - Store file references

## 🔗 Backend Integration Example

### Upload to Server

```javascript
const handleFileUpload = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload successful:', response.data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Store File URLs

```javascript
const issueData = {
  ...formData,
  attachments: response.data.fileUrls
};
```

## 📦 Dependencies

### NPM Packages
- ✅ `react-dropzone` - Drag and drop functionality
- ✅ `@tabler/icons-react` - Upload icon
- ✅ `framer-motion` - Animations (already installed)

### Component Dependencies
- ✅ React hooks (useState, useRef)
- ✅ Tailwind CSS
- ✅ `cn` utility function

## 🎨 Icon Options

### Using Tabler Icons

```jsx
import { IconUpload } from "@tabler/icons-react";

<IconUpload className="h-4 w-4" />
```

### Alternative Icons

```jsx
import { Upload } from "lucide-react";

<Upload className="h-4 w-4" />
```

## 📞 Support

For issues or questions, check the main README.md or contact the development team.

---

**Your File Upload component is ready for maintenance reports!** 📸
