"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play, Download, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonacoEditor from "@/components/shared/monaco-editor";

export default function NaturalLanguage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");

  const handleGenerate = () => {
    if (!naturalLanguageInput.trim()) return;

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setGeneratedSQL(`-- Find top 5 product categories by sales revenue in the last quarter
SELECT 
  c.name AS category_name,
  SUM(oi.quantity * oi.price) AS total_revenue
FROM 
  orders o
JOIN 
  order_items oi ON o.order_id = oi.order_id
JOIN 
  products p ON oi.product_id = p.product_id
JOIN 
  categories c ON p.category_id = c.category_id
WHERE 
  o.order_date >= DATE_TRUNC('quarter', CURRENT_DATE) - INTERVAL '3' MONTH
  AND o.order_date < DATE_TRUNC('quarter', CURRENT_DATE)
GROUP BY 
  c.name
ORDER BY 
  total_revenue DESC
LIMIT 5;`);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);

    // Simulate API call
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">SQL Query Request</CardTitle>
            <CardDescription>
              Describe the SQL query you need in natural language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Example: Show me the top 5 product categories by sales revenue in the last quarter"
              className="min-h-[200px]"
              value={naturalLanguageInput}
              onChange={(e) => setNaturalLanguageInput(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                SQL Dialect:
              </span>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="trino">Trino</option>
                <option value="spark">Spark SQL</option>
              </select>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !naturalLanguageInput.trim()}
              className="gap-2 bg-gradient-to-r from-purple to-pink hover:opacity-90 transition-opacity"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate SQL
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {hasExecuted ? (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Query Results</CardTitle>
                  <CardDescription>
                    Data returned from your query
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="table">
                <TabsList className="mb-4">
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                </TabsList>
                <TabsContent value="table">
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
                </TabsContent>
                <TabsContent value="chart">
                  <div className="border rounded-md p-4 h-[300px] flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=250&width=400"
                      alt="Bar Chart"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Query Results</CardTitle>
              <CardDescription>
                Execute your query to see results
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
              <div className="text-center text-muted-foreground">
                <p>Query results will appear here</p>
                <p className="text-sm">Generate and execute a query first</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {hasGenerated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Generated SQL</CardTitle>
                  <CardDescription>
                    SQL query based on your request
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-[calc(100vh-350px)] border rounded-md overflow-hidden">
                <MonacoEditor
                  language="sql"
                  value={generatedSQL}
                  onChange={(value) => setGeneratedSQL(value || "")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Explain Query</Button>
              <Button
                className="gap-2 bg-gradient-to-r from-teal to-lime hover:opacity-90 transition-opacity"
                onClick={handleExecute}
                disabled={isExecuting}
              >
                {isExecuting ? (
                  <>Executing...</>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Execute Query
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
