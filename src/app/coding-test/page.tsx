"use client";

import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/coding-test/code-editor";
import { ProblemDescription } from "@/components/coding-test/problem-description";
import { VirtualTeammate } from "@/components/coding-test/virtual-teammate";
import { DockerEnvironment } from "@/components/coding-test/docker-environment";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Code,
  FileCode,
  Settings,
  Terminal,
  GitBranch,
  Play,
  Save,
  Send,
  MessageSquare,
  Server,
  Lightbulb,
  BarChart,
  HelpCircle,
  Keyboard,
  Files,
  Search,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function CodingTestPage() {
  const [activeTab, setActiveTab] = useState("environment");
  const [activeSideTab, setActiveSideTab] = useState("explorer");
  const [activeEditorTab, setActiveEditorTab] = useState("solution.js");
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample problem data
  const problem = {
    title: "Two Sum",
    difficulty: "medium" as const,
    timeLimit: 60,
    description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>

<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>

<p>You can return the answer in any order.</p>`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation:
          "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
  };

  // Sample initial code
  const initialCode = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  
}

// Example usage:
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));      // Expected: [1, 2]
console.log(twoSum([3, 3], 6));         // Expected: [0, 1]
`;

  // Keyboard shortcuts modal
  const KeyboardShortcutsModal = () => (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${showKeyboardShortcuts ? "block" : "hidden"}`}
    >
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            ×
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">Run Code</div>
          <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
            Ctrl+Enter
          </div>

          <div className="text-sm">Save</div>
          <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
            Ctrl+S
          </div>

          <div className="text-sm">Format Code</div>
          <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
            Shift+Alt+F
          </div>

          <div className="text-sm">Submit Solution</div>
          <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
            Ctrl+Shift+Enter
          </div>

          <div className="text-sm">Toggle Terminal</div>
          <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
            Ctrl+`
          </div>

          <div className="text-sm">Next File</div>
          <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
            Ctrl+Tab
          </div>
        </div>
        <Button
          className="w-full"
          onClick={() => setShowKeyboardShortcuts(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <KeyboardShortcutsModal />

      {/* VS Code-style header */}
      <header className="border-b bg-muted/30">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} />
            </Link>
            <span className="font-bold">CodeAssess AI</span>
            <div className="ml-4 flex space-x-2 text-xs">
              <button className="hover:text-primary">File</button>
              <button className="hover:text-primary">Edit</button>
              <button className="hover:text-primary">View</button>
              <button className="hover:text-primary">Run</button>
              <button className="hover:text-primary">Help</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className={
                timeRemaining < 300 ? "text-red-500 border-red-500" : ""
              }
            >
              {formatTime(timeRemaining)}
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >
              JavaScript
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowKeyboardShortcuts(true)}
                  >
                    <Keyboard size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Keyboard Shortcuts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* VS Code-style tabs for open files */}
        <div className="flex items-center border-b bg-muted/20 px-2">
          <div className="flex">
            {["solution.js", "test.js"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-xs flex items-center gap-1 ${activeEditorTab === tab ? "bg-background border-t border-l border-r border-b-0" : "text-muted-foreground"}`}
                onClick={() => setActiveEditorTab(tab)}
              >
                <FileCode size={14} />
                {tab}
                {activeEditorTab === tab && (
                  <span className="ml-2 text-muted-foreground">×</span>
                )}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Save size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save (Ctrl+S)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Play size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Run Code (Ctrl+Enter)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Send size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Submit Solution (Ctrl+Shift+Enter)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left sidebar - VS Code style activity bar + side panel */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full flex">
              {/* Activity Bar */}
              <div className="w-12 bg-muted/30 border-r flex flex-col items-center py-4 gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          activeSideTab === "explorer" ? "bg-muted" : ""
                        }
                        onClick={() => setActiveSideTab("explorer")}
                      >
                        <Files size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Explorer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={activeSideTab === "search" ? "bg-muted" : ""}
                        onClick={() => setActiveSideTab("search")}
                      >
                        <Search size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={activeSideTab === "git" ? "bg-muted" : ""}
                        onClick={() => setActiveSideTab("git")}
                      >
                        <GitBranch size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Source Control</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          activeSideTab === "suggestions" ? "bg-muted" : ""
                        }
                        onClick={() => setActiveSideTab("suggestions")}
                      >
                        <Lightbulb size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>AI Suggestions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="mt-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={
                            activeSideTab === "settings" ? "bg-muted" : ""
                          }
                          onClick={() => setActiveSideTab("settings")}
                        >
                          <Settings size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={activeSideTab === "help" ? "bg-muted" : ""}
                          onClick={() => setActiveSideTab("help")}
                        >
                          <HelpCircle size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Help</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Side Panel Content */}
              <div className="flex-1 border-r overflow-auto">
                {activeSideTab === "explorer" && (
                  <div className="p-3">
                    <h3 className="text-xs font-semibold mb-2 uppercase">
                      Explorer
                    </h3>
                    <div className="text-sm">
                      <div className="mb-2">
                        <div className="font-semibold mb-1">CODING TEST</div>
                        <div className="pl-4 flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-primary cursor-pointer">
                            <FileCode size={14} /> solution.js
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground cursor-pointer">
                            <FileCode size={14} /> test.js
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground cursor-pointer">
                            <FileCode size={14} /> README.md
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSideTab === "git" && (
                  <div className="p-3">
                    <h3 className="text-xs font-semibold mb-2 uppercase">
                      Source Control
                    </h3>
                    <div className="text-sm">
                      <div className="mb-2">
                        <div className="font-semibold mb-1">Changes</div>
                        <div className="pl-4 flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-green-500">M</span>{" "}
                            solution.js
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Commit message"
                        className="w-full text-xs p-1 bg-muted/30 border rounded mt-2"
                      />
                      <Button size="sm" className="w-full mt-2">
                        Commit & Push
                      </Button>
                    </div>
                  </div>
                )}

                {activeSideTab === "suggestions" && (
                  <div className="p-3">
                    <h3 className="text-xs font-semibold mb-2 uppercase">
                      AI Suggestions
                    </h3>
                    <div className="text-sm space-y-3">
                      <div className="p-2 border rounded bg-muted/30">
                        <div className="font-medium mb-1">
                          Optimize with Hash Map
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Use a hash map to achieve O(n) time complexity instead
                          of nested loops.
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs w-full"
                        >
                          Apply Suggestion
                        </Button>
                      </div>

                      <div className="p-2 border rounded bg-muted/30">
                        <div className="font-medium mb-1">
                          Add Input Validation
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Check for edge cases like empty arrays or invalid
                          inputs.
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs w-full"
                        >
                          Apply Suggestion
                        </Button>
                      </div>

                      <div className="p-2 border rounded bg-muted/30">
                        <div className="font-medium mb-1">
                          Community Solution
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          View a highly-rated solution from the community.
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs w-full"
                        >
                          View Solution
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Middle panel - Code editor */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <CodeEditor
                  initialCode={initialCode}
                  language="javascript"
                  timeLimit={problem.timeLimit}
                />
              </div>

              {/* Bottom panel with tabs for Terminal, Problems, Output */}
              <div className="h-1/3 border-t">
                <Tabs defaultValue="terminal" className="h-full flex flex-col">
                  <div className="px-4 pt-1 border-b bg-muted/20">
                    <TabsList>
                      <TabsTrigger
                        value="terminal"
                        className="flex items-center gap-1"
                      >
                        <Terminal size={14} /> Terminal
                      </TabsTrigger>
                      <TabsTrigger
                        value="problems"
                        className="flex items-center gap-1"
                      >
                        <AlertCircle size={14} /> Problems
                      </TabsTrigger>
                      <TabsTrigger
                        value="output"
                        className="flex items-center gap-1"
                      >
                        <Code size={14} /> Output
                      </TabsTrigger>
                      <TabsTrigger
                        value="performance"
                        className="flex items-center gap-1"
                      >
                        <BarChart size={14} /> Performance
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent
                    value="terminal"
                    className="flex-1 p-0 overflow-auto"
                  >
                    <div className="bg-black text-white font-mono text-sm p-3 h-full">
                      <div className="text-green-500">$ node solution.js</div>
                      <div className="text-white mt-1">[ 0, 1 ]</div>
                      <div className="text-white">[ 1, 2 ]</div>
                      <div className="text-white">[ 0, 1 ]</div>
                      <div className="text-green-500 mt-2">$ git status</div>
                      <div className="text-white mt-1">On branch main</div>
                      <div className="text-white">
                        Changes not staged for commit:
                      </div>
                      <div className="text-white">
                        {" "}
                        (use "git add &lt;file&gt;..." to update what will be
                        committed)
                      </div>
                      <div className="text-white">
                        {" "}
                        (use "git restore &lt;file&gt;..." to discard changes in
                        working directory)
                      </div>
                      <div className="text-white"> modified: solution.js</div>
                      <div className="text-white mt-1">
                        no changes added to commit (use "git add" and/or "git
                        commit -a")
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-blue-400">$</span>
                        <span className="ml-1 animate-pulse">|</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="problems"
                    className="flex-1 p-0 overflow-auto"
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-2 text-amber-500 mb-2">
                        <AlertCircle size={14} />
                        <span className="text-sm">
                          Warning: Variable 'result' is declared but never used.
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-500">
                        <AlertCircle size={14} />
                        <span className="text-sm">
                          Warning: Consider using a more efficient approach for
                          large inputs.
                        </span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="output"
                    className="flex-1 p-0 overflow-auto"
                  >
                    <div className="bg-black text-white font-mono text-sm p-3 h-full">
                      <div className="mb-2">Test Results:</div>
                      <div className="flex items-center gap-2 text-green-500">
                        <span>✓</span>
                        <span>
                          Test Case 1: nums = [2,7,11,15], target = 9 → [0,1]
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-500">
                        <span>✓</span>
                        <span>
                          Test Case 2: nums = [3,2,4], target = 6 → [1,2]
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-green-500">
                        <span>✓</span>
                        <span>
                          Test Case 3: nums = [3,3], target = 6 → [0,1]
                        </span>
                      </div>
                      <div className="mt-2">All test cases passed!</div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="performance"
                    className="flex-1 p-0 overflow-auto"
                  >
                    <div className="p-3">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">
                          Runtime Performance
                        </h3>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm w-24">Time:</span>
                          <div className="flex-1 bg-muted h-2 rounded-full">
                            <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                          </div>
                          <span className="text-sm">
                            24ms (faster than 85%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm w-24">Memory:</span>
                          <div className="flex-1 bg-muted h-2 rounded-full">
                            <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                          </div>
                          <span className="text-sm">
                            42.1MB (better than 70%)
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Complexity Analysis
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Time Complexity:</div>
                          <div>O(n)</div>
                          <div>Space Complexity:</div>
                          <div>O(n)</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right panel - Problem description */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Tabs defaultValue="description" className="h-full flex flex-col">
              <div className="px-4 pt-1 border-b bg-muted/20">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="hints">Hints</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="description"
                className="flex-1 p-0 overflow-auto"
              >
                <ProblemDescription
                  title={problem.title}
                  difficulty={problem.difficulty}
                  timeLimit={problem.timeLimit}
                  description={problem.description}
                  examples={problem.examples}
                  constraints={problem.constraints}
                  progress={35}
                />
              </TabsContent>

              <TabsContent value="hints" className="flex-1 p-4 overflow-auto">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <h3 className="font-medium mb-1">
                      Hint 1: Brute Force Approach
                    </h3>
                    <p className="text-sm">
                      You can use two nested loops to check every possible pair
                      of numbers.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <h3 className="font-medium mb-1">
                      Hint 2: Optimize with Hash Map
                    </h3>
                    <p className="text-sm">
                      Can you use a hash map to reduce the time complexity from
                      O(n²) to O(n)?
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <h3 className="font-medium mb-1">
                      Hint 3: One-pass Hash Map
                    </h3>
                    <p className="text-sm">
                      Try to find the complement (target - current number) in
                      the hash map while iterating through the array.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="submissions"
                className="flex-1 p-4 overflow-auto"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Your Submissions</h3>
                    <Badge variant="outline">3 Attempts</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Accepted
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            2 minutes ago
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-green-500 mr-2">
                            Runtime: 24ms
                          </span>
                          <span className="text-blue-500">Memory: 42.1MB</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View Code
                      </Button>
                    </div>

                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            Wrong Answer
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            10 minutes ago
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-red-500">
                            Failed Test Case 2
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View Code
                      </Button>
                    </div>

                    <div className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            Time Limit Exceeded
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            15 minutes ago
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="text-amber-500">
                            Exceeded 1000ms limit
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View Code
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      {/* Feedback form */}
      <div className="fixed bottom-4 right-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline">
                <MessageSquare size={14} className="mr-1" /> Feedback
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send feedback about this problem</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
