import { useState } from "react"
import { 
  Home, 
  Users, 
  Briefcase, 
  User, 
  Building2, 
  BarChart3,
  FileText,
  Search,
  Shield,
  Settings,
  LogOut
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

// Mock user role - this will come from auth context later
const userRole = "candidate" // "candidate" | "school" | "admin"

const menuItems = {
  candidate: [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "My Profile", url: "/profile", icon: User },
    { title: "Job Search", url: "/jobs", icon: Search },
    { title: "CV Generator", url: "/cv-generator", icon: FileText },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
  ],
  school: [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "School Profile", url: "/school-profile", icon: Building2 },
    { title: "Job Postings", url: "/job-postings", icon: Briefcase },
    { title: "Candidate Search", url: "/candidate-search", icon: Users },
    { title: "Analytics", url: "/school-analytics", icon: BarChart3 },
  ],
  admin: [
    { title: "Dashboard", url: "/admin-dashboard", icon: Home },
    { title: "User Management", url: "/user-management", icon: Users },
    { title: "School Verification", url: "/school-verification", icon: Building2 },
    { title: "Job Approvals", url: "/job-approvals", icon: Briefcase },
    { title: "System Analytics", url: "/system-analytics", icon: BarChart3 },
    { title: "Settings", url: "/admin-settings", icon: Settings },
  ]
}

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const items = menuItems[userRole as keyof typeof menuItems]
  const isCollapsed = state === "collapsed"
  
  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-accent/50"

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 border-r bg-card"
    >
      <SidebarContent className="px-2 py-4">
        {/* Logo */}
        <div className="px-4 py-2 mb-4">
          {!isCollapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold gradient-text">TeachMate</h2>
                <p className="text-xs text-muted-foreground">AI Platform</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            {userRole === "candidate" ? "Candidate Menu" : 
             userRole === "school" ? "School Menu" : 
             userRole === "admin" ? "Admin Menu" : "Menu"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${getNavCls({ isActive: isActive(item.url) })}`}
                    >
                      <item.icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Actions */}
        <div className="mt-auto pt-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button className="flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-destructive/10 text-destructive w-full">
                  <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && <span>Logout</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}