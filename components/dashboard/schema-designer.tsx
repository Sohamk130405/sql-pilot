"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lightbulb, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SchemaDesigner() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const [generatedSchema, setGeneratedSchema] = useState("");
  const [showTips, setShowTips] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  const [activeTab, setActiveTab] = useState("ddl");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const examples = [
    "Create a schema for an e-commerce platform with products, categories, customers, and orders",
    "Design a database for a blog with users, posts, comments, and tags",
    "Build a schema for a hospital management system with patients, doctors, appointments, and medical records",
    "Create an analytics database optimized for OLAP queries on customer behavior",
  ];

  const tips = [
    "Be specific about relationships between entities",
    "Mention performance requirements (OLTP vs OLAP)",
    "Specify data types and constraints when needed",
    "Include partitioning strategies for large tables",
  ];

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (naturalLanguageInput) {
      setIsTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [naturalLanguageInput]);

  const handleGenerate = () => {
    if (!naturalLanguageInput.trim()) return;

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setGeneratedSchema(`CREATE TABLE categories (
  category_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  category_id INT REFERENCES categories(category_id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) PARTITIONED BY (category_id);

CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT REFERENCES customers(customer_id),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  shipping_address TEXT,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) PARTITIONED BY (order_date);

CREATE TABLE order_items (
  order_item_id INT PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  product_id INT REFERENCES products(product_id),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
  inventory_id INT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  warehouse_id INT,
  quantity INT NOT NULL,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_inventory_product ON inventory(product_id);

-- Create a view for product inventory
CREATE VIEW product_inventory_view AS
SELECT 
  p.product_id,
  p.name,
  p.category_id,
  c.name as category_name,
  SUM(i.quantity) as total_quantity
FROM 
  products p
JOIN 
  categories c ON p.category_id = c.category_id
LEFT JOIN 
  inventory i ON p.product_id = i.product_id
GROUP BY 
  p.product_id, p.name, p.category_id, c.name;`);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleClick = (example: string) => {
    setNaturalLanguageInput(example);
    setShowExamples(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-dark-100/50 backdrop-blur-md border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-display font-bold neon-gradient-text">
                Schema Requirements
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-white"
                      onClick={() => setShowTips(!showTips)}
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle writing tips</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Describe your database needs in natural language
            </p>
          </div>

          <div className="p-6">
            <div className="relative">
              <Textarea
                placeholder="Example: Create a schema for an e-commerce platform with products, categories, customers, and orders. Include tables for inventory tracking and optimize for OLAP queries on sales data."
                className="min-h-[200px] bg-dark-200/50 border-white/10 focus:border-neon-purple transition-all resize-none"
                value={naturalLanguageInput}
                onChange={(e) => setNaturalLanguageInput(e.target.value)}
              />

              {isTyping && (
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  Typing...
                </div>
              )}

              <AnimatePresence>
                {showExamples && (
                  <motion.div
                    className="absolute inset-0 bg-dark-100/95 backdrop-blur-md rounded-md border border-white/10 p-4 overflow-auto custom-scrollbar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Example Prompts</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setShowExamples(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {examples.map((example, index) => (
                        <motion.button
                          key={index}
                          className="w-full text-left p-3 rounded-md bg-dark-200/50 hover:bg-dark-200 border border-white/5 hover:border-white/10 transition-colors"
                          onClick={() => handleExampleClick(example)}
                          whileHover={{ x: 5 }}
                        >
                          {example}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {showTips && (
                <motion.div
                  className="mt-4 bg-dark-200/50 rounded-md p-4 border border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-neon-yellow" />
                    <h4 className="font-medium text-sm">Writing Tips</h4>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-neon-teal">•</span>
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex justify-between">
            <Button
              variant="outline"
              className="neon-border bg-dark-200/50"
              onClick={() => setShowExamples(true)}
            >
              Load Example
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !naturalLanguageInput.trim()}
              className="neon-gradient-bg hover:opacity-90 transition-opacity"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Schema
                </div>
              )}
            </Button>
          </div>
        </Card>

        <Card className="bg-dark-100/50 backdrop-blur-md border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-display font-bold neon-gradient-text">
              Schema Visualization
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Visual representation of your database schema
            </p>
          </div>

          <div className="p-6">
            <div className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-white/10 rounded-md">
              {hasGenerated ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full"
                >
                  <div className="relative w-full h-[300px] overflow-hidden">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 800 600"
                      className="text-white"
                    >
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill="currentColor"
                          />
                        </marker>
                      </defs>

                      {/* Categories Table */}
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <rect
                          x="50"
                          y="50"
                          width="200"
                          height="120"
                          rx="5"
                          fill="#1E1E2E"
                          stroke="#9D4EDD"
                          strokeWidth="2"
                        />
                        <text
                          x="150"
                          y="30"
                          textAnchor="middle"
                          className="text-neon-purple font-bold"
                        >
                          categories
                        </text>
                        <line
                          x1="70"
                          y1="80"
                          x2="230"
                          y2="80"
                          stroke="white"
                          strokeOpacity="0.3"
                        />
                        <text x="75" y="70" className="text-xs">
                          category_id (PK)
                        </text>
                        <text x="75" y="100" className="text-xs">
                          name
                        </text>
                        <text x="75" y="120" className="text-xs">
                          description
                        </text>
                        <text x="75" y="140" className="text-xs">
                          timestamps
                        </text>
                      </motion.g>

                      {/* Products Table */}
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <rect
                          x="350"
                          y="50"
                          width="200"
                          height="160"
                          rx="5"
                          fill="#1E1E2E"
                          stroke="#00B4D8"
                          strokeWidth="2"
                        />
                        <text
                          x="450"
                          y="30"
                          textAnchor="middle"
                          className="text-neon-blue font-bold"
                        >
                          products
                        </text>
                        <line
                          x1="370"
                          y1="80"
                          x2="530"
                          y2="80"
                          stroke="white"
                          strokeOpacity="0.3"
                        />
                        <text x="375" y="70" className="text-xs">
                          product_id (PK)
                        </text>
                        <text x="375" y="100" className="text-xs">
                          category_id (FK)
                        </text>
                        <text x="375" y="120" className="text-xs">
                          name
                        </text>
                        <text x="375" y="140" className="text-xs">
                          price
                        </text>
                        <text x="375" y="160" className="text-xs">
                          stock_quantity
                        </text>
                        <text x="375" y="180" className="text-xs">
                          timestamps
                        </text>
                      </motion.g>

                      {/* Customers Table */}
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <rect
                          x="50"
                          y="250"
                          width="200"
                          height="140"
                          rx="5"
                          fill="#1E1E2E"
                          stroke="#FF3CA2"
                          strokeWidth="2"
                        />
                        <text
                          x="150"
                          y="230"
                          textAnchor="middle"
                          className="text-neon-pink font-bold"
                        >
                          customers
                        </text>
                        <line
                          x1="70"
                          y1="280"
                          x2="230"
                          y2="280"
                          stroke="white"
                          strokeOpacity="0.3"
                        />
                        <text x="75" y="270" className="text-xs">
                          customer_id (PK)
                        </text>
                        <text x="75" y="300" className="text-xs">
                          first_name
                        </text>
                        <text x="75" y="320" className="text-xs">
                          last_name
                        </text>
                        <text x="75" y="340" className="text-xs">
                          email
                        </text>
                        <text x="75" y="360" className="text-xs">
                          timestamps
                        </text>
                      </motion.g>

                      {/* Orders Table */}
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <rect
                          x="350"
                          y="250"
                          width="200"
                          height="140"
                          rx="5"
                          fill="#1E1E2E"
                          stroke="#00F5D4"
                          strokeWidth="2"
                        />
                        <text
                          x="450"
                          y="230"
                          textAnchor="middle"
                          className="text-neon-teal font-bold"
                        >
                          orders
                        </text>
                        <line
                          x1="370"
                          y1="280"
                          x2="530"
                          y2="280"
                          stroke="white"
                          strokeOpacity="0.3"
                        />
                        <text x="375" y="270" className="text-xs">
                          order_id (PK)
                        </text>
                        <text x="375" y="300" className="text-xs">
                          customer_id (FK)
                        </text>
                        <text x="375" y="320" className="text-xs">
                          order_date
                        </text>
                        <text x="375" y="340" className="text-xs">
                          status
                        </text>
                        <text x="375" y="360" className="text-xs">
                          total_amount
                        </text>
                      </motion.g>

                      {/* Order Items Table */}
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <rect
                          x="650"
                          y="150"
                          width="200"
                          height="140"
                          rx="5"
                          fill="#1E1E2E"
                          stroke="#FFD60A"
                          strokeWidth="2"
                        />
                        <text
                          x="750"
                          y="130"
                          textAnchor="middle"
                          className="text-neon-yellow font-bold"
                        >
                          order_items
                        </text>
                        <line
                          x1="670"
                          y1="180"
                          x2="830"
                          y2="180"
                          stroke="white"
                          strokeOpacity="0.3"
                        />
                        <text x="675" y="170" className="text-xs">
                          order_item_id (PK)
                        </text>
                        <text x="675" y="200" className="text-xs">
                          order_id (FK)
                        </text>
                        <text x="675" y="220" className="text-xs">
                          product_id (FK)
                        </text>
                        <text x="675" y="240" className="text-xs">
                          quantity
                        </text>
                        <text x="675" y="260" className="text-xs">
                          price
                        </text>
                      </motion.g>

                      {/* Relationships */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        {/* Categories -> Products */}
                        <path
                          d="M 250,100 C 300,100 300,100 350,100"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          markerEnd="url(#arrowhead)"
                        />

                        {/* Customers -> Orders */}
                        <path
                          d="M 250,320 C 300,320 300,320 350,320"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          markerEnd="url(#arrowhead)"
                        />

                        {/* Orders -> Order Items */}
                        <path
                          d="M 550,320 C 600,320 600,200 650,200"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          markerEnd="url(#arrowhead)"
                        />

                        {/* Products -> Order Items */}
                        <path
                          d="M 550,100 C 600,100 600,180 650,180"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          markerEnd="url(#arrowhead)"
                        />
                      </motion.g>
                    </svg>
                  </div>
                </motion.div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No schema generated yet. Start by describing your
                  requirements.
                </p>
              )}
            </div>
          </div>

          {hasGenerated && (
            <div className="px-6 py-4 border-t border-white/10 flex justify-end">
              <Button
                variant="outline"
                className="neon-border bg-dark-200/50"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy Schema"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
