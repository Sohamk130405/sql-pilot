"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SchemaDesigner from "@/components/dashboard/schema-designer";
import SqlGenerator from "@/components/dashboard/sql-generator";
import NaturalLanguageQuery from "@/components/dashboard/natural-language-query";
import QueryHistory from "@/components/dashboard/query-history";

import { useParams } from "next/navigation";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

export default function PersonalizedDashboardPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("schema");
  
  return (
    <div className="flex h-screen bg-dark-300 overflow-hidden">
      <div className="absolute inset-0 noise-bg pointer-events-none"></div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto p-4 md:p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === "schema" && (
              <motion.div
                key="schema"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SchemaDesigner />
              </motion.div>
            )}
            {activeTab === "sql" && (
              <motion.div
                key="sql"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SqlGenerator />
              </motion.div>
            )}
            {activeTab === "nlq" && (
              <motion.div
                key="nlq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <NaturalLanguageQuery />
              </motion.div>
            )}
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QueryHistory />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

