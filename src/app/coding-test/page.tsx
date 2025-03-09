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
  FolderOpen,
  Search,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

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

export default function CodingTestPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("environment");
  const [activeSideTab, setActiveSideTab] = useState("explorer");
  const [activeEditorTab, setActiveEditorTab] = useState("solution.js");
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [commitMessage, setCommitMessage] = useState("");
  const [files, setFiles] = useState<Record<string, string>>({
    "solution.js": initialCode,
    "test.js": `// Test cases for Two Sum problem
const assert = require('assert');

describe('Two Sum', () => {
  it('should return indices of two numbers that add up to target', () => {
    assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
    assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
    assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]);
  });
});`,
    "README.md": `# Two Sum Problem

This is a coding test implementation for the Two Sum problem.

## Problem Description

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

## Solution Approach

1. Use a hash map to store complements
2. Time Complexity: O(n)
3. Space Complexity: O(n)
`
  });

  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showRunMenu, setShowRunMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["코딩 테스트"]));

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 파일 내용 업데이트 함수
  const updateFileContent = (filename: string, content: string) => {
    setFiles(prev => ({
      ...prev,
      [filename]: content
    }));
  };

  // 코드 에디터 변경 핸들러
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    updateFileContent(activeEditorTab, newCode);
  };

  // 메뉴 컴포넌트
  const Menu = ({ items, show, onClose }: { items: any[]; show: boolean; onClose: () => void }) => {
    if (!show) return null;
    
    return (
      <div className="absolute top-full left-0 mt-1 bg-background border rounded-md shadow-lg z-50 min-w-[200px]">
        <div className="py-1">
          {items.map((item, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center justify-between whitespace-nowrap"
              onClick={() => {
                if (item.action) item.action();
                onClose();
              }}
            >
              <span className="mr-4">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

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

  // 코드 실행 함수
  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    
    try {
      // 실제 환경에서는 서버로 코드를 보내 실행하게 됩니다
      const testCases = [
        { nums: [2, 7, 11, 15], target: 9 },
        { nums: [3, 2, 4], target: 6 },
        { nums: [3, 3], target: 6 }
      ];

      setTerminalHistory(prev => [...prev, `$ node solution.js`]);
      
      // 실행 결과 시뮬레이션
      setTimeout(() => {
        const results = [
          "[0, 1]",
          "[1, 2]",
          "[0, 1]"
        ];
        
        setOutput(results);
        setTerminalHistory(prev => [...prev, ...results, "코드 실행이 완료되었습니다."]);
        setIsRunning(false);
      }, 1000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.';
      setOutput([`Error: ${errorMessage}`]);
      setTerminalHistory(prev => [...prev, `Error: ${errorMessage}`]);
      setIsRunning(false);
    }
  };

  // 코드 저장 함수
  const saveCode = async () => {
    try {
      // 실제 환경에서는 서버에 저장하게 됩니다
      localStorage.setItem('savedCode', code);
      setTerminalHistory(prev => [...prev, "$ git add solution.js", "$ git commit -m 'Update solution'"]);
      
      // 저장 성공 메시지를 터미널에 표시
      setTerminalHistory(prev => [...prev, "코드가 성공적으로 저장되었습니다."]);
    } catch (error) {
      setTerminalHistory(prev => [...prev, "코드 저장 중 오류가 발생했습니다."]);
    }
  };

  // 코드 제출 함수
  const submitSolution = async () => {
    setIsSubmitting(true);
    try {
      // 실제 환경에서는 서버로 제출하게 됩니다
      await runCode();
      setTerminalHistory(prev => [...prev, "제출이 완료되었습니다."]);
      setShowSubmitModal(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.';
      setOutput([`Error: ${errorMessage}`]);
      setTerminalHistory(prev => [...prev, `Error: ${errorMessage}`]);
    }
    setIsSubmitting(false);
  };

  // 결과 페이지로 이동
  const goToResults = () => {
    router.push('/result_for_developer');
  };

  // 키보드 단축키 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case 'Enter':
            e.preventDefault();
            if (e.shiftKey) {
              submitSolution();
            } else {
              runCode();
            }
            break;
          case 's':
            e.preventDefault();
            saveCode();
            break;
          case '`':
            e.preventDefault();
            setActiveTab(prev => prev === 'terminal' ? 'output' : 'terminal');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 파일 선택 핸들러
  const handleFileSelect = (filename: string) => {
    setActiveEditorTab(filename);
    setCode(files[filename]);
  };

  // Git 커밋 핸들러
  const handleCommit = () => {
    if (!commitMessage.trim()) return;
    
    setTerminalHistory(prev => [
      ...prev,
      `$ git add .`,
      `$ git commit -m "${commitMessage}"`,
      `[main ${Math.random().toString(36).substring(7)}] ${commitMessage}`,
      ` 1 file changed, 5 insertions(+), 2 deletions(-)`
    ]);
    
    setCommitMessage("");
  };

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // 파일 내용에서 검색
    const results = Object.entries(files).filter(([filename, content]) => 
      filename.toLowerCase().includes(query.toLowerCase()) ||
      content.toLowerCase().includes(query.toLowerCase())
    ).map(([filename]) => filename);
    
    setSearchResults(results);
  };

  // 폴더 토글 핸들러
  const toggleFolder = (folderName: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(folderName)) {
      newExpandedFolders.delete(folderName);
    } else {
      newExpandedFolders.add(folderName);
    }
    setExpandedFolders(newExpandedFolders);
  };

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
            <div className="ml-4 flex space-x-2 text-xs relative">
              <button 
                className={`hover:text-primary px-2 py-1 relative ${showFileMenu ? 'bg-muted' : ''}`}
                onClick={() => {
                  setShowFileMenu(!showFileMenu);
                  setShowEditMenu(false);
                  setShowViewMenu(false);
                  setShowRunMenu(false);
                  setShowHelpMenu(false);
                }}
              >
                파일
                <Menu 
                  items={[
                    { label: "새 파일", shortcut: "Ctrl+N" },
                    { label: "파일 열기", shortcut: "Ctrl+O" },
                    { label: "저장", shortcut: "Ctrl+S", action: saveCode },
                    { label: "다른 이름으로 저장", shortcut: "Ctrl+Shift+S" },
                    { label: "종료", shortcut: "Alt+F4" },
                  ]} 
                  show={showFileMenu} 
                  onClose={() => setShowFileMenu(false)} 
                />
              </button>
              <button 
                className={`hover:text-primary px-2 py-1 relative ${showEditMenu ? 'bg-muted' : ''}`}
                onClick={() => {
                  setShowEditMenu(!showEditMenu);
                  setShowFileMenu(false);
                  setShowViewMenu(false);
                  setShowRunMenu(false);
                  setShowHelpMenu(false);
                }}
              >
                편집
                <Menu 
                  items={[
                    { label: "실행 취소", shortcut: "Ctrl+Z" },
                    { label: "다시 실행", shortcut: "Ctrl+Y" },
                    { label: "잘라내기", shortcut: "Ctrl+X" },
                    { label: "복사", shortcut: "Ctrl+C" },
                    { label: "붙여넣기", shortcut: "Ctrl+V" },
                  ]} 
                  show={showEditMenu} 
                  onClose={() => setShowEditMenu(false)} 
                />
              </button>
              <button 
                className={`hover:text-primary px-2 py-1 relative ${showViewMenu ? 'bg-muted' : ''}`}
                onClick={() => {
                  setShowViewMenu(!showViewMenu);
                  setShowFileMenu(false);
                  setShowEditMenu(false);
                  setShowRunMenu(false);
                  setShowHelpMenu(false);
                }}
              >
                보기
                <Menu 
                  items={[
                    { label: "탐색기", shortcut: "Ctrl+Shift+E" },
                    { label: "검색", shortcut: "Ctrl+Shift+F" },
                    { label: "소스 제어", shortcut: "Ctrl+Shift+G" },
                    { label: "터미널", shortcut: "Ctrl+`" },
                  ]} 
                  show={showViewMenu} 
                  onClose={() => setShowViewMenu(false)} 
                />
              </button>
              <button 
                className={`hover:text-primary px-2 py-1 relative ${showRunMenu ? 'bg-muted' : ''}`}
                onClick={() => {
                  setShowRunMenu(!showRunMenu);
                  setShowFileMenu(false);
                  setShowEditMenu(false);
                  setShowViewMenu(false);
                  setShowHelpMenu(false);
                }}
              >
                실행
                <Menu 
                  items={[
                    { label: "코드 실행", shortcut: "Ctrl+Enter", action: runCode },
                    { label: "디버그", shortcut: "F5" },
                    { label: "제출", shortcut: "Ctrl+Shift+Enter", action: submitSolution },
                  ]} 
                  show={showRunMenu} 
                  onClose={() => setShowRunMenu(false)} 
                />
              </button>
              <button 
                className={`hover:text-primary px-2 py-1 relative ${showHelpMenu ? 'bg-muted' : ''}`}
                onClick={() => {
                  setShowHelpMenu(!showHelpMenu);
                  setShowFileMenu(false);
                  setShowEditMenu(false);
                  setShowViewMenu(false);
                  setShowRunMenu(false);
                }}
              >
                도움말
                <Menu 
                  items={[
                    { label: "문서", shortcut: "F1" },
                    { label: "단축키", action: () => setShowKeyboardShortcuts(true) },
                    { label: "피드백", action: () => setShowFeedbackForm(true) },
                  ]} 
                  show={showHelpMenu} 
                  onClose={() => setShowHelpMenu(false)} 
                />
              </button>
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
                  <p>단축키</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/dashboard/assessment-history">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft size={16} className="mr-2" /> 평가 이력으로 돌아가기
            </Button>
          </Link>
        </div>
        {/* VS Code-style tabs for open files */}
        <div className="flex items-center border-b bg-muted/20 px-2">
          <div className="flex">
            {Object.keys(files).map((filename) => (
              <button
                key={filename}
                className={`px-3 py-1 text-xs flex items-center gap-1 ${
                  activeEditorTab === filename
                    ? "bg-background border-t border-l border-r border-b-0"
                    : "text-muted-foreground"
                }`}
                onClick={() => handleFileSelect(filename)}
              >
                <FileCode size={14} />
                {filename}
                {activeEditorTab === filename && (
                  <span className="ml-2 text-muted-foreground">×</span>
                )}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={saveCode}
                  >
                    <Save size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>저장 (Ctrl+S)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={runCode}
                    disabled={isRunning}
                  >
                    <Play size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>코드 실행 (Ctrl+Enter)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={submitSolution}
                    disabled={isSubmitting}
                  >
                    <Send size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>제출 (Ctrl+Shift+Enter)</p>
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
                        <FolderOpen size={20} />
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
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-semibold uppercase">탐색기</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <FileCode size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <FolderOpen size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ArrowLeft size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="mb-2">
                        <div 
                          className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded"
                          onClick={() => toggleFolder("코딩 테스트")}
                        >
                          <span className="text-xs">{expandedFolders.has("코딩 테스트") ? "▼" : "▶"}</span>
                          <span className="font-semibold">코딩 테스트</span>
                        </div>
                        {expandedFolders.has("코딩 테스트") && (
                          <div className="pl-4 flex flex-col gap-1 mt-1">
                            {Object.keys(files).map((filename) => (
                              <div
                                key={filename}
                                className={`flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded ${
                                  activeEditorTab === filename
                                    ? "bg-muted/70 text-primary"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() => handleFileSelect(filename)}
                              >
                                <FileCode size={14} /> {filename}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeSideTab === "search" && (
                  <div className="p-3">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full px-3 py-1.5 text-sm bg-muted/30 border rounded"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    {searchQuery && (
                      <div className="text-sm">
                        <div className="text-xs text-muted-foreground mb-2">
                          {searchResults.length}개의 결과
                        </div>
                        {searchResults.map((filename) => (
                          <div
                            key={filename}
                            className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1.5 rounded"
                            onClick={() => handleFileSelect(filename)}
                          >
                            <FileCode size={14} />
                            <div>
                              <div className="font-medium">{filename}</div>
                              <div className="text-xs text-muted-foreground">코딩 테스트</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeSideTab === "git" && (
                  <div className="p-3">
                    <h3 className="text-xs font-semibold mb-2 uppercase">소스 제어</h3>
                    <div className="text-sm">
                      <div className="mb-3">
                        <div className="font-semibold mb-2">변경사항</div>
                        <div className="pl-4 flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-muted-foreground hover:bg-muted/50 px-2 py-1 rounded cursor-pointer">
                            <span className="text-green-500">M</span> solution.js
                            <span className="ml-auto text-xs">+15 -5</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground hover:bg-muted/50 px-2 py-1 rounded cursor-pointer">
                            <span className="text-green-500">M</span> test.js
                            <span className="ml-auto text-xs">+3 -1</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="커밋 메시지 입력 (Enter to commit)"
                          className="w-full text-xs p-2 bg-muted/30 border rounded"
                          value={commitMessage}
                          onChange={(e) => setCommitMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && commitMessage.trim()) {
                              handleCommit();
                            }
                          }}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={handleCommit}
                            disabled={!commitMessage.trim()}
                          >
                            Commit
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Discard
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          마지막 커밋: 5분 전
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSideTab === "suggestions" && (
                  <div className="p-3">
                    <h3 className="text-xs font-semibold mb-2 uppercase">AI Suggestions</h3>
                    <div className="text-sm space-y-3">
                      <div className="p-3 border rounded bg-muted/30">
                        <div className="font-medium mb-1 flex items-center justify-between">
                          <span>코드 최적화 제안</span>
                          <Badge variant="outline" className="text-xs">
                            성능
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          해시맵을 사용하여 시간 복잡도를 O(n²)에서 O(n)으로 개선할 수 있습니다.
                        </p>
                        <div className="text-xs bg-muted/50 p-2 rounded mb-2 font-mono">
                          {`const map = new Map();
for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
        return [map.get(complement), i];
    }
    map.set(nums[i], i);
}`}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs flex-1"
                          >
                            적용하기
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs"
                          >
                            무시
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 border rounded bg-muted/30">
                        <div className="font-medium mb-1 flex items-center justify-between">
                          <span>입력값 검증</span>
                          <Badge variant="outline" className="text-xs">
                            안정성
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          배열이 비어있거나 유효하지 않은 입력에 대한 처리가 필요합니다.
                        </p>
                        <div className="text-xs bg-muted/50 p-2 rounded mb-2 font-mono">
                          {`if (!nums || nums.length < 2) {
    throw new Error("Invalid input");
}`}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs w-full"
                        >
                          적용하기
                        </Button>
                      </div>

                      <div className="p-3 border rounded bg-muted/30">
                        <div className="font-medium mb-1 flex items-center justify-between">
                          <span>테스트 케이스 추가</span>
                          <Badge variant="outline" className="text-xs">
                            테스트
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          엣지 케이스에 대한 테스트를 추가하는 것이 좋습니다.
                        </p>
                        <div className="text-xs bg-muted/50 p-2 rounded mb-2 font-mono">
                          {`test("edge cases", () => {
    expect(() => twoSum([], 0)).toThrow();
    expect(twoSum([1], 1)).toBeNull();
});`}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs w-full"
                        >
                          테스트 추가
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
                  initialCode={files[activeEditorTab]}
                  language={activeEditorTab.endsWith('.js') ? 'javascript' : 'markdown'}
                  timeLimit={problem.timeLimit}
                  onChange={(newCode) => {
                    setCode(newCode);
                    updateFileContent(activeEditorTab, newCode);
                  }}
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
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowFeedbackForm(true)}
              >
                <MessageSquare size={14} className="mr-1" /> 피드백
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>이 문제에 대한 피드백 보내기</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* 제출 완료 모달 */}
      <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>제출 완료</DialogTitle>
            <DialogDescription>
              코드가 성공적으로 제출되었습니다. 결과를 확인하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
              닫기
            </Button>
            <Button onClick={goToResults}>
              결과 확인하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
