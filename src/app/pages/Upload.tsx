import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Client } from "@gradio/client";

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setError(null);
        setSuccess(false);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select a valid image file (PNG, JPG, JPEG)");
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setError(null);
      setSuccess(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please drop a valid image file");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      // Connect to Gradio client
      const client = await Client.connect("Ashvitta07/Olaisuvadi");
      
      // Convert file to blob
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      
      // Process the image
      const result = await client.predict("/run_pipeline", { 
        image: blob,
      });

      console.log("=== FULL Processing result ===", result);
      console.log("=== result.data ===", result.data);
      
      // Check if we got valid data
      let processedData = null;
      
      if (result && result.data) {
        processedData = result.data;
      } else if (result) {
        processedData = result;
      } else {
        throw new Error("No data received from processing");
      }
      
      console.log("=== processedData ===", processedData);
      
      setSuccess(true);
      setProcessing(false);

      // Store data in sessionStorage as backup
      const resultData = {
        result: processedData,
        originalImage: preview,
        timestamp: new Date().toISOString()
      };
      
      sessionStorage.setItem('olaisuvadi_result', JSON.stringify(resultData));

      // Small delay to show success message, then navigate
      setTimeout(() => {
        navigate("/results", { 
          state: resultData,
          replace: false
        });
      }, 1500);

    } catch (err) {
      console.error("Processing error:", err);
      setError(err instanceof Error ? err.message : "Failed to process the image. Please try again.");
      setProcessing(false);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary px-6 py-2 rounded-full mb-6">
            <p className="text-white text-sm">பதிவேற்று • Upload</p>
          </div>
          <h1 className="text-4xl md:text-5xl text-primary mb-4">
            Upload Your Manuscript
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload a clear image of your palm leaf manuscript for digitization
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden">
          <div className="p-8 md:p-12">
            {!selectedFile ? (
              /* Upload Area */
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-4 border-dashed border-primary/30 rounded-2xl p-12 text-center hover:border-primary/60 hover:bg-muted/20 transition-all duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                    <UploadIcon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-primary mb-2">
                      Drop your image here
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse from your device
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports: PNG, JPG, JPEG (Max 10MB)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <ImageIcon className="w-5 h-5" />
                    Select Image
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              /* Preview Area */
              <div className="space-y-6">
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden border-4 border-secondary shadow-lg">
                    <img
                      src={preview!}
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-contain bg-muted"
                    />
                  </div>
                  <button
                    onClick={removeFile}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-destructive hover:bg-destructive/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm text-primary">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Button */}
                <button
                  onClick={processImage}
                  disabled={processing || success}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      Success! Redirecting...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-6 h-6" />
                      Process Manuscript
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-destructive/10 border-2 border-destructive rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-destructive">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-green-700">
                  Successfully processed! Redirecting to results...
                </p>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 border-t-2 border-primary/10">
            <h4 className="text-lg text-primary mb-4">Tips for Best Results:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Ensure good lighting when photographing the manuscript</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Keep the camera parallel to the manuscript surface</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Avoid shadows and reflections on the palm leaf</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>Use high-resolution images for better accuracy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
