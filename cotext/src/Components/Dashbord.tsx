"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart,
  Users,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react"

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const routes = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Reports", icon: BarChart, path: "/admin/reports" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ]

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-30 h-screen bg-background transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="flex h-full flex-col bg-slate-200">
        <div className={cn("flex items-center justify-between p-6", collapsed && "justify-center")}>
          {!collapsed && <h1 className="text-3xl font-bold">Dashboard</h1>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3">
          <nav className="flex flex-col gap-2 py-2">
            {routes.map((route) => (
              <TooltipProvider key={route.path} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={route.path}
                      className={cn(
                        "flex items-center gap-3 rounded-lg p-2 text-base font-medium transition-all hover:bg-accent",
                        location.pathname === route.path
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-primary",
                        collapsed && "justify-center",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full",
                          collapsed ? "h-12 w-12" : "h-10 w-10",
                          "bg-primary/10",
                        )}
                      >
                        <route.icon className={cn(collapsed ? "h-6 w-6" : "h-5 w-5")} />
                      </div>
                      {!collapsed && <span>{route.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{route.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  )
}

export default Sidebar

