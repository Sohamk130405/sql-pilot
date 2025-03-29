"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  Copy,
  Play,
  Star,
  StarOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QueryRecord {
  id: number;
  query: string;
  dialect: string;
  timestamp: string;
  status: "success" | "error";
  favorite: boolean;
}

export default function QueryHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [queries, setQueries] = useState<QueryRecord[]>([
    {
      id: 1,
      query:
        "SELECT c.name AS category_name, SUM(oi.quantity * oi.price) AS total_revenue FROM orders o JOIN order_items oi ON o.order_id = oi.order_id JOIN products p ON oi.product_id = p.product_id JOIN categories c ON p.category_id = c.category_id WHERE o.order_date >= DATE_TRUNC('quarter', CURRENT_DATE) - INTERVAL '3' MONTH AND o.order_date < DATE_TRUNC('quarter', CURRENT_DATE) GROUP BY c.name ORDER BY total_revenue DESC LIMIT 5;",
      dialect: "Trino",
      timestamp: "2025-03-24 14:32:45",
      status: "success",
      favorite: true,
    },
    {
      id: 2,
      query:
        "SELECT p.name AS product_name, COUNT(oi.order_item_id) AS times_ordered FROM products p JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.name ORDER BY times_ordered DESC LIMIT 10;",
      dialect: "Trino",
      timestamp: "2025-03-24 13:15:22",
      status: "success",
      favorite: false,
    },
    {
      id: 3,
      query:
        "SELECT c.first_name, c.last_name, COUNT(o.order_id) AS order_count, SUM(o.total_amount) AS total_spent FROM customers c JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.first_name, c.last_name ORDER BY total_spent DESC LIMIT 20;",
      dialect: "Spark SQL",
      timestamp: "2025-03-23 16:45:10",
      status: "success",
      favorite: true,
    },
    {
      id: 4,
      query:
        "SELECT DATE_TRUNC('month', o.order_date) AS month, SUM(o.total_amount) AS monthly_revenue FROM orders o WHERE o.order_date >= DATE_TRUNC('year', CURRENT_DATE) GROUP BY DATE_TRUNC('month', o.order_date) ORDER BY month;",
      dialect: "Trino",
      timestamp: "2025-03-22 09:12:33",
      status: "error",
      favorite: false,
    },
    {
      id: 5,
      query:
        "SELECT p.category_id, AVG(i.quantity) AS avg_stock_level FROM products p JOIN inventory i ON p.product_id = i.product_id GROUP BY p.category_id;",
      dialect: "Spark SQL",
      timestamp: "2025-03-21 11:30:15",
      status: "success",
      favorite: false,
    },
  ]);

  const toggleFavorite = (id: number) => {
    setQueries(
      queries.map((q) => (q.id === id ? { ...q, favorite: !q.favorite } : q))
    );
  };

  const filteredQueries = queries.filter(
    (q) =>
      q.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.dialect.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="gradient-text">Query History</CardTitle>
              <CardDescription>
                View and manage your previous SQL queries
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search queries..."
                  className="pl-8 w-[250px] bg-white/10 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="gradient-border">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="gradient-border">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 border-b">Query</th>
                  <th className="text-left p-3 border-b w-[100px]">Dialect</th>
                  <th className="text-left p-3 border-b w-[180px]">
                    Timestamp
                  </th>
                  <th className="text-left p-3 border-b w-[100px]">Status</th>
                  <th className="text-center p-3 border-b w-[150px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.length > 0 ? (
                  filteredQueries.map((query) => (
                    <motion.tr
                      key={query.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b last:border-b-0 hover:bg-muted/50"
                    >
                      <td className="p-3">
                        <div className="font-mono text-xs truncate max-w-[400px]">
                          {query.query}
                        </div>
                      </td>
                      <td className="p-3">{query.dialect}</td>
                      <td className="p-3">{query.timestamp}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            query.status === "success"
                              ? "bg-lime/20 text-lime-dark border border-lime/30"
                              : "bg-destructive/20 text-destructive border border-destructive/30"
                          }`}
                        >
                          {query.status === "success" ? "Success" : "Error"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(query.id)}
                          >
                            {query.favorite ? (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No queries found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
