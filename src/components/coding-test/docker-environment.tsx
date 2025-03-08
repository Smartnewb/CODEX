"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  GitBranch,
  GitPullRequest,
  Server,
  Play,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileCode,
  Layers,
  Package,
  Workflow,
  ArrowUpRight,
} from "lucide-react";

interface DockerEnvironmentProps {
  environmentName?: string;
  environmentVersion?: string;
  isLoading?: boolean;
}

interface CIBuild {
  id: string;
  status: "running" | "success" | "failed" | "pending";
  startTime: Date;
  endTime?: Date;
  steps: {
    name: string;
    status: "running" | "success" | "failed" | "pending";
    logs: string[];
  }[];
}

export function DockerEnvironment({
  environmentName = "Node.js",
  environmentVersion = "18.x",
  isLoading = false,
}: DockerEnvironmentProps) {
  const [activeTab, setActiveTab] = useState("terminal");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isEnvironmentReady, setIsEnvironmentReady] = useState(!isLoading);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [branches, setBranches] = useState(["main", "feature/two-sum"]);
  const [newBranchName, setNewBranchName] = useState("");
  const [ciBuilds, setCiBuilds] = useState<CIBuild[]>([
    {
      id: "build-1",
      status: "success",
      startTime: new Date(Date.now() - 30 * 60000),
      endTime: new Date(Date.now() - 28 * 60000),
      steps: [
        {
          name: "Install Dependencies",
          status: "success",
          logs: [
            "Installing dependencies...",
            "npm install completed successfully",
          ],
        },
        {
          name: "Lint",
          status: "success",
          logs: ["Running ESLint...", "No linting errors found"],
        },
        {
          name: "Test",
          status: "success",
          logs: ["Running tests...", "All tests passed"],
        },
        {
          name: "Build",
          status: "success",
          logs: ["Building project...", "Build completed successfully"],
        },
      ],
    },
  ]);
  const [activeBuild, setActiveBuild] = useState<string | null>("build-1");
  const [isRunningCi, setIsRunningCi] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Simulate environment loading
  useEffect(() => {
    if (isLoading) {
      const steps = [
        "Pulling Docker image: node:18-alpine...",
        "Creating container...",
        "Starting container...",
        "Installing dependencies...",
        "Setting up development environment...",
        "Environment ready!",
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setTerminalOutput((prev) => [...prev, steps[currentStep]]);
          setLoadingProgress(((currentStep + 1) / steps.length) * 100);
          currentStep++;

          if (currentStep === steps.length) {
            setIsEnvironmentReady(true);
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Auto-scroll terminal to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const runCommand = (command: string) => {
    setTerminalOutput((prev) => [...prev, `$ ${command}`]);
    setTerminalInput("");

    // Simulate command execution
    setTimeout(() => {
      let output = "";
      switch (command) {
        case "ls":
          output =
            "index.js  node_modules  package.json  package-lock.json  README.md  solution.js";
          break;
        case "node -v":
          output = `v${environmentVersion}`;
          break;
        case "npm -v":
          output = "9.6.7";
          break;
        case "git status":
          output = `On branch ${currentBranch}\nYour branch is up to date with 'origin/${currentBranch}'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\n\tmodified:   solution.js\n\nno changes added to commit (use "git add" and/or "git commit -a")`;
          break;
        case "git branch":
          output = branches
            .map((branch) =>
              branch === currentBranch ? `* ${branch}` : `  ${branch}`,
            )
            .join("\n");
          break;
        case "node solution.js":
          output =
            "Running solution.js...\n\nTest Case 1: [2,7,11,15], 9 => [0,1] ✓\nTest Case 2: [3,2,4], 6 => [1,2] ✓\nTest Case 3: [3,3], 6 => [0,1] ✓\n\nAll tests passed!";
          break;
        case "npm test":
          output =
            "PASS  ./solution.test.js\n  Two Sum Function\n    ✓ returns indices of the two numbers that add up to target (3ms)\n    ✓ works with negative numbers (1ms)\n    ✓ returns empty array when no solution exists\n\nTest Suites: 1 passed, 1 total\nTests:       3 passed, 3 total\nSnapshots:   0 total\nTime:        1.075s";
          break;
        case "docker ps":
          output =
            'CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                    NAMES\nabc123def456   node:18-alpine   "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes   0.0.0.0:3000->3000/tcp   coding-test-env';
          break;
        case "cat solution.js":
          output = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Check for invalid inputs
  if (!nums || nums.length < 2) {
    return [];
  }

  // Use a hash map for O(n) time complexity
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return []; // No solution found
}

// Example usage:
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6));      // Expected: [1, 2]
console.log(twoSum([3, 3], 6));         // Expected: [0, 1]`;
          break;
        default:
          if (command.startsWith("git checkout ")) {
            const branchName = command.replace("git checkout ", "").trim();
            if (branches.includes(branchName)) {
              setCurrentBranch(branchName);
              output = `Switched to branch '${branchName}'`;
            } else {
              output = `error: pathspec '${branchName}' did not match any file(s) known to git`;
            }
          } else if (command.startsWith("git branch ")) {
            const newBranch = command.replace("git branch ", "").trim();
            if (newBranch && !branches.includes(newBranch)) {
              setBranches([...branches, newBranch]);
              output = `Created branch '${newBranch}'`;
            } else {
              output = `fatal: A branch named '${newBranch}' already exists.`;
            }
          } else {
            output = `Command not found: ${command}`;
          }
      }
      setTerminalOutput((prev) => [...prev, output]);
    }, 500);
  };

  const createNewBranch = () => {
    if (newBranchName && !branches.includes(newBranchName)) {
      setBranches([...branches, newBranchName]);
      setNewBranchName("");
    }
  };

  const runCIPipeline = () => {
    setIsRunningCi(true);

    // Create a new build
    const newBuild: CIBuild = {
      id: `build-${Date.now()}`,
      status: "running",
      startTime: new Date(),
      steps: [
        {
          name: "Install Dependencies",
          status: "running",
          logs: ["Installing dependencies..."],
        },
        {
          name: "Lint",
          status: "pending",
          logs: [],
        },
        {
          name: "Test",
          status: "pending",
          logs: [],
        },
        {
          name: "Build",
          status: "pending",
          logs: [],
        },
      ],
    };

    setCiBuilds([newBuild, ...ciBuilds]);
    setActiveBuild(newBuild.id);

    // Simulate CI pipeline execution
    let currentStep = 0;
    const steps = newBuild.steps;

    const runStep = () => {
      if (currentStep >= steps.length) {
        // All steps completed
        setCiBuilds((prev) => {
          return prev.map((build) => {
            if (build.id === newBuild.id) {
              return {
                ...build,
                status: "success",
                endTime: new Date(),
              };
            }
            return build;
          });
        });
        setIsRunningCi(false);
        return;
      }

      // Update current step to running
      setCiBuilds((prev) => {
        return prev.map((build) => {
          if (build.id === newBuild.id) {
            const updatedSteps = [...build.steps];
            updatedSteps[currentStep] = {
              ...updatedSteps[currentStep],
              status: "running",
            };
            return {
              ...build,
              steps: updatedSteps,
            };
          }
          return build;
        });
      });

      // Simulate step execution
      setTimeout(() => {
        // Mark step as completed
        setCiBuilds((prev) => {
          return prev.map((build) => {
            if (build.id === newBuild.id) {
              const updatedSteps = [...build.steps];
              updatedSteps[currentStep] = {
                ...updatedSteps[currentStep],
                status: "success",
                logs: [
                  ...updatedSteps[currentStep].logs,
                  `${steps[currentStep].name} completed successfully`,
                ],
              };
              return {
                ...build,
                steps: updatedSteps,
              };
            }
            return build;
          });
        });

        // Move to next step
        currentStep++;
        runStep();
      }, 2000);
    };

    // Start the pipeline
    runStep();
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
      {/* Environment header */}
      <div className="px-4 py-3 border-b bg-muted/40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Server size={16} />
            <h3 className="font-medium">
              {environmentName} {environmentVersion}
            </h3>
          </div>
          <div>
            {isEnvironmentReady ? (
              <Badge className={getCustomBadgeClass("success")}>Ready</Badge>
            ) : (
              <Badge className={getCustomBadgeClass("pending")}>
                Setting up...
              </Badge>
            )}
          </div>
        </div>
      </div>

      {!isEnvironmentReady ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md space-y-4">
            <h3 className="text-lg font-medium text-center mb-4">
              Setting up your development environment
            </h3>
            <Progress value={loadingProgress} className="h-2" />
            <div className="bg-black text-white font-mono text-sm p-4 rounded-md h-48 overflow-auto">
              {terminalOutput.map((line, index) => (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="w-full justify-start px-4 pt-2">
            <TabsTrigger value="terminal" className="flex items-center gap-1">
              <Terminal size={14} /> Terminal
            </TabsTrigger>
            <TabsTrigger value="git" className="flex items-center gap-1">
              <GitBranch size={14} /> Git
            </TabsTrigger>
            <TabsTrigger value="ci" className="flex items-center gap-1">
              <GitPullRequest size={14} /> CI/CD
            </TabsTrigger>
          </TabsList>

          <TabsContent value="terminal" className="flex-1 flex flex-col p-0">
            <div
              ref={terminalRef}
              className="flex-1 bg-black text-white font-mono text-sm p-4 overflow-auto"
            >
              {terminalOutput.map((line, index) => (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ))}
            </div>
            <div className="p-3 border-t bg-muted/40">
              <div className="flex gap-2 mb-2">
                <Input
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Enter command..."
                  onKeyDown={(e) =>
                    e.key === "Enter" && runCommand(terminalInput)
                  }
                  className="font-mono text-sm"
                />
                <Button size="sm" onClick={() => runCommand(terminalInput)}>
                  Run
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runCommand("ls")}
                >
                  ls
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runCommand("node -v")}
                >
                  node -v
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runCommand("npm -v")}
                >
                  npm -v
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runCommand("git status")}
                >
                  git status
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => runCommand("node solution.js")}
                >
                  node solution.js
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="git" className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <h3 className="font-medium">Git Repository</h3>
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch size={16} />
                  <span className="font-medium">{currentBranch}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Last commit:</span>
                    <span className="font-mono">a1b2c3d</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remote:</span>
                    <span className="font-mono">origin/{currentBranch}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Branches</h4>
                <div className="border rounded-md divide-y">
                  {branches.map((branch) => (
                    <div
                      key={branch}
                      className={`p-3 flex justify-between items-center cursor-pointer hover:bg-muted/50 ${branch === currentBranch ? "bg-muted/30" : ""}`}
                      onClick={() => runCommand(`git checkout ${branch}`)}
                    >
                      <div className="flex items-center gap-2">
                        <GitBranch size={14} />
                        <span>{branch}</span>
                      </div>
                      {branch === currentBranch && (
                        <Badge className={getCustomBadgeClass("outline")}>
                          Current
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Create a new branch</h4>
                <div className="flex gap-2">
                  <Input
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    placeholder="Branch name"
                  />
                  <Button variant="outline" onClick={createNewBranch}>
                    <GitBranch size={14} className="mr-2" /> Create
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ci" className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">CI/CD Pipeline</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runCIPipeline}
                  disabled={isRunningCi}
                >
                  {isRunningCi ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play size={14} className="mr-2" /> Run Pipeline
                    </>
                  )}
                </Button>
              </div>

              <div className="border rounded-md">
                <div className="p-3 border-b bg-muted/30">
                  <h4 className="font-medium">Build History</h4>
                </div>
                <div className="divide-y">
                  {ciBuilds.map((build) => (
                    <div
                      key={build.id}
                      className={`p-3 cursor-pointer hover:bg-muted/50 ${build.id === activeBuild ? "bg-muted/30" : ""}`}
                      onClick={() => setActiveBuild(build.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {build.status === "running" ? (
                            <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          ) : build.status === "success" ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : build.status === "failed" ? (
                            <XCircle size={16} className="text-red-500" />
                          ) : (
                            <AlertTriangle
                              size={16}
                              className="text-amber-500"
                            />
                          )}
                          <span>Build {build.id.replace("build-", "#")}</span>
                        </div>
                        <Badge
                          className={getCustomBadgeClass(
                            build.status === "success"
                              ? "success"
                              : build.status === "failed"
                                ? "destructive"
                                : build.status === "running"
                                  ? "outline"
                                  : "secondary",
                          )}
                        >
                          {build.status.charAt(0).toUpperCase() +
                            build.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Started: {build.startTime.toLocaleTimeString()}
                        {build.endTime &&
                          ` • Completed: ${build.endTime.toLocaleTimeString()}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeBuild && (
                <div className="border rounded-md">
                  <div className="p-3 border-b bg-muted/30">
                    <h4 className="font-medium">Build Details</h4>
                  </div>
                  <div className="p-3">
                    {(() => {
                      const build = ciBuilds.find((b) => b.id === activeBuild);
                      if (!build) return null;

                      return (
                        <div className="space-y-4">
                          {build.steps.map((step, index) => (
                            <div key={index} className="border rounded-md">
                              <div className="flex justify-between items-center p-3 border-b bg-muted/20">
                                <div className="flex items-center gap-2">
                                  {step.status === "running" ? (
                                    <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                  ) : step.status === "success" ? (
                                    <CheckCircle
                                      size={16}
                                      className="text-green-500"
                                    />
                                  ) : step.status === "failed" ? (
                                    <XCircle
                                      size={16}
                                      className="text-red-500"
                                    />
                                  ) : (
                                    <AlertTriangle
                                      size={16}
                                      className="text-amber-500"
                                    />
                                  )}
                                  <span className="font-medium">
                                    {step.name}
                                  </span>
                                </div>
                                <Badge
                                  className={getCustomBadgeClass(
                                    step.status === "success"
                                      ? "success"
                                      : step.status === "failed"
                                        ? "destructive"
                                        : step.status === "running"
                                          ? "outline"
                                          : "secondary",
                                  )}
                                >
                                  {step.status.charAt(0).toUpperCase() +
                                    step.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="p-3 bg-black text-white font-mono text-xs">
                                {step.logs.length > 0 ? (
                                  <div>
                                    {step.logs.map((log, i) => (
                                      <div key={i} className="mb-1">
                                        {log}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-gray-500">
                                    No logs available
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// Custom badge styling helper function
const getCustomBadgeClass = (variant: string): string => {
  const variantClasses: Record<string, string> = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    warning:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    pending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  return variantClasses[variant] || "";
};
