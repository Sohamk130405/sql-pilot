"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Code,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("schema");

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-dark-200/80 backdrop-blur-md border-white/10"
        >
          {isSidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.div
            className="fixed lg:relative z-40 h-full bg-dark-200/80 backdrop-blur-md border-r border-white/10 w-64"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full">
              <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg neon-gradient-bg flex items-center justify-center text-white">
                    <Database className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-display font-bold neon-gradient-text">
                    SQLPilot
                  </span>
                </div>
              </div>

              <div className="flex-1 py-6 px-4 overflow-y-auto custom-scrollbar">
                <nav className="space-y-2">
                  {[
                    {
                      id: "schema",
                      label: "Schema Designer",
                      icon: <Database className="h-4 w-4" />,
                    },
                    {
                      id: "sql",
                      label: "SQL Generator",
                      icon: <Code className="h-4 w-4" />,
                    },
                    {
                      id: "nlq",
                      label: "Natural Language",
                      icon: <MessageSquare className="h-4 w-4" />,
                    },
                    {
                      id: "history",
                      label: "Query History",
                      icon: <BarChart3 className="h-4 w-4" />,
                    },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start relative group ${
                        activeTab === item.id
                          ? "text-white"
                          : "text-muted-foreground hover:text-white"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {activeTab === item.id && (
                        <motion.div
                          className="absolute inset-0 rounded-md neon-gradient-bg opacity-90 z-0"
                          layoutId="activeTabBackground"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="flex items-center gap-2 z-10">
                        {item.icon}
                        {item.label}
                      </span>

                      {activeTab === item.id && (
                        <motion.div
                          className="absolute right-2 h-2 w-2 rounded-full bg-white"
                          layoutId="activeTabIndicator"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  ))}
                </nav>

                <div className="mt-8">
                  <h3 className="text-xs uppercase text-muted-foreground font-medium mb-3 px-3">
                    Recent Projects
                  </h3>
                  <div className="space-y-1">
                    {[
                      "E-commerce Database",
                      "Analytics Dashboard",
                      "User Management",
                    ].map((project, index) => (
                      <motion.button
                        key={project}
                        className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-white rounded-md hover:bg-white/5 transition-colors"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {project}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="rounded-lg bg-dark-100/50 p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-neon-purple/20 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-neon-purple" />
                      </div>
                      <h3 className="font-medium">Pro Features</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Unlock advanced features with our Pro plan
                    </p>
                    <Button
                      size="sm"
                      className="w-full neon-gradient-bg text-xs"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v5m4-2-1 1m-6 0-1-1m8 6h5m-2 4-1-1m-10 1-1 1m2-6H3m6 10v5m-4-8 8 8m0-16 8 8-8 8-8-8 8-8z" />
    </svg>
  );
}
