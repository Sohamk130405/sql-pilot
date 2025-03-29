import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { signOut, useSession } from "next-auth/react";
import CreateProjectModal from "./create-project-modal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Query optimization suggestion",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "New feature: Chart visualization",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, title: "Weekly usage report", time: "1 day ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <>
      <header className="sticky top-0 z-30 bg-dark-200/80 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <h1 className="text-2xl font-display font-bold neon-gradient-text mr-4">
            {activeTab === "schema" && "Schema Designer"}
            {activeTab === "sql" && "SQL Generator"}
            {activeTab === "nlq" && "Natural Language Query"}
            {activeTab === "history" && "Query History"}
          </h1> */}

            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 bg-dark-100/50 border-white/10 hover:bg-dark-100/80"
              id="search-trigger"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-muted-foreground">Search...</span>
              <div className="text-xs border border-white/20 rounded px-1 bg-dark-200/80 ml-2">
                ⌘K
              </div>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 mr-2">
              <Select>
                <SelectTrigger>
                  <span>Select Engine</span>
                </SelectTrigger>
                <SelectContent className="rounded-md bg-dark-100/50 border border-white/10  py-1 text-sm">
                  <SelectItem value="trino">Trino SQL</SelectItem>
                  <SelectItem value="spark">Spark SQL</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setShowCreateProject(true)}
                variant="outline"
                size="sm"
                className="neon-border bg-dark-100/50"
              >
                New Project
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  id="notifications-trigger"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-neon-pink"></span>
                  )}
                </Button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      id="notifications-panel"
                      className="absolute right-0 mt-2 w-80 bg-dark-100/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h3 className="font-medium">Notifications</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-white"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      </div>
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          <div className="divide-y divide-white/5">
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-4 hover:bg-white/5 transition-colors ${
                                  notification.read ? "" : "bg-dark-200/50"
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm">
                                      {notification.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {notification.time}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className="h-2 w-2 rounded-full bg-neon-pink mt-1"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-muted-foreground">
                            <p>No notifications</p>
                          </div>
                        )}
                      </div>
                      <div className="p-2 border-t border-white/10">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs justify-center"
                        >
                          View all notifications
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  id="user-trigger"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-white">
                    <Avatar className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-white">
                      <AvatarImage
                        src={session?.user.image as string}
                        alt="User Avatar"
                      />
                      <AvatarFallback>{session?.user.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      id="user-menu"
                      className="absolute right-0 mt-2 w-56 bg-dark-100/95 backdrop-blur-md rounded-lg border border-white/10 shadow-xl z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-white/10">
                        <div className="font-medium">{session?.user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {session?.user.email}
                        </div>
                      </div>
                      <div className="py-1">
                        {[
                          {
                            label: "Profile",
                            icon: <User className="h-4 w-4" />,
                          },
                          {
                            label: "Settings",
                            icon: <Settings className="h-4 w-4" />,
                          },
                        ].map((item) => (
                          <Link
                            href={"/profile"}
                            key={item.label}
                            className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors"
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-white/10 py-1">
                        <button
                          onClick={() => signOut()}
                          className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>
      <CreateProjectModal
        open={showCreateProject}
        setOpen={setShowCreateProject}
      />
    </>
  );
};

export default Navbar;

/*


  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#search-modal") &&
        !target.closest("#search-trigger")
      ) {
        setIsSearchOpen(false);
      }
      if (
        !target.closest("#notifications-panel") &&
        !target.closest("#notifications-trigger")
      ) {
        setShowNotifications(false);
      }
      if (!target.closest("#user-menu") && !target.closest("#user-trigger")) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


 <AnimatePresence mode="wait">
          {isSearchOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                id="search-modal"
                className="w-full max-w-2xl bg-dark-100/95 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 flex items-center gap-3 border-b border-white/10">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for queries, schemas, or commands..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <div className="text-xs border border-white/20 rounded px-1 bg-dark-200/80">
                    ESC
                  </div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs text-muted-foreground uppercase font-medium">
                      Recent Searches
                    </div>
                    <div className="space-y-1">
                      {[
                        "Top 10 products by revenue",
                        "Customer retention analysis",
                        "Monthly sales by region",
                      ].map((search) => (
                        <button
                          key={search}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 rounded-md flex items-center gap-2 transition-colors"
                        >
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {search}
                        </button>
                      ))}
                    </div>

                    <div className="px-3 py-2 text-xs text-muted-foreground uppercase font-medium mt-4">
                      Suggested
                    </div>
                    <div className="space-y-1">
                      {[
                        {
                          text: "Create new schema",
                          icon: (
                            <Database className="h-4 w-4 text-neon-purple" />
                          ),
                        },
                        {
                          text: "Generate SQL query",
                          icon: <Code className="h-4 w-4 text-neon-blue" />,
                        },
                        {
                          text: "View documentation",
                          icon: <BookOpen className="h-4 w-4 text-neon-teal" />,
                        },
                      ].map((item) => (
                        <button
                          key={item.text}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 rounded-md flex items-center gap-2 transition-colors"
                        >
                          {item.icon}
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

*/
