import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadSection = ({ 
  onFileUpload, 
  onTextInput, 
  uploadMode, 
  setUploadMode,
  isProcessing = false 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [textContent, setTextContent] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file?.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    if (file?.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB.');
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileUpload(e?.target?.files?.[0]);
    }
  };

  const handleTextSubmit = () => {
    if (textContent?.trim()?.length < 50) {
      alert('Please enter at least 50 characters of syllabus content.');
      return;
    }
    onTextInput(textContent);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-muted rounded-lg p-1 flex">
          <button
            onClick={() => setUploadMode('pdf')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              uploadMode === 'pdf' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Upload" size={16} className="mr-2" />
            PDF Upload
          </button>
          <button
            onClick={() => setUploadMode('text')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              uploadMode === 'text' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Type" size={16} className="mr-2" />
            Text Input
          </button>
        </div>
      </div>
      {uploadMode === 'pdf' ? (
        <div className="space-y-4">
          {/* PDF Upload Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={32} className="text-primary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                  Upload your syllabus PDF
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Drag and drop your PDF file here, or click to browse
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  disabled={isProcessing}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Choose File
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Supported format: PDF • Max size: 10MB
              </div>
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Uploading...</p>
                    <div className="w-48 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Upload Tips */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
              Tips for best results
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ensure your PDF contains clear text (not scanned images)</li>
              <li>• Include course objectives, topics, and learning outcomes</li>
              <li>• Well-structured syllabi with headings work best</li>
              <li>• Remove unnecessary pages to improve processing speed</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Text Input Area */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Paste your syllabus content
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e?.target?.value)}
              placeholder={`Enter your syllabus content here...\n\nExample:\nCourse: Introduction to Machine Learning\n\nModule 1: Fundamentals\n- Linear Algebra Basics\n- Statistics and Probability\n- Python Programming\n\nModule 2: Supervised Learning\n- Linear Regression\n- Logistic Regression\n- Decision Trees\n\n...and so on`}
              className="w-full h-64 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
              disabled={isProcessing}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{textContent?.length} characters (minimum 50 required)</span>
              <span>Tip: Use clear headings and bullet points</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            onClick={handleTextSubmit}
            disabled={textContent?.trim()?.length < 50 || isProcessing}
            loading={isProcessing}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            Process Text Content
          </Button>

          {/* Text Input Guidelines */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Formatting Guidelines
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use clear headings for modules/chapters (e.g., "Module 1:", "Chapter 1:")</li>
              <li>• List topics with bullet points or dashes</li>
              <li>• Include learning objectives and outcomes</li>
              <li>• Separate different sections with line breaks</li>
              <li>• Be specific about topics and subtopics</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;