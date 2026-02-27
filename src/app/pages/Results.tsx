import { useLocation, Link } from "react-router";
import { Download, ArrowLeft, CheckCircle2, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export function Results() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Try to get data from location.state first, then fall back to sessionStorage
  let stateData = location.state;
  
  console.log("=== Results Page - location.state ===", location.state);
  
  if (!stateData) {
    // Try to retrieve from sessionStorage
    const storedData = sessionStorage.getItem('olaisuvadi_result');
    console.log("=== Results Page - sessionStorage data ===", storedData);
    
    if (storedData) {
      try {
        stateData = JSON.parse(storedData);
        console.log("=== Results Page - parsed sessionStorage ===", stateData);
      } catch (e) {
        console.error("Failed to parse sessionStorage data:", e);
      }
    }
  }
  
  const { result, originalImage, timestamp } = stateData || {};

  console.log("=== Results Page - result ===", result);
  console.log("=== Results Page - originalImage ===", originalImage);

  // Parse the Gradio result to extract meaningful data
  const parseGradioResult = () => {
    if (!result) return null;

    const outputs: Array<{ type: 'image' | 'text' | 'array', data: any, index: number, label: string }> = [];

    // Function to extract image URL from Gradio format
    const extractImageUrl = (item: any): string | null => {
      if (typeof item === 'string' && (item.startsWith('http') || item.startsWith('data:'))) {
        return item;
      }
      if (item && typeof item === 'object') {
        // Gradio returns objects with url or path property
        if (item.image && typeof item.image === 'object') {
          // Handle nested image object {image: {url/path}, caption}
          return item.image.url || item.image.path || null;
        }
        return item.url || item.path || item.image || null;
      }
      return null;
    };

    // Define the expected tab labels in order
    const tabLabels = [
      'Cleaned Binary Image',
      'Thresholded Image', 
      'Line Segmentation',
      'Character Segmentation'
    ];

    // If result is an array (typical Gradio format with multiple outputs)
    if (Array.isArray(result)) {
      result.forEach((item, index) => {
        // Output 0 & 1: Single image objects
        if (index === 0 || index === 1) {
          const imageUrl = extractImageUrl(item);
          if (imageUrl) {
            outputs.push({ 
              type: 'image', 
              data: imageUrl, 
              index,
              label: index === 0 ? 'Cleaned Binary Image' : 'Thresholded Image'
            });
          }
        }
        // Output 2: Line segmentation - array of images with bounding boxes
        else if (index === 2 && Array.isArray(item)) {
          outputs.push({
            type: 'array',
            data: item,
            index,
            label: 'Line Segmentation'
          });
        }
        // Output 3: Character segmentation - array of individual character crops
        else if (index === 3 && Array.isArray(item)) {
          outputs.push({
            type: 'array',
            data: item,
            index,
            label: 'Character Segmentation'
          });
        }
        // Output 4: Summary text
        else if (index === 4 && typeof item === 'string') {
          outputs.push({
            type: 'text',
            data: item,
            index,
            label: 'Summary'
          });
        }
      });
    }

    return outputs.length > 0 ? { outputs } : null;
  };

  // Parse summary text to extract line and character counts
  const parseSummaryText = (text: string): { totalLines: number; totalCharacters: number; lines: Array<{ number: number; characters: number }> } | null => {
    if (!text || typeof text !== 'string') return null;

    try {
      const lines = text.split('\n');
      let totalLines = 0;
      let totalCharacters = 0;
      const lineDetails: Array<{ number: number; characters: number }> = [];

      // Parse "Total lines: X"
      const totalLinesMatch = text.match(/Total lines:\s*(\d+)/i);
      if (totalLinesMatch) {
        totalLines = parseInt(totalLinesMatch[1], 10);
      }

      // Parse "Total characters: Y"
      const totalCharsMatch = text.match(/Total characters:\s*(\d+)/i);
      if (totalCharsMatch) {
        totalCharacters = parseInt(totalCharsMatch[1], 10);
      }

      // Parse individual line details "Line N: X characters"
      const linePattern = /Line (\d+):\s*(\d+)\s*characters?/gi;
      let match;
      while ((match = linePattern.exec(text)) !== null) {
        lineDetails.push({
          number: parseInt(match[1], 10),
          characters: parseInt(match[2], 10)
        });
      }

      // Sort line details by line number
      lineDetails.sort((a, b) => a.number - b.number);

      return {
        totalLines,
        totalCharacters,
        lines: lineDetails
      };
    } catch (e) {
      console.error('Error parsing summary text:', e);
      return null;
    }
  };

  // Get summary stats from parsed result
  const getSummaryStats = () => {
    if (!result || !Array.isArray(result)) return null;
    
    // Output 4 contains the summary text
    const summaryOutput = result[4];
    if (summaryOutput && typeof summaryOutput === 'string') {
      const parsed = parseSummaryText(summaryOutput);
      if (parsed && parsed.totalLines > 0) {
        return parsed;
      }
    }
    
    return null;
  };

  const stats = getSummaryStats();

  const parsedResult = parseGradioResult();

  console.log("=== Parsed Result ===", parsedResult);

  // If no result data, show message
  if (!stateData || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <ArrowLeft className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl text-primary">No Results Found</h2>
          <p className="text-muted-foreground">
            Please upload an image first to see the results.
          </p>
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-yellow-800">
              Debug Info: location.state = {JSON.stringify(location.state)}
              <br />
              sessionStorage = {sessionStorage.getItem('olaisuvadi_result') || 'null'}
            </p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Upload
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    if (result) {
      const textToCopy = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      
      // Try modern clipboard API first, fall back to legacy method
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error('Clipboard API failed:', err);
            fallbackCopy(textToCopy);
          });
      } else {
        // Use fallback method
        fallbackCopy(textToCopy);
      }
    }
  };

  const fallbackCopy = (text: string) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    
    textarea.focus();
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback copy failed');
        alert('Copy failed. Please manually select and copy the text.');
      }
    } catch (err) {
      console.error('Fallback copy error:', err);
      alert('Copy failed. Please manually select and copy the text.');
    }
    
    document.body.removeChild(textarea);
  };

  const handleDownload = () => {
    const dataToDownload = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    const blob = new Blob([dataToDownload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tamil-olaisuvadi-result-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format the result for display
  const displayResult = typeof result === 'string' ? result : JSON.stringify(result, null, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Upload
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl border-2 border-primary/20 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-primary">Processing Complete!</h1>
                <p className="text-muted-foreground">Your manuscript has been successfully digitized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Column - Images and Outputs */}
          <div className="space-y-6">
            {/* Original Image - Large and Wide */}
            {originalImage && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-4">
                  <h2 className="text-white text-xl font-semibold">Original Manuscript Image</h2>
                </div>
                <div className="p-8 bg-muted/20">
                  <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 bg-white">
                    <img
                      src={originalImage}
                      alt="Original manuscript"
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: '600px' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Digitized Output with Tabs */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-primary/20 overflow-hidden">
              <div className="bg-gradient-to-r from-accent to-secondary p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-white text-2xl font-semibold">Digitized Output</h2>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span className="text-white text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 text-white" />
                          <span className="text-white text-sm">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="Download results"
                    >
                      <Download className="w-5 h-5 text-white" />
                      <span className="text-white text-sm">Download</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {parsedResult && parsedResult.outputs.length > 0 ? (
                <div>
                  {/* Tab Navigation - Fixed 4 tabs */}
                  <div className="flex border-b border-primary/10 bg-muted/20 overflow-x-auto">
                    {['Cleaned Binary Image', 'Thresholded Image', 'Line Segmentation', 'Character Segmentation'].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                          activeTab === idx
                            ? 'text-primary border-b-2 border-primary bg-white'
                            : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-8">
                    {[0, 1, 2, 3].map((tabIdx) => {
                      // Get outputs by index from parsedResult
                      const output = parsedResult.outputs.find(o => o.index === tabIdx);
                      
                      return (
                        <div
                          key={tabIdx}
                          className={`${activeTab === tabIdx ? 'block' : 'hidden'}`}
                        >
                          {/* Tab 0 & 1: Single Image outputs */}
                          {output && output.type === 'image' ? (
                            <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border-2 border-primary/10">
                              <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 bg-white">
                                <img
                                  src={output.data}
                                  alt={output.label}
                                  className="w-full h-auto object-contain"
                                  style={{ maxHeight: '700px' }}
                                  onError={(e) => {
                                    console.error('Image failed to load:', output.data);
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = `<div class="p-8 text-center text-muted-foreground">
                                      <p>Image failed to load</p>
                                      <p class="text-sm mt-2">URL: ${output.data}</p>
                                    </div>`;
                                  }}
                                />
                              </div>
                            </div>
                          ) : /* Tab 2: Line Segmentation - Big and Wide display */
                          output && output.type === 'array' && Array.isArray(output.data) && tabIdx === 2 ? (
                            <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-6 border-2 border-primary/10">
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-primary">
                                  {output.label}
                                </h3>
                                <span className="text-sm text-muted-foreground">
                                  {output.data.length} lines
                                </span>
                              </div>
                              <div className="space-y-6 max-h-[700px] overflow-y-auto p-2">
                                {output.data.map((item: any, idx: number) => {
                                  // Extract image URL from the array item
                                  const imgUrl = item?.image?.url || item?.image?.path || item?.url || item?.path || null;
                                  return (
                                    <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-primary/20 bg-white">
                                      {imgUrl ? (
                                        <>
                                          <img
                                            src={imgUrl}
                                            alt={`Line ${idx + 1}`}
                                            className="w-full h-auto object-contain"
                                            style={{ maxHeight: '200px' }}
                                            onError={(e) => {
                                              console.error('Image failed to load:', imgUrl);
                                              e.currentTarget.style.display = 'none';
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <div className="p-4 text-center text-muted-foreground text-sm">
                                          No image
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : /* Tab 3: Character Segmentation - Grid display (keep as is) */
                          output && output.type === 'array' && Array.isArray(output.data) && tabIdx === 3 ? (
                            <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-6 border-2 border-primary/10">
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-primary">
                                  {output.label}
                                </h3>
                                <span className="text-sm text-muted-foreground">
                                  {output.data.length} items
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto p-2">
                                {output.data.map((item: any, idx: number) => {
                                  // Extract image URL from the array item
                                  const imgUrl = item?.image?.url || item?.image?.path || item?.url || item?.path || null;
                                  return (
                                    <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-primary/20 bg-white">
                                      {imgUrl ? (
                                        <>
                                          <img
                                            src={imgUrl}
                                            alt={`${output.label} ${idx + 1}`}
                                            className="w-full h-auto object-contain"
                                            style={{ aspectRatio: 'auto' }}
                                            onError={(e) => {
                                              console.error('Image failed to load:', imgUrl);
                                              e.currentTarget.style.display = 'none';
                                            }}
                                          />
                                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center">
                                            Char {idx + 1}
                                          </div>
                                        </>
                                      ) : (
                                        <div className="p-4 text-center text-muted-foreground text-sm">
                                          No image
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border-2 border-primary/10">
                              <div className="py-12 text-center">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                  <span className="text-2xl">📊</span>
                                </div>
                                <p className="text-muted-foreground">No image available for this stage</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border-2 border-primary/10">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-xl text-foreground whitespace-pre-wrap break-words leading-relaxed">
                        {displayResult}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/upload"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                Process Another Manuscript
              </Link>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Results
              </button>
            </div>
          </div>

          {/* Right Column - Summary Stats */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-primary/20 overflow-hidden top-6">
              <div className="bg-gradient-to-r from-accent to-secondary p-4">
                <h2 className="text-white text-xl font-semibold">Summary</h2>
              </div>

              <div className="p-6">
                {stats ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Total lines:</p>
                      <p className="text-3xl text-primary font-bold">{stats.totalLines}</p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-4 border border-accent/20">
                      <p className="text-xs text-muted-foreground mb-1">Total characters:</p>
                      <p className="text-3xl text-accent font-bold">{stats.totalCharacters}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-primary font-semibold mb-3">Line Details</h3>
                      <div className="space-y-2">
                        {stats.lines.map((line) => (
                          <div
                            key={line.number}
                            className="bg-muted/50 rounded-lg p-3 flex items-center justify-between"
                          >
                            <span className="text-sm text-foreground font-medium">
                              Line {line.number}:
                            </span>
                            <span className="text-sm text-primary font-semibold">
                              {line.characters} characters
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">📊</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Processing data...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Processing Details */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-primary/20 p-6">
              <h3 className="text-lg text-primary mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Processing Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Date</p>
                  <p className="text-foreground font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Time</p>
                  <p className="text-foreground font-medium">{new Date().toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Model</p>
                  <p className="text-foreground font-medium">Olaisuvadi v1.0</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Status</p>
                  <p className="text-green-600 font-medium">Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}