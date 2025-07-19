import { useState } from 'react';
import { useJobApplicationAuth } from '../hooks/useJobApplicationAuth'; // Updated to match your existing auth hook
import { uploadFileToStorage } from '../firebase'; // Using your existing upload function
import { Button } from '../components/ui/button'; // Adjusted path
import { Input } from '../components/ui/input';
import { Loader2, UploadCloud, CheckCircle, XCircle } from 'lucide-react';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    url?: string;
    error?: string;
  } | null>(null);
  const { user } = useJobApplicationAuth();

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setUploading(true);
    setResult(null);

    try {
      // Use your existing upload function
      const sanitizedEmail = user.email?.replace(/[^a-zA-Z0-9]/g, '_') || 'user';
      const uploadResult = await uploadFileToStorage(file, sanitizedEmail);
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Upload failed');
      }
      
      setResult({
        success: true,
        url: uploadResult.downloadURL
      });
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Upload failed'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 pt-20">
      <h1 className="text-2xl font-bold">Storage Upload Test</h1>
      
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Input 
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={uploading}
          />
          <p className="text-sm text-muted-foreground">
            PDF, DOC, or DOCX (max 5MB)
          </p>
        </div>

        <Button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4" />
              Upload Test File
            </>
          )}
        </Button>

        {result && (
          <div className={`p-4 rounded-md border ${
            result.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {result.success ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium text-green-800">Upload Successful!</h3>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium text-red-800">Upload Failed</h3>
                </>
              )}
            </div>
            
            {result.success ? (
              <div className="mt-2">
                <p className="text-sm text-green-700">
                  File uploaded successfully to Firebase Storage.
                </p>
                <p className="mt-2 text-xs break-all">
                  <span className="font-medium">Path:</span> {result.url}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-red-700">
                Error: {result.error}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Test Checklist</h3>
        <ul className="text-sm space-y-1 text-blue-700">
          <li>✓ User must be authenticated</li>
          <li>✓ Only PDF/DOC/DOCX allowed</li>
          <li>✓ Max 5MB file size</li>
          <li>✓ Files saved to user-specific path</li>
        </ul>
      </div>
    </div>
  );
}