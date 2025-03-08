import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileText, Info, CheckCircle2 } from "lucide-react";

interface ProblemDescriptionProps {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number; // in minutes
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  progress?: number; // 0-100
}

export function ProblemDescription({
  title,
  difficulty,
  timeLimit,
  description,
  examples,
  constraints,
  progress = 0,
}: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
      {/* Problem header */}
      <div className="px-4 py-3 border-b bg-muted/40">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge
            className={`${difficulty === "easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : difficulty === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{timeLimit} minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText size={14} />
            <span>Coding</span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-4 py-2 border-b bg-muted/20">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Your progress</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Problem content */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start px-4 pt-2">
            <TabsTrigger
              value="description"
              className="flex items-center gap-1"
            >
              <Info size={14} /> Description
            </TabsTrigger>
            <TabsTrigger value="hints" className="flex items-center gap-1">
              <CheckCircle2 size={14} /> Hints & Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-4 space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: description }} />

              <h3 className="text-lg font-semibold mt-6 mb-2">Examples</h3>
              {examples.map((example, index) => (
                <div key={index} className="mb-4">
                  <div className="font-semibold text-sm mb-1">
                    Example {index + 1}:
                  </div>
                  <div className="bg-muted p-3 rounded-md mb-2">
                    <div className="mb-2">
                      <span className="font-mono font-bold">Input:</span>{" "}
                      <span className="font-mono">{example.input}</span>
                    </div>
                    <div>
                      <span className="font-mono font-bold">Output:</span>{" "}
                      <span className="font-mono">{example.output}</span>
                    </div>
                  </div>
                  {example.explanation && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {example.explanation}
                    </div>
                  )}
                </div>
              ))}

              <h3 className="text-lg font-semibold mt-6 mb-2">Constraints</h3>
              <ul className="list-disc pl-5 space-y-1">
                {constraints.map((constraint, index) => (
                  <li key={index} className="text-sm">
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="hints" className="p-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Hints</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-sm">
                    <span className="font-semibold">Hint 1:</span> Think about
                    edge cases like empty inputs or very large numbers.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-sm">
                    <span className="font-semibold">Hint 2:</span> Consider
                    using a more efficient algorithm to handle the constraints.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                Testing Strategy
              </h3>
              <p className="text-sm">
                Make sure to test your solution with various inputs, including
                edge cases. The system will evaluate your code against hidden
                test cases as well.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
