"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Database,
  Key,
  Shield,
  Bell,
  Clock,
  Code,
  Folder,
  Star,
  Edit,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  BarChart3,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash,
  RefreshCw,
  Calendar,
  Laptop,
  Moon,
  Sun,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const [copied, setCopied] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.2]);

  const user = {
    name: "John Smith",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "Data Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    timezone: "Pacific Time (UTC-7)",
    memberSince: "March 2023",
    plan: "Pro",
    usage: {
      queries: { used: 1250, total: 5000 },
      storage: { used: 2.4, total: 10 },
      projects: { used: 8, total: 20 },
    },
  };

  const projects = [
    {
      id: 1,
      name: "E-commerce Analytics",
      description: "Sales and customer behavior analysis for online store",
      lastModified: "2 days ago",
      queries: 145,
      favorite: true,
    },
    {
      id: 2,
      name: "Marketing Dashboard",
      description: "Campaign performance tracking and ROI analysis",
      lastModified: "1 week ago",
      queries: 87,
      favorite: true,
    },
    {
      id: 3,
      name: "Customer Segmentation",
      description: "User clustering based on behavior patterns",
      lastModified: "2 weeks ago",
      queries: 56,
      favorite: false,
    },
    {
      id: 4,
      name: "Inventory Management",
      description: "Stock level monitoring and forecasting",
      lastModified: "1 month ago",
      queries: 32,
      favorite: false,
    },
  ];

  const connections = [
    {
      id: 1,
      name: "Production Trino",
      type: "Trino",
      host: "trino.production.example.com",
      port: "443",
      catalog: "hive",
      username: "john_smith",
      password: "••••••••••••",
      lastUsed: "Today",
      status: "active",
    },
    {
      id: 2,
      name: "Analytics Spark",
      type: "Spark SQL",
      host: "spark.analytics.example.com",
      port: "10000",
      database: "analytics",
      username: "john_smith",
      password: "••••••••••••",
      lastUsed: "Yesterday",
      status: "active",
    },
    {
      id: 3,
      name: "Development Trino",
      type: "Trino",
      host: "trino.dev.example.com",
      port: "443",
      catalog: "hive",
      username: "john_smith",
      password: "••••••••••••",
      lastUsed: "3 days ago",
      status: "inactive",
    },
  ];

  const notifications = [
    { id: 1, type: "all", enabled: true },
    { id: 2, type: "query_completed", enabled: true },
    { id: 3, type: "schema_changes", enabled: false },
    { id: 4, type: "security", enabled: true },
    { id: 5, type: "newsletter", enabled: false },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleShowPassword = (id: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFavorite = (projectId: number) => {
    // In a real app, this would update the state and make an API call
    console.log(`Toggling favorite for project ${projectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 noise-bg pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-neon-blue/5 blur-3xl"></div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-gray-200"
        style={{ opacity: headerOpacity }}
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-display font-bold neon-gradient-text">
              Your Profile
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                  <div className="relative h-32 bg-gradient-to-r from-neon-purple to-neon-blue">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 1 }}
                    >
                      <div className="absolute inset-0 grid-pattern"></div>
                    </motion.div>
                  </div>
                  <div className="relative px-6 pb-6">
                    <div className="flex justify-center">
                      <motion.div
                        className="absolute -top-16 rounded-full border-4 border-background dark:border-dark-100 light:border-white overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={96}
                          height={96}
                          className="h-24 w-24 object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="mt-12 text-center">
                      <motion.h2
                        className="text-xl font-display font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {user.name}
                      </motion.h2>
                      <motion.p
                        className="text-muted-foreground text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {user.email}
                      </motion.p>
                      <motion.div
                        className="mt-2 flex items-center justify-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="text-xs px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple">
                          {user.role}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue">
                          {user.plan}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                  <div className="p-2">
                    <nav className="space-y-1">
                      {[
                        {
                          id: "account",
                          label: "Account",
                          icon: <User className="h-4 w-4" />,
                        },
                        {
                          id: "projects",
                          label: "Projects",
                          icon: <Folder className="h-4 w-4" />,
                        },
                        {
                          id: "connections",
                          label: "Connections",
                          icon: <Database className="h-4 w-4" />,
                        },
                        {
                          id: "security",
                          label: "Security",
                          icon: <Shield className="h-4 w-4" />,
                        },
                        {
                          id: "notifications",
                          label: "Notifications",
                          icon: <Bell className="h-4 w-4" />,
                        },
                        {
                          id: "billing",
                          label: "Billing",
                          icon: <BarChart3 className="h-4 w-4" />,
                        },
                      ].map((item) => (
                        <motion.button
                          key={item.id}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors relative",
                            activeTab === item.id
                              ? "text-white"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-100"
                          )}
                          onClick={() => setActiveTab(item.id)}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {activeTab === item.id && (
                            <motion.div
                              className="absolute inset-0 rounded-md neon-gradient-bg opacity-90 z-0"
                              layoutId="activeNavBackground"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="z-10">{item.icon}</span>
                          <span className="z-10">{item.label}</span>
                        </motion.button>
                      ))}
                    </nav>
                  </div>
                </Card>
              </motion.div>

              {/* Usage Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                  <div className="p-6">
                    <h3 className="text-sm font-medium mb-4">
                      Usage Statistics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Queries</span>
                          <span>
                            {user.usage.queries.used} /{" "}
                            {user.usage.queries.total}
                          </span>
                        </div>
                        <div className="h-2 bg-background/60 dark:bg-dark-200 light:bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full neon-gradient-bg"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (user.usage.queries.used /
                                  user.usage.queries.total) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Storage (GB)</span>
                          <span>
                            {user.usage.storage.used} /{" "}
                            {user.usage.storage.total}
                          </span>
                        </div>
                        <div className="h-2 bg-background/60 dark:bg-dark-200 light:bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full neon-gradient-bg"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (user.usage.storage.used /
                                  user.usage.storage.total) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 1, delay: 0.6 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Projects</span>
                          <span>
                            {user.usage.projects.used} /{" "}
                            {user.usage.projects.total}
                          </span>
                        </div>
                        <div className="h-2 bg-background/60 dark:bg-dark-200 light:bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full neon-gradient-bg"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (user.usage.projects.used /
                                  user.usage.projects.total) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 1, delay: 0.7 }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                      <Button className="w-full neon-gradient-bg text-white text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                    <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-display font-bold neon-gradient-text">
                            Account Information
                          </h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Manage your personal information
                          </p>
                        </div>
                        <Button variant="outline" className="neon-border">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="name"
                              className="text-xs text-muted-foreground"
                            >
                              Full Name
                            </Label>
                            <div className="mt-1 font-medium">{user.name}</div>
                          </div>
                          <div>
                            <Label
                              htmlFor="email"
                              className="text-xs text-muted-foreground"
                            >
                              Email Address
                            </Label>
                            <div className="mt-1 font-medium">{user.email}</div>
                          </div>
                          <div>
                            <Label
                              htmlFor="role"
                              className="text-xs text-muted-foreground"
                            >
                              Role
                            </Label>
                            <div className="mt-1 font-medium">{user.role}</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="company"
                              className="text-xs text-muted-foreground"
                            >
                              Company
                            </Label>
                            <div className="mt-1 font-medium">
                              {user.company}
                            </div>
                          </div>
                          <div>
                            <Label
                              htmlFor="location"
                              className="text-xs text-muted-foreground"
                            >
                              Location
                            </Label>
                            <div className="mt-1 font-medium">
                              {user.location}
                            </div>
                          </div>
                          <div>
                            <Label
                              htmlFor="timezone"
                              className="text-xs text-muted-foreground"
                            >
                              Timezone
                            </Label>
                            <div className="mt-1 font-medium">
                              {user.timezone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                        <h3 className="text-lg font-medium mb-4">
                          Preferences
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium">
                                  Dark Mode
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Use dark theme
                                </p>
                              </div>
                              <Switch
                                checked={theme === "dark"}
                                onCheckedChange={(checked) =>
                                  setTheme(checked ? "dark" : "light")
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium">
                                  Email Notifications
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Receive email updates
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium">
                                  SQL Dialect
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Default SQL dialect
                                </p>
                              </div>
                              <select className="h-9 rounded-md bg-background/60 border border-white/10 px-3 py-1 text-sm dark:bg-background/60 dark:border-white/10 light:bg-white light:border-gray-300">
                                <option value="trino">Trino</option>
                                <option value="spark">Spark SQL</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium">
                                  Auto-save
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Save queries automatically
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                        <h3 className="text-lg font-medium mb-4">
                          Account Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label
                              htmlFor="member-since"
                              className="text-xs text-muted-foreground"
                            >
                              Member Since
                            </Label>
                            <div className="mt-1 font-medium flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {user.memberSince}
                            </div>
                          </div>
                          <div>
                            <Label
                              htmlFor="plan"
                              className="text-xs text-muted-foreground"
                            >
                              Current Plan
                            </Label>
                            <div className="mt-1 font-medium flex items-center">
                              <Sparkles className="h-4 w-4 mr-2 text-neon-purple" />
                              {user.plan}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-red-500">
                              Danger Zone
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                    <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-display font-bold neon-gradient-text">
                            Your Projects
                          </h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Manage your SQL projects
                          </p>
                        </div>
                        <Button className="neon-gradient-bg">
                          <Plus className="h-4 w-4 mr-2" />
                          New Project
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                          >
                            <div className="bg-background/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden dark:bg-dark-100/60 dark:backdrop-blur-sm dark:border-white/10 light:bg-white light:border-gray-200">
                              <div className="p-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-medium">
                                      {project.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {project.description}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleFavorite(project.id)}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    <Star
                                      className={cn(
                                        "h-5 w-5",
                                        project.favorite &&
                                          "fill-yellow-500 text-yellow-500"
                                      )}
                                    />
                                  </Button>
                                </div>
                                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>
                                    Last modified: {project.lastModified}
                                  </span>
                                </div>
                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                  <Code className="h-3 w-3 mr-1" />
                                  <span>{project.queries} queries</span>
                                </div>
                              </div>
                              <div className="px-6 py-3 border-t border-white/10 dark:border-white/10 light:border-gray-200 flex justify-between items-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-neon-purple hover:text-neon-purple/80"
                                >
                                  Open
                                  <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                        <h3 className="text-lg font-medium mb-4">
                          Recent Activity
                        </h3>
                        <div className="space-y-4">
                          {[
                            {
                              action: "Created new query",
                              project: "E-commerce Analytics",
                              time: "Today, 10:23 AM",
                            },
                            {
                              action: "Modified schema",
                              project: "Marketing Dashboard",
                              time: "Yesterday, 3:45 PM",
                            },
                            {
                              action: "Executed query",
                              project: "Customer Segmentation",
                              time: "2 days ago, 11:30 AM",
                            },
                          ].map((activity, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-md bg-background/60 border border-white/5 dark:bg-dark-100/60 dark:border-white/5 light:bg-white light:border-gray-100"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.5 + index * 0.1,
                              }}
                            >
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-neon-purple/10 flex items-center justify-center mr-3">
                                  <Code className="h-4 w-4 text-neon-purple" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium">
                                    {activity.action}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {activity.project} • {activity.time}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "connections" && (
                <motion.div
                  key="connections"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                    <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-display font-bold neon-gradient-text">
                            Database Connections
                          </h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Manage your Trino and Spark connections
                          </p>
                        </div>
                        <Button className="neon-gradient-bg">
                          <Plus className="h-4 w-4 mr-2" />
                          New Connection
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <Tabs defaultValue="all">
                        <TabsList className="mb-6 bg-background/60 dark:bg-dark-100/60 light:bg-gray-100">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="trino">Trino</TabsTrigger>
                          <TabsTrigger value="spark">Spark SQL</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="space-y-6">
                          {connections.map((connection, index) => (
                            <motion.div
                              key={connection.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div className="bg-background/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden dark:bg-dark-100/60 dark:backdrop-blur-sm dark:border-white/10 light:bg-white light:border-gray-200">
                                <div className="p-6">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center">
                                      <div
                                        className={cn(
                                          "h-10 w-10 rounded-lg flex items-center justify-center mr-4",
                                          connection.type === "Trino"
                                            ? "bg-neon-purple/10"
                                            : "bg-neon-blue/10"
                                        )}
                                      >
                                        <Database
                                          className={cn(
                                            "h-5 w-5",
                                            connection.type === "Trino"
                                              ? "text-neon-purple"
                                              : "text-neon-blue"
                                          )}
                                        />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-medium flex items-center">
                                          {connection.name}
                                          <span
                                            className={cn(
                                              "ml-2 text-xs px-2 py-0.5 rounded-full",
                                              connection.status === "active"
                                                ? "bg-green-500/20 text-green-500"
                                                : "bg-yellow-500/20 text-yellow-500"
                                            )}
                                          >
                                            {connection.status === "active"
                                              ? "Active"
                                              : "Inactive"}
                                          </span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {connection.type}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground"
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">
                                        Host
                                      </Label>
                                      <div className="mt-1 flex items-center">
                                        <Input
                                          value={connection.host}
                                          readOnly
                                          className="bg-background/40 border-white/10 text-sm dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="ml-2"
                                          onClick={() =>
                                            handleCopy(
                                              connection.host,
                                              `host-${connection.id}`
                                            )
                                          }
                                        >
                                          {copied ===
                                          `host-${connection.id}` ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">
                                        Port
                                      </Label>
                                      <div className="mt-1 flex items-center">
                                        <Input
                                          value={connection.port}
                                          readOnly
                                          className="bg-background/40 border-white/10 text-sm dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="ml-2"
                                          onClick={() =>
                                            handleCopy(
                                              connection.port,
                                              `port-${connection.id}`
                                            )
                                          }
                                        >
                                          {copied ===
                                          `port-${connection.id}` ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">
                                        {connection.type === "Trino"
                                          ? "Catalog"
                                          : "Database"}
                                      </Label>
                                      <div className="mt-1 flex items-center">
                                        <Input
                                          value={
                                            connection.type === "Trino"
                                              ? connection.catalog
                                              : connection.database
                                          }
                                          readOnly
                                          className="bg-background/40 border-white/10 text-sm dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="ml-2"
                                          onClick={() =>
                                            handleCopy(
                                              connection.type === "Trino"
                                                ? connection.catalog
                                                : connection.database,
                                              `catalog-${connection.id}`
                                            )
                                          }
                                        >
                                          {copied ===
                                          `catalog-${connection.id}` ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">
                                        Username
                                      </Label>
                                      <div className="mt-1 flex items-center">
                                        <Input
                                          value={connection.username}
                                          readOnly
                                          className="bg-background/40 border-white/10 text-sm dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="ml-2"
                                          onClick={() =>
                                            handleCopy(
                                              connection.username,
                                              `username-${connection.id}`
                                            )
                                          }
                                        >
                                          {copied ===
                                          `username-${connection.id}` ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                          ) : (
                                            <Copy className="h-4 w-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">
                                        Password
                                      </Label>
                                      <div className="mt-1 flex items-center">
                                        <Input
                                          type={
                                            showPassword[
                                              `password-${connection.id}`
                                            ]
                                              ? "text"
                                              : "password"
                                          }
                                          value={connection.password}
                                          readOnly
                                          className="bg-background/40 border-white/10 text-sm dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="ml-2"
                                          onClick={() =>
                                            toggleShowPassword(
                                              `password-${connection.id}`
                                            )
                                          }
                                        >
                                          {showPassword[
                                            `password-${connection.id}`
                                          ] ? (
                                            <EyeOff className="h-4 w-4" />
                                          ) : (
                                            <Eye className="h-4 w-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">
                                        Last Used
                                      </Label>
                                      <div className="mt-1 text-sm">
                                        {connection.lastUsed}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="px-6 py-3 border-t border-white/10 dark:border-white/10 light:border-gray-200 flex justify-between items-center">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    <RefreshCw className="h-3 w-3 mr-1" />
                                    Test Connection
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="text-xs neon-gradient-bg"
                                  >
                                    Connect
                                    <ChevronRight className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </TabsContent>

                        <TabsContent value="trino">
                          {connections
                            .filter((c) => c.type === "Trino")
                            .map((connection, index) => (
                              <motion.div
                                key={connection.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                                className="mb-6"
                              >
                                {/* Same connection card as above, filtered for Trino */}
                                <div className="bg-background/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden dark:bg-dark-100/60 dark:backdrop-blur-sm dark:border-white/10 light:bg-white light:border-gray-200">
                                  {/* Content same as above */}
                                  <div className="p-6">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-lg bg-neon-purple/10 flex items-center justify-center mr-4">
                                          <Database className="h-5 w-5 text-neon-purple" />
                                        </div>
                                        <div>
                                          <h3 className="text-lg font-medium flex items-center">
                                            {connection.name}
                                            <span
                                              className={cn(
                                                "ml-2 text-xs px-2 py-0.5 rounded-full",
                                                connection.status === "active"
                                                  ? "bg-green-500/20 text-green-500"
                                                  : "bg-yellow-500/20 text-yellow-500"
                                              )}
                                            >
                                              {connection.status === "active"
                                                ? "Active"
                                                : "Inactive"}
                                            </span>
                                          </h3>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {connection.type}
                                          </p>
                                        </div>
                                      </div>
                                      {/* Controls */}
                                    </div>
                                    {/* Connection details */}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </TabsContent>

                        <TabsContent value="spark">
                          {connections
                            .filter((c) => c.type === "Spark SQL")
                            .map((connection, index) => (
                              <motion.div
                                key={connection.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1,
                                }}
                                className="mb-6"
                              >
                                {/* Same connection card as above, filtered for Spark */}
                                <div className="bg-background/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden dark:bg-dark-100/60 dark:backdrop-blur-sm dark:border-white/10 light:bg-white light:border-gray-200">
                                  {/* Content same as above */}
                                  <div className="p-6">
                                    <div className="flex justify-between items-start">
                                      <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-lg bg-neon-blue/10 flex items-center justify-center mr-4">
                                          <Database className="h-5 w-5 text-neon-blue" />
                                        </div>
                                        <div>
                                          <h3 className="text-lg font-medium flex items-center">
                                            {connection.name}
                                            <span
                                              className={cn(
                                                "ml-2 text-xs px-2 py-0.5 rounded-full",
                                                connection.status === "active"
                                                  ? "bg-green-500/20 text-green-500"
                                                  : "bg-yellow-500/20 text-yellow-500"
                                              )}
                                            >
                                              {connection.status === "active"
                                                ? "Active"
                                                : "Inactive"}
                                            </span>
                                          </h3>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {connection.type}
                                          </p>
                                        </div>
                                      </div>
                                      {/* Controls */}
                                    </div>
                                    {/* Connection details */}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </TabsContent>
                      </Tabs>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                    <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-display font-bold neon-gradient-text">
                            Security Settings
                          </h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Manage your account security
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Password</h3>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="current-password">
                                Current Password
                              </Label>
                              <div className="mt-1 flex items-center">
                                <Input
                                  id="current-password"
                                  type={
                                    showPassword["current-password"]
                                      ? "text"
                                      : "password"
                                  }
                                  placeholder="••••••••••••"
                                  className="bg-background/40 border-white/10 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                  onClick={() =>
                                    toggleShowPassword("current-password")
                                  }
                                >
                                  {showPassword["current-password"] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="new-password">New Password</Label>
                              <div className="mt-1 flex items-center">
                                <Input
                                  id="new-password"
                                  type={
                                    showPassword["new-password"]
                                      ? "text"
                                      : "password"
                                  }
                                  placeholder="••••••••••••"
                                  className="bg-background/40 border-white/10 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                  onClick={() =>
                                    toggleShowPassword("new-password")
                                  }
                                >
                                  {showPassword["new-password"] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="confirm-password">
                                Confirm New Password
                              </Label>
                              <div className="mt-1 flex items-center">
                                <Input
                                  id="confirm-password"
                                  type={
                                    showPassword["confirm-password"]
                                      ? "text"
                                      : "password"
                                  }
                                  placeholder="••••••••••••"
                                  className="bg-background/40 border-white/10 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                  onClick={() =>
                                    toggleShowPassword("confirm-password")
                                  }
                                >
                                  {showPassword["confirm-password"] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <Button className="neon-gradient-bg mt-2">
                              Update Password
                            </Button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <h3 className="text-lg font-medium mb-4">
                            Two-Factor Authentication
                          </h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm">
                                Protect your account with 2FA
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Button variant="outline" className="neon-border">
                              <Lock className="h-4 w-4 mr-2" />
                              Enable 2FA
                            </Button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <h3 className="text-lg font-medium mb-4">API Keys</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm">Manage your API keys</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Create and manage API keys for programmatic
                                  access
                                </p>
                              </div>
                              <Button variant="outline" className="neon-border">
                                <Key className="h-4 w-4 mr-2" />
                                Generate New Key
                              </Button>
                            </div>

                            <div className="bg-background/40 border border-white/10 rounded-lg p-4 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="text-sm font-medium">
                                    Primary API Key
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Created on March 15, 2023
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 mr-2">
                                    Active
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center">
                                <Input
                                  value="sk_live_•••••••••••••••••••••••••••••"
                                  readOnly
                                  className="bg-background/60 border-white/10 text-sm font-mono dark:bg-dark-300/60 dark:border-white/10 light:bg-white light:border-gray-200"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                  onClick={() =>
                                    handleCopy(
                                      "sk_live_actual_key_here",
                                      "api-key"
                                    )
                                  }
                                >
                                  {copied === "api-key" ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <h3 className="text-lg font-medium mb-4">Sessions</h3>
                          <div className="space-y-4">
                            <div className="bg-background/40 border border-white/10 rounded-lg p-4 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-neon-purple/10 flex items-center justify-center mr-3">
                                    <Laptop className="h-4 w-4 text-neon-purple" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">
                                      Current Session
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      MacBook Pro • San Francisco, CA • Today
                                    </p>
                                  </div>
                                </div>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                                  Active
                                </span>
                              </div>
                            </div>

                            <div className="bg-background/40 border border-white/10 rounded-lg p-4 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-neon-blue/10 flex items-center justify-center mr-3">
                                    <Laptop className="h-4 w-4 text-neon-blue" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">
                                      iPhone 13
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      iOS 16 • New York, NY • 2 days ago
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-red-400"
                                >
                                  Revoke
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                    <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-display font-bold neon-gradient-text">
                            Notification Settings
                          </h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Manage how you receive notifications
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">
                              All Notifications
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Enable or disable all notifications at once
                            </p>
                          </div>
                          <Switch
                            checked={
                              notifications.find((n) => n.type === "all")
                                ?.enabled
                            }
                          />
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <h3 className="text-lg font-medium mb-4">
                            Email Notifications
                          </h3>
                          <div className="space-y-4">
                            {[
                              {
                                type: "query_completed",
                                title: "Query Completed",
                                description:
                                  "Get notified when your queries finish running",
                              },
                              {
                                type: "schema_changes",
                                title: "Schema Changes",
                                description:
                                  "Get notified when schemas are modified",
                              },
                              {
                                type: "security",
                                title: "Security Alerts",
                                description:
                                  "Get notified about security events",
                              },
                              {
                                type: "newsletter",
                                title: "Product Updates",
                                description:
                                  "Receive our monthly newsletter and product updates",
                              },
                            ].map((item) => (
                              <div
                                key={item.type}
                                className="flex items-center justify-between"
                              >
                                <div>
                                  <h4 className="text-sm font-medium">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {item.description}
                                  </p>
                                </div>
                                <Switch
                                  checked={
                                    notifications.find(
                                      (n) => n.type === item.type
                                    )?.enabled
                                  }
                                  disabled={
                                    !notifications.find((n) => n.type === "all")
                                      ?.enabled
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <h3 className="text-lg font-medium mb-4">
                            Notification Channels
                          </h3>
                          <div className="space-y-4">
                            {[
                              {
                                channel: "email",
                                title: "Email",
                                description: "Receive notifications via email",
                              },
                              {
                                channel: "browser",
                                title: "Browser",
                                description: "Receive in-app notifications",
                              },
                              {
                                channel: "mobile",
                                title: "Mobile",
                                description:
                                  "Receive push notifications on your mobile device",
                              },
                            ].map((item) => (
                              <div
                                key={item.channel}
                                className="flex items-center justify-between"
                              >
                                <div>
                                  <h4 className="text-sm font-medium">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {item.description}
                                  </p>
                                </div>
                                <Switch
                                  defaultChecked={
                                    item.channel === "email" ||
                                    item.channel === "browser"
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <h3 className="text-lg font-medium mb-4">
                            Notification Preferences
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="notification-frequency">
                                Notification Frequency
                              </Label>
                              <select
                                id="notification-frequency"
                                className="mt-1 w-full h-10 rounded-md bg-background/60 border border-white/10 px-3 py-1 text-sm dark:bg-background/60 dark:border-white/10 light:bg-white light:border-gray-300"
                              >
                                <option value="realtime">Real-time</option>
                                <option value="hourly">Hourly digest</option>
                                <option value="daily">Daily digest</option>
                                <option value="weekly">Weekly digest</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium">
                                  Do Not Disturb
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Pause all notifications during specified hours
                                </p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
                          <Button className="neon-gradient-bg">
                            Save Notification Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-background/50 backdrop-blur-md border border-white/10 dark:border-white/10 light:border-gray-200">
                    <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-display font-bold neon-gradient-text">
                            Billing & Subscription
                          </h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Manage your subscription and payment methods
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-8">
                        <div className="bg-background/60 backdrop-blur-sm border border-white/10 rounded-lg p-6 dark:bg-dark-100/60 dark:backdrop-blur-sm dark:border-white/10 light:bg-white light:border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium">
                                Current Plan
                              </h3>
                              <div className="flex items-center mt-2">
                                <div className="h-10 w-10 rounded-full bg-neon-purple/10 flex items-center justify-center mr-3">
                                  <Sparkles className="h-5 w-5 text-neon-purple" />
                                </div>
                                <div>
                                  <div className="text-xl font-display font-bold neon-gradient-text">
                                    Pro Plan
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    $49/month • Renews on April 15, 2025
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" className="neon-border">
                              Change Plan
                            </Button>
                          </div>

                          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-background/40 rounded-lg p-4 border border-white/5 dark:bg-dark-200/40 dark:border-white/5 light:bg-gray-50 light:border-gray-100">
                              <h4 className="text-sm font-medium">Queries</h4>
                              <div className="mt-2 text-2xl font-bold">
                                5,000
                              </div>
                              <p className="text-xs text-muted-foreground">
                                per month
                              </p>
                            </div>
                            <div className="bg-background/40 rounded-lg p-4 border border-white/5 dark:bg-dark-200/40 dark:border-white/5 light:bg-gray-50 light:border-gray-100">
                              <h4 className="text-sm font-medium">Storage</h4>
                              <div className="mt-2 text-2xl font-bold">
                                10 GB
                              </div>
                              <p className="text-xs text-muted-foreground">
                                total
                              </p>
                            </div>
                            <div className="bg-background/40 rounded-lg p-4 border border-white/5 dark:bg-dark-200/40 dark:border-white/5 light:bg-gray-50 light:border-gray-100">
                              <h4 className="text-sm font-medium">Projects</h4>
                              <div className="mt-2 text-2xl font-bold">20</div>
                              <p className="text-xs text-muted-foreground">
                                maximum
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Payment Methods
                          </h3>
                          <div className="space-y-4">
                            <div className="bg-background/40 border border-white/10 rounded-lg p-4 dark:bg-dark-200/40 dark:border-white/10 light:bg-gray-50 light:border-gray-200">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-lg bg-background/60 flex items-center justify-center mr-3 dark:bg-dark-300/60 light:bg-white">
                                    <svg
                                      className="h-6 w-6"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        x="2"
                                        y="5"
                                        width="20"
                                        height="14"
                                        rx="2"
                                        fill="#1A1A2E"
                                      />
                                      <path
                                        d="M7 15H4V9H7V15Z"
                                        fill="#FF3CA2"
                                      />
                                      <path
                                        d="M11 15H8V9H11V15Z"
                                        fill="#9D4EDD"
                                      />
                                      <path
                                        d="M15 15H12V9H15V15Z"
                                        fill="#00B4D8"
                                      />
                                      <path
                                        d="M19 15H16V9H19V15Z"
                                        fill="#00F5D4"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">
                                      Visa ending in 4242
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Expires 12/2025
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 mr-2">
                                    Default
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" className="neon-border">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Payment Method
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Billing History
                          </h3>
                          <div className="border border-white/10 dark:border-white/10 light:border-gray-200 rounded-md overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-background/60 dark:bg-dark-200/60 light:bg-gray-100">
                                  <th className="text-left p-3 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                                    Date
                                  </th>
                                  <th className="text-left p-3 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                                    Description
                                  </th>
                                  <th className="text-left p-3 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                                    Amount
                                  </th>
                                  <th className="text-left p-3 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                                    Status
                                  </th>
                                  <th className="text-center p-3 border-b border-white/10 dark:border-white/10 light:border-gray-200">
                                    Invoice
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    date: "Mar 15, 2025",
                                    description: "Pro Plan - Monthly",
                                    amount: "$49.00",
                                    status: "Paid",
                                  },
                                  {
                                    date: "Feb 15, 2025",
                                    description: "Pro Plan - Monthly",
                                    amount: "$49.00",
                                    status: "Paid",
                                  },
                                  {
                                    date: "Jan 15, 2025",
                                    description: "Pro Plan - Monthly",
                                    amount: "$49.00",
                                    status: "Paid",
                                  },
                                ].map((invoice, index) => (
                                  <tr
                                    key={index}
                                    className="border-b last:border-b-0 border-white/10 dark:border-white/10 light:border-gray-200 hover:bg-background/30 dark:hover:bg-dark-200/30 light:hover:bg-gray-50"
                                  >
                                    <td className="p-3">{invoice.date}</td>
                                    <td className="p-3">
                                      {invoice.description}
                                    </td>
                                    <td className="p-3">{invoice.amount}</td>
                                    <td className="p-3">
                                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/20 text-green-500">
                                        {invoice.status}
                                      </span>
                                    </td>
                                    <td className="p-3 text-center">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs"
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        PDF
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
