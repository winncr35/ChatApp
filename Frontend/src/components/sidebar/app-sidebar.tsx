"use client"

import * as React from "react"


import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch.tsx"
import CreateNewChat from "../chat/CreateNewChat.tsx"
import GroupChatList from "../chat/GroupChatList.tsx"
import NewGroupChatModal from "../chat/NewGroupChatModel.tsx"
import AddFriendModal from "../chat/AddFriendModal.tsx"
import DirectMessageList from "../chat/DirectMessageList.tsx"
import { useThemeStore } from "../../stores/useThemeStore.tsx"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { isDark, toggleTheme } = useThemeStore();



  return (
    <Sidebar variant="inset" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className=" bg-gradient-primary" render={<a href="#" />}>

              <div className="flex w-full items-center px-2 justify-between">
                <h1 className="text-xl font-bold text-white">Qtalk</h1>
                <div className="flex items-center gap-2">
                  <Sun className="size-4 text-white/80" />

                  <Switch checked={isDark}
                    onCheckedChange={toggleTheme}
                    className=" data-state:checked:bg-background/80" />
                  <Moon className="size-4 text-white/80" />
                </div>
              </div>


            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* New Chat */}
        <SidebarGroup >
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Group chat */}

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">

          </SidebarGroupLabel>
          <SidebarGroupAction title="Create group" className="cursor-pointer" >
            <NewGroupChatModal />
          </SidebarGroupAction>

          <SidebarGroupContent >
            <GroupChatList />
          </SidebarGroupContent>


        </SidebarGroup>



        {/* Direct Message */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">

          </SidebarGroupLabel>
          <SidebarGroupAction title="Friend" className="cursor-pointer" >
            <AddFriendModal />
          </SidebarGroupAction>

          <SidebarGroupContent >
            <DirectMessageList />
          </SidebarGroupContent>


        </SidebarGroup>



      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar >
  )
}
