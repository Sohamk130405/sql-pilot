"use client";

import { useState } from "react";
import { Send, ArrowRight, MessageSquare, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createGeminiSQLGenerator, SQLGenerationResult } from "@/lib/gemini";

export default function TalkToDatabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "system",
        content:
          "Welcome to SQLPilot! Ask me any question about your data in natural language, and I'll generate the SQL query for you.",
      },
    ]
  );
  const [input, setInput] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [hasResults, setHasResults] = useState(false);
  const [queryExplanation, setQueryExplanation] = useState("");
  const [isExplanationDialogOpen, setIsExplanationDialogOpen] = useState(false);

  // Initialize Gemini SQL Generator
  const sqlGenerator = createGeminiSQLGenerator();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setHasResults(false);

    try {
      const result: SQLGenerationResult = await sqlGenerator.generateSQL(input);

      if (result.error) {
        throw new Error(result.error);
      }

      const botResponse = {
        role: "assistant",
        content: "I've generated a SQL query based on your request.",
      };

      setMessages((prev) => [...prev, botResponse]);
      setGeneratedSQL(result.query);
    } catch (error) {
      console.error("Error generating SQL:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I couldn't generate a SQL query. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainQuery = async () => {
    try {
      const explanation = await sqlGenerator.explainQuery(generatedSQL);
      setQueryExplanation(explanation);
      setIsExplanationDialogOpen(true);
    } catch (error) {
      console.error("Error explaining query:", error);
    }
  };

  const handleExecute = () => {
    // In a real-world scenario, this would connect to your actual database
    // For now, we'll just simulate results
    setHasResults(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        <Card className="lg:col-span-1 flex flex-col glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">
              Chat with SQL Assistant
            </CardTitle>
            <CardDescription>Ask questions in natural language</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/10 backdrop-blur-sm border border-white/30"
                    } p-3 rounded-lg shadow-sm`}
                  >
                    {message.role !== "user" && (
                      <Bot className="h-5 w-5 mt-1" />
                    )}
                    <div>{message.content}</div>
                    {message.role === "user" && (
                      <User className="h-5 w-5 mt-1" />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className="h-2 w-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: `${dot * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask a question about your data..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Generated SQL & Results</CardTitle>
            <CardDescription>
              View and execute the generated SQL query
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Tabs defaultValue="query">
              <TabsList className="mb-4">
                <TabsTrigger value="query">SQL Query</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              <TabsContent value="query" className="h-full">
                {generatedSQL ? (
                  <div className="relative h-[calc(100vh-350px)] border rounded-md overflow-hidden">
                    <pre className="p-4 overflow-auto bg-gray-100 dark:bg-gray-800 h-full">
                      {generatedSQL}
                    </pre>
                  </div>
                ) : (
                  <div className="h-[calc(100vh-350px)] flex items-center justify-center border-2 border-dashed rounded-md">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Ask a question to generate SQL</p>
                      <p className="text-sm mt-2">
                        Example: "Show me the top 5 product categories by sales
                        revenue in the last quarter"
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="results">
                {hasResults ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-2 border-b">
                            category_name
                          </th>
                          <th className="text-left p-2 border-b">
                            total_revenue
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border-b">Electronics</td>
                          <td className="p-2 border-b">$245,678.90</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Clothing</td>
                          <td className="p-2 border-b">$187,432.50</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Home & Kitchen</td>
                          <td className="p-2 border-b">$156,789.20</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Sports & Outdoors</td>
                          <td className="p-2 border-b">$98,765.40</td>
                        </tr>
                        <tr>
                          <td className="p-2">Books</td>
                          <td className="p-2">$76,543.20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="h-[calc(100vh-350px)] flex items-center justify-center border-2 border-dashed rounded-md">
                    <div className="text-center text-muted-foreground">
                      <p>Execute your query to see results</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <Button
              variant="outline"
              onClick={handleExplainQuery}
              disabled={!generatedSQL}
            >
              Explain Query
            </Button>
            <Button
              onClick={handleExecute}
              disabled={!generatedSQL}
              className="gap-2"
            >
              Execute Query <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Query Explanation Dialog */}
      <Dialog
        open={isExplanationDialogOpen}
        onOpenChange={setIsExplanationDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>SQL Query Explanation</DialogTitle>
            <DialogDescription>
              Detailed breakdown of the generated SQL query
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[500px] overflow-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p>{queryExplanation}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
