"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  GitPullRequest,
  GitCommit,
  Send,
  ThumbsUp,
  ThumbsDown,
  GitMerge,
  GitBranch,
  CheckCircle,
  AlertCircle,
  FileCode,
  Code,
  Diff,
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "teammate";
  content: string;
  timestamp: Date;
  codeSnippet?: string;
}

interface CodeReview {
  id: string;
  file: string;
  line: number;
  comment: string;
  severity: "info" | "suggestion" | "warning" | "error";
  resolved: boolean;
  codeSnippet?: string;
}

interface PullRequest {
  id: string;
  title: string;
  description: string;
  branch: string;
  status: "open" | "merged" | "closed";
  createdAt: Date;
  comments: PRComment[];
}

interface PRComment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  line?: number;
  file?: string;
}

interface VirtualTeammateProps {
  teammateName?: string;
  teammateAvatar?: string;
}

export function VirtualTeammate({
  teammateName = "Alex Kim",
  teammateAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=teammate1",
}: VirtualTeammateProps) {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "teammate",
      content:
        "Hi there! I'm your virtual teammate for this coding test. Feel free to ask me any questions about the problem or discuss your approach.",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: "2",
      sender: "teammate",
      content:
        "For the Two Sum problem, have you considered using a hash map to improve time complexity?",
      timestamp: new Date(Date.now() - 3 * 60000),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [codeReviews, setCodeReviews] = useState<CodeReview[]>([
    {
      id: "1",
      file: "solution.js",
      line: 12,
      comment:
        "Consider using a more descriptive variable name here. Instead of 'i', maybe use 'index' or 'currentIndex'.",
      severity: "suggestion",
      resolved: false,
      codeSnippet: "for (let i = 0; i < nums.length; i++) {",
    },
    {
      id: "2",
      file: "solution.js",
      line: 24,
      comment:
        "This could lead to a potential edge case when the input is empty. Consider adding a check at the beginning of the function.",
      severity: "warning",
      resolved: false,
      codeSnippet: "function twoSum(nums, target) {",
    },
    {
      id: "3",
      file: "solution.js",
      line: 8,
      comment:
        "Using a hash map here would improve the time complexity from O(n²) to O(n).",
      severity: "info",
      resolved: false,
      codeSnippet: "// Nested loop approach",
    },
  ]);

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([
    {
      id: "pr-1",
      title: "Implement Two Sum solution",
      description:
        "This PR implements a solution for the Two Sum problem using a hash map approach for O(n) time complexity.",
      branch: "feature/two-sum-solution",
      status: "open",
      createdAt: new Date(Date.now() - 10 * 60000),
      comments: [
        {
          id: "pr-comment-1",
          author: teammateName,
          content:
            "The approach looks good, but I think we should add some input validation.",
          timestamp: new Date(Date.now() - 5 * 60000),
        },
      ],
    },
  ]);

  const [activePR, setActivePR] = useState<string | null>("pr-1");
  const [prCommentInput, setPrCommentInput] = useState("");

  // Simulate teammate typing
  useEffect(() => {
    const typingTimer = setInterval(() => {
      // Randomly decide if teammate should appear to be typing
      if (Math.random() > 0.7 && !isTyping) {
        setIsTyping(true);

        // Stop typing after a random interval
        setTimeout(
          () => {
            setIsTyping(false);
          },
          Math.random() * 3000 + 1000,
        );
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(typingTimer);
  }, [isTyping]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate teammate typing
    setIsTyping(true);

    // Simulate teammate response after a delay
    setTimeout(
      () => {
        setIsTyping(false);

        // Check if message contains code-related keywords
        const isCodeQuestion =
          /hash|map|complexity|algorithm|function|loop|array|optimize/i.test(
            inputMessage,
          );

        let response;
        if (isCodeQuestion) {
          // Code-related responses with code snippets
          const codeResponses = [
            {
              content:
                "For the Two Sum problem, a hash map approach would be more efficient. Here's how you could implement it:",
              codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null; // No solution found
}`,
            },
            {
              content:
                "The time complexity of the brute force approach is O(n²), but we can optimize it to O(n) using a hash map:",
              codeSnippet: `// O(n) solution
function twoSum(nums, target) {
  const numMap = {};
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (complement in numMap) {
      return [numMap[complement], i];
    }
    
    numMap[nums[i]] = i;
  }
}`,
            },
          ];
          response =
            codeResponses[Math.floor(Math.random() * codeResponses.length)];
        } else {
          // General responses
          const generalResponses = [
            "That's a good approach. Have you considered the time complexity?",
            "I think your solution works, but there might be a more efficient way to handle this.",
            "Good point! I hadn't thought about that edge case.",
            "You might want to add some error handling for invalid inputs.",
            "The algorithm looks correct. Have you tested it with the example cases?",
          ];
          response = {
            content:
              generalResponses[
                Math.floor(Math.random() * generalResponses.length)
              ],
          };
        }

        const teammateMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "teammate",
          content: response.content,
          codeSnippet: response.codeSnippet,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, teammateMessage]);
      },
      1500 + Math.random() * 1000,
    );
  };

  const resolveReview = (id: string) => {
    setCodeReviews(
      codeReviews.map((review) =>
        review.id === id ? { ...review, resolved: true } : review,
      ),
    );
  };

  const addPRComment = () => {
    if (!prCommentInput.trim() || !activePR) return;

    const updatedPRs = pullRequests.map((pr) => {
      if (pr.id === activePR) {
        return {
          ...pr,
          comments: [
            ...pr.comments,
            {
              id: `pr-comment-${Date.now()}`,
              author: "You",
              content: prCommentInput,
              timestamp: new Date(),
            },
          ],
        };
      }
      return pr;
    });

    setPullRequests(updatedPRs);
    setPrCommentInput("");

    // Simulate teammate response to PR comment
    setTimeout(() => {
      const updatedPRsWithResponse = updatedPRs.map((pr) => {
        if (pr.id === activePR) {
          return {
            ...pr,
            comments: [
              ...pr.comments,
              {
                id: `pr-comment-${Date.now() + 1}`,
                author: teammateName,
                content:
                  "Thanks for addressing that. I think we're getting closer to a solution that's ready to merge.",
                timestamp: new Date(),
              },
            ],
          };
        }
        return pr;
      });

      setPullRequests(updatedPRsWithResponse);
    }, 2000);
  };

  const mergePullRequest = (prId: string) => {
    setPullRequests(
      pullRequests.map((pr) =>
        pr.id === prId ? { ...pr, status: "merged" } : pr,
      ),
    );
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-muted/40">
        <div className="flex items-center gap-3">
          <Image
            src={teammateAvatar}
            alt={teammateName}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium">{teammateName}</h3>
            <p className="text-xs text-muted-foreground">Virtual Teammate</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start px-4 pt-2">
          <TabsTrigger value="chat" className="flex items-center gap-1">
            <MessageSquare size={14} /> Chat
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-1">
            <Code size={14} /> Code Review
          </TabsTrigger>
          <TabsTrigger value="pr" className="flex items-center gap-1">
            <GitPullRequest size={14} /> Pull Requests
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{message.content}</p>

                  {/* Code snippet if present */}
                  {message.codeSnippet && (
                    <div className="mt-2 bg-black rounded p-2 overflow-x-auto">
                      <pre className="text-xs text-white font-mono">
                        {message.codeSnippet}
                      </pre>
                    </div>
                  )}

                  <p className="text-xs text-right mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Code Review Tab */}
        <TabsContent value="review" className="flex-1 overflow-auto p-0">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Code Review Comments</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                <GitCommit size={12} /> Latest Commit
              </Badge>
            </div>

            {codeReviews.length > 0 ? (
              <div className="space-y-3">
                {codeReviews.map((review) => (
                  <div
                    key={review.id}
                    className={`border rounded-md p-3 ${review.resolved ? "opacity-60" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${review.severity === "info" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : review.severity === "suggestion" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : review.severity === "warning" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                        >
                          {review.severity.charAt(0).toUpperCase() +
                            review.severity.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {review.file}:{review.line}
                        </span>
                      </div>
                      {!review.resolved && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resolveReview(review.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>

                    {/* Code snippet */}
                    {review.codeSnippet && (
                      <div className="bg-muted/50 rounded p-2 mb-2 font-mono text-xs overflow-x-auto">
                        <code>{review.codeSnippet}</code>
                      </div>
                    )}

                    <p className="text-sm">{review.comment}</p>

                    {/* Response area for unresolved comments */}
                    {!review.resolved && (
                      <div className="mt-2 pt-2 border-t">
                        <div className="flex gap-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <ThumbsUp size={12} className="mr-1" /> Agree
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <ThumbsDown size={12} className="mr-1" /> Disagree
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No code review comments yet.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Pull Requests Tab */}
        <TabsContent value="pr" className="flex-1 overflow-auto p-0">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Pull Requests</h3>
              <Button variant="outline" size="sm">
                <GitBranch size={14} className="mr-1" /> New PR
              </Button>
            </div>

            {pullRequests.length > 0 ? (
              <div className="space-y-4">
                {/* PR List */}
                <div className="space-y-2">
                  {pullRequests.map((pr) => (
                    <div
                      key={pr.id}
                      className={`border rounded-md p-3 cursor-pointer hover:bg-muted/50 ${pr.id === activePR ? "border-primary bg-muted/30" : ""}`}
                      onClick={() => setActivePR(pr.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <GitPullRequest
                              size={16}
                              className={
                                pr.status === "merged"
                                  ? "text-purple-500"
                                  : pr.status === "closed"
                                    ? "text-red-500"
                                    : "text-green-500"
                              }
                            />
                            <span className="font-medium">{pr.title}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {pr.branch} • Created{" "}
                            {pr.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                        <Badge
                          variant={
                            pr.status === "merged"
                              ? "secondary"
                              : pr.status === "closed"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {pr.status === "merged"
                            ? "Merged"
                            : pr.status === "closed"
                              ? "Closed"
                              : "Open"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active PR Details */}
                {activePR && (
                  <div className="border rounded-md p-4">
                    {(() => {
                      const pr = pullRequests.find((p) => p.id === activePR);
                      if (!pr) return null;

                      return (
                        <>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-lg">
                                {pr.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Branch: {pr.branch}</span>
                                <span>•</span>
                                <span>
                                  Status:{" "}
                                  {pr.status.charAt(0).toUpperCase() +
                                    pr.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            {pr.status === "open" && (
                              <Button
                                size="sm"
                                onClick={() => mergePullRequest(pr.id)}
                              >
                                <GitMerge size={14} className="mr-1" /> Merge PR
                              </Button>
                            )}
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">
                              Description
                            </h4>
                            <div className="bg-muted/30 rounded-md p-3 text-sm">
                              {pr.description}
                            </div>
                          </div>

                          {/* File changes */}
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">
                              Changes
                            </h4>
                            <div className="border rounded-md">
                              <div className="flex items-center justify-between p-2 border-b bg-muted/30">
                                <div className="flex items-center gap-2">
                                  <FileCode size={14} />
                                  <span className="text-sm font-medium">
                                    solution.js
                                  </span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  <Diff size={12} className="mr-1" /> +15 -2
                                </Badge>
                              </div>
                              <div className="p-2 bg-muted/10 font-mono text-xs overflow-x-auto">
                                <pre className="whitespace-pre">{`@@ -1,6 +1,19 @@
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
+  // Check for invalid inputs
+  if (!nums || nums.length < 2) {
+    return [];
+  }
+
+  // Use a hash map for O(n) time complexity
+  const map = new Map();
+  
+  for (let i = 0; i < nums.length; i++) {
+    const complement = target - nums[i];
+    
+    if (map.has(complement)) {
+      return [map.get(complement), i];
+    }
+    
+    map.set(nums[i], i);
+  }
+  
+  return []; // No solution found
}`}</pre>
                              </div>
                            </div>
                          </div>

                          {/* Comments */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Comments ({pr.comments.length})
                            </h4>
                            <div className="space-y-3 mb-3">
                              {pr.comments.map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={
                                        comment.author === teammateName
                                          ? teammateAvatar
                                          : "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                                      }
                                    />
                                    <AvatarFallback>
                                      {comment.author[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-muted/30 rounded-md p-3">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-sm">
                                          {comment.author}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {comment.timestamp.toLocaleTimeString(
                                            [],
                                            {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            },
                                          )}
                                        </span>
                                      </div>
                                      <p className="text-sm">
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Add comment */}
                            {pr.status === "open" && (
                              <div className="flex flex-col gap-2">
                                <Textarea
                                  placeholder="Add a comment..."
                                  value={prCommentInput}
                                  onChange={(e) =>
                                    setPrCommentInput(e.target.value)
                                  }
                                  className="min-h-[80px]"
                                />
                                <div className="flex justify-end">
                                  <Button size="sm" onClick={addPRComment}>
                                    Comment
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pull requests yet.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
