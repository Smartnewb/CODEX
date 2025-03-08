"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Save,
  Send,
  FileCode,
  Terminal,
  AlertCircle,
  Bug,
  History,
  Undo,
  Redo,
  Copy,
  CheckCircle,
  Code2,
  Braces,
} from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  timeLimit?: number; // in minutes
  onRun?: (code: string) => void;
  onSubmit?: (code: string) => void;
}

interface CodeHistory {
  timestamp: Date;
  code: string;
}

export function CodeEditor({
  initialCode = "// Write your code here\n\n",
  language = "javascript",
  timeLimit = 60,
  onRun,
  onSubmit,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [lintResults, setLintResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("output");
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // in seconds
  const [codeHistory, setCodeHistory] = useState<CodeHistory[]>([
    { timestamp: new Date(), code: initialCode },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [testCases, setTestCases] = useState([
    { id: 1, input: "[2,7,11,15], 9", expectedOutput: "[0,1]", passed: false },
    { id: 2, input: "[3,2,4], 6", expectedOutput: "[1,2]", passed: false },
    { id: 3, input: "[3,3], 6", expectedOutput: "[0,1]", passed: false },
  ]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generate line numbers
  useEffect(() => {
    const lines = code.split("\n").length;
    const numbers = Array.from({ length: lines }, (_, i) => (i + 1).toString());
    setLineNumbers(numbers);
  }, [code]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          // Auto-submit when time is up
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save effect
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      // Only save if code has changed from the last history entry
      if (code !== codeHistory[codeHistory.length - 1].code) {
        saveToHistory();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveTimer);
  }, [code, codeHistory]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const saveToHistory = () => {
    const newHistory = [...codeHistory, { timestamp: new Date(), code }];
    setCodeHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCode(codeHistory[newIndex].code);
    }
  };

  const handleRedo = () => {
    if (historyIndex < codeHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCode(codeHistory[newIndex].code);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");
    setActiveTab("output");
    saveToHistory();

    // Simulate code execution
    setTimeout(() => {
      // Mock test case execution
      const updatedTestCases = testCases.map((testCase) => {
        // Simulate test case execution - in a real app, this would actually run the code
        const passed = Math.random() > 0.3; // Randomly pass or fail for demo
        return { ...testCase, passed };
      });
      setTestCases(updatedTestCases);

      // Generate output based on test cases
      const testOutput = updatedTestCases
        .map(
          (tc) =>
            `Test Case ${tc.id}: ${tc.input} => ${tc.passed ? "PASSED ✓" : "FAILED ✗"}`,
        )
        .join("\n");

      // Mock output
      setOutput(
        `Running ${language} code...\n\nOutput:\n> twoSum([2, 7, 11, 15], 9)\n[0, 1]\n\nTest Results:\n${testOutput}\n\n${updatedTestCases.filter((tc) => tc.passed).length}/${updatedTestCases.length} tests passed.`,
      );

      // Mock lint results
      setLintResults([
        "Line 3: Unexpected console statement (no-console)",
        "Line 5: Missing semicolon (semi)",
        "Line 8: Consider using a more descriptive variable name than 'i'",
        "Line 12: This function has a cognitive complexity of 15 (exceeds 10)",
      ]);

      // Mock AI suggestions
      setAiSuggestions([
        "Consider using a hash map to improve time complexity from O(n²) to O(n)",
        "Add input validation to handle edge cases like empty arrays",
        "The variable names could be more descriptive for better readability",
      ]);

      setIsRunning(false);

      // Call the onRun callback if provided
      if (onRun) onRun(code);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setOutput("");
    setActiveTab("output");
    saveToHistory();

    // Simulate submission
    setTimeout(() => {
      setOutput(
        `Submitting ${language} code...\n\nRunning final tests...\n\nAll tests completed.\n\nSubmission successful!`,
      );
      setIsSubmitting(false);

      // Call the onSubmit callback if provided
      if (onSubmit) onSubmit(code);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert tab at cursor position
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // Move cursor after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }

    // Handle Ctrl+S for save
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveToHistory();
    }

    // Handle Ctrl+Z for undo
    if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }

    // Handle Ctrl+Shift+Z or Ctrl+Y for redo
    if (
      (e.key === "z" && e.ctrlKey && e.shiftKey) ||
      (e.key === "y" && e.ctrlKey)
    ) {
      e.preventDefault();
      handleRedo();
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
      {/* Editor header with language indicator and time */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <FileCode size={16} />
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
          <Badge variant="outline" className="ml-2">
            <Braces size={12} className="mr-1" /> Syntax:{" "}
            {language === "javascript" ? "ES6+" : language}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <History size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View code history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                >
                  <Undo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRedo}
                  disabled={historyIndex >= codeHistory.length - 1}
                >
                  <Redo size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Shift+Z)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span
            className={`text-sm font-mono ${timeRemaining < 300 ? "text-red-500 font-bold" : ""}`}
          >
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Code editor area */}
      <div className="flex-1 overflow-auto relative">
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-muted/30 font-mono text-sm text-muted-foreground p-4 text-right select-none">
          {lineNumbers.map((num, i) => (
            <div key={i}>{num}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full pl-12 p-4 font-mono text-sm bg-background resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>

      {/* Code history panel (conditionally rendered) */}
      {showHistory && (
        <div className="border-t h-48 overflow-auto">
          <div className="p-2 bg-muted/40 font-medium text-sm flex justify-between items-center">
            <span>Code History</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(false)}
            >
              Close
            </Button>
          </div>
          <div className="p-2">
            {codeHistory.map((entry, index) => (
              <div
                key={index}
                className={`p-2 text-sm cursor-pointer hover:bg-muted/50 rounded ${index === historyIndex ? "bg-muted/70 border-l-2 border-primary" : ""}`}
                onClick={() => {
                  setHistoryIndex(index);
                  setCode(entry.code);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-mono">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {index === 0 ? "Initial" : `Version ${index}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-b bg-muted/40">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCode(initialCode)}
          >
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={saveToHistory}>
            <Save size={14} className="mr-1" /> Save
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
          >
            {isRunning ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play size={16} className="mr-2" /> Run Code
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" /> Submit
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Output/Console area */}
      <div className="h-1/3 border-t">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center px-4 py-2 bg-muted/40">
            <TabsList>
              <TabsTrigger value="output" className="flex items-center gap-1">
                <Terminal size={14} /> Output
              </TabsTrigger>
              <TabsTrigger value="lint" className="flex items-center gap-1">
                <AlertCircle size={14} /> Lint
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex items-center gap-1">
                <Bug size={14} /> Tests
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-1">
                <Code2 size={14} /> AI Suggestions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="output" className="p-0">
            <div className="h-full bg-black text-white font-mono text-sm p-4 overflow-auto">
              {output ? (
                <pre>{output}</pre>
              ) : (
                <div className="text-gray-500">
                  Run your code to see the output here.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="lint" className="p-0">
            <div className="h-full bg-black text-white font-mono text-sm p-4 overflow-auto">
              {lintResults.length > 0 ? (
                <div>
                  <div className="text-yellow-400 mb-2">
                    Found {lintResults.length} issues:
                  </div>
                  {lintResults.map((result, index) => (
                    <div key={index} className="text-yellow-200 mb-1">
                      ⚠️ {result}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No linting issues found.</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="p-0">
            <div className="h-full bg-black text-white p-4 overflow-auto">
              <div className="mb-3 text-sm">Test Cases:</div>
              <div className="space-y-2">
                {testCases.map((testCase) => (
                  <div
                    key={testCase.id}
                    className="border border-gray-700 rounded p-2"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">
                        Test Case {testCase.id}
                      </span>
                      {testCase.passed !== undefined && (
                        <Badge
                          variant={testCase.passed ? "success" : "destructive"}
                        >
                          {testCase.passed ? (
                            <span className="flex items-center">
                              <CheckCircle size={12} className="mr-1" /> Passed
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <X size={12} className="mr-1" /> Failed
                            </span>
                          )}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm">
                      <div>
                        <span className="text-gray-400">Input:</span>{" "}
                        {testCase.input}
                      </div>
                      <div>
                        <span className="text-gray-400">Expected:</span>{" "}
                        {testCase.expectedOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="p-0">
            <div className="h-full bg-black text-white p-4 overflow-auto">
              <div className="mb-3 text-sm">AI Code Analysis:</div>
              {aiSuggestions.length > 0 ? (
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="border border-blue-800 bg-blue-950/30 rounded p-3"
                    >
                      <div className="flex items-start gap-2">
                        <Code2 size={16} className="text-blue-400 mt-0.5" />
                        <div className="text-sm">{suggestion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">
                  Run your code to get AI suggestions.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Custom Badge component for test results
function X({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
