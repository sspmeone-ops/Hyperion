"use client";

import {
  AlertTriangle,
  Bell,
  CheckCheck,
  CheckCircle,
  Info,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { ScrollArea } from "@/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";

export interface NotificationItem {
  avatar?: string;
  description: string;
  id: string;
  time: string;
  title: string;
  type?: "info" | "success" | "warning";
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Agent Execution Completed",
    description:
      "Claude Code subagent finished editing 12 files across packages/ui and packages/core.",
    time: "2m ago",
    unread: true,
    type: "success",
  },
  {
    id: "2",
    title: "System Update Available",
    description:
      "Hyperion v0.1.3 is ready for installation with native Tauri 2 optimizations.",
    time: "15m ago",
    unread: true,
    type: "info",
  },
  {
    id: "3",
    title: "Build Succeeded",
    description:
      "Full monorepo quality gates passed cleanly with 0 Biome lint errors.",
    time: "1h ago",
    unread: false,
    type: "success",
  },
];

export function NotificationCenter() {
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadItems = items.filter((item) => item.unread);
  const unreadCount = unreadItems.length;
  const hasUnread = unreadCount > 0;

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const removeNotification = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <PopoverTrigger asChild={true}>
        <Button
          aria-label="Notifications"
          className="relative size-9 rounded-full backdrop-blur-2xl bg-white/10 border border-white/30 hover:bg-white/25 hover:border-white/45 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.5)]"
          size="icon"
          variant="ghost"
        >
          <Bell className="size-4 text-white drop-shadow transition-colors" />
          {hasUnread && (
            <span className="absolute top-1 right-1 flex size-2.5 items-center justify-center">
              <span className="absolute size-full animate-ping rounded-full bg-pink-400 opacity-75" />
              <span className="relative size-2.5 rounded-full bg-gradient-to-r from-pink-400 to-sky-300 shadow-[0_0_10px_rgba(244,114,182,0.9)]" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      {/* Liquid Glass Popover Container */}
      <PopoverContent
        align="end"
        className="relative w-84 p-0 shadow-[0_32px_80px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.5)] md:w-[410px] rounded-[28px] bg-[#070512]/75 backdrop-blur-[48px] border border-white/30 overflow-hidden before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-pink-400/60 before:via-white/70 before:to-sky-400/60 z-50"
        style={{
          backdropFilter: "blur(48px) saturate(200%)",
          WebkitBackdropFilter: "blur(48px) saturate(200%)",
        }}
      >
        {/* Soft Ambient Lighting Glow Orbs */}
        <div className="pointer-events-none absolute -top-20 -left-20 size-56 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 size-56 rounded-full bg-sky-500/25 blur-3xl" />
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/15 px-5 py-4 bg-white/[0.06] backdrop-blur-2xl">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-lg tracking-tight text-white drop-shadow-md">
              Notifications
            </span>
            {hasUnread && (
              <span className="rounded-full bg-gradient-to-r from-pink-500/25 to-sky-500/25 border border-white/30 px-3 py-0.5 font-mono text-[10px] text-white font-semibold shadow-[0_2px_12px_rgba(244,114,182,0.3)] backdrop-blur-md">
                {unreadCount} unread
              </span>
            )}
          </div>
          {hasUnread && (
            <Button
              className="h-auto p-0 text-xs font-semibold text-white/90 hover:text-white hover:underline flex items-center gap-1.5 transition-colors"
              onClick={markAllAsRead}
              variant="link"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </Button>
          )}
        </div>
        {/* Liquid Glass Tabs */}
        <Tabs className="relative gap-0" defaultValue="all">
          <div className="p-3.5 border-b border-white/10 bg-white/[0.02]">
            <TabsList className="grid w-full grid-cols-2 rounded-[18px] bg-white/[0.08] border border-white/20 p-1 backdrop-blur-2xl shadow-inner">
              <TabsTrigger
                className="text-xs font-medium rounded-xl transition-all duration-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-white/30 data-[state=active]:to-white/15 data-[state=active]:text-white data-[state=active]:shadow-[0_4px_18px_rgba(0,0,0,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.5)] data-[state=active]:border data-[state=active]:border-white/40"
                value="all"
              >
                All ({items.length})
              </TabsTrigger>
              <TabsTrigger
                className="text-xs font-medium rounded-xl transition-all duration-200 data-[state=active]:bg-gradient-to-b data-[state=active]:from-white/30 data-[state=active]:to-white/15 data-[state=active]:text-white data-[state=active]:shadow-[0_4px_18px_rgba(0,0,0,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.5)] data-[state=active]:border data-[state=active]:border-white/40"
                value="unread"
              >
                Unread ({unreadCount})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent className="m-0" value="all">
            <ScrollArea className="max-h-76 p-3.5">
              <NotificationList
                items={items}
                onMarkRead={markAsRead}
                onRemove={removeNotification}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent className="m-0" value="unread">
            <ScrollArea className="max-h-76 p-3.5">
              <NotificationList
                items={unreadItems}
                onMarkRead={markAsRead}
                onRemove={removeNotification}
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
        {/* Footer */}
        {items.length > 0 && (
          <div className="relative flex items-center justify-between border-t border-white/15 bg-white/[0.04] backdrop-blur-2xl px-4 py-3">
            <Button
              className="h-8 rounded-full text-xs text-white/80 hover:text-white hover:bg-white/15 hover:border-white/25 border border-transparent transition-all"
              onClick={clearAll}
              size="sm"
              variant="ghost"
            >
              Clear all
            </Button>
            <Button
              className="h-8 rounded-full text-xs text-white bg-white/15 border border-white/25 hover:bg-white/25 hover:border-white/40 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]"
              onClick={() => setOpen(false)}
              size="sm"
              variant="ghost"
            >
              Close
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function NotificationList({
  items,
  onMarkRead,
  onRemove,
}: {
  items: NotificationItem[];
  onMarkRead: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[22px] border border-dashed border-white/25 bg-white/[0.04] backdrop-blur-2xl py-8 text-center">
        <Bell className="size-6 text-pink-300 mb-2 drop-shadow" />
        <p className="text-sm font-medium text-white">No notifications</p>
        <p className="text-xs text-white/70">You're all caught up!</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3.5">
      {items.map((item) => (
        <LiquidGlassCard
          blurIntensity="xl"
          borderRadius="22px"
          className={`group flex w-full flex-col gap-2.5 border p-4 text-left transition-all duration-200 overflow-hidden ${
            item.unread
              ? "border-white/35 bg-gradient-to-b from-white/20 via-white/12 to-white/6 hover:border-white/50 hover:bg-white/25"
              : "border-white/20 bg-white/[0.05] opacity-90 hover:bg-white/[0.10] hover:border-white/30 hover:opacity-100"
          }`}
          draggable={false}
          glowIntensity="sm"
          key={item.id}
          shadowIntensity="md"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar className="size-7 shrink-0 border border-white/30 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-xl shadow-[0_2px_6px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                {item.avatar ? (
                  <AvatarImage alt={item.title} src={item.avatar} />
                ) : (
                  <AvatarFallback className="bg-transparent">
                    {item.type === "warning" ? (
                      <AlertTriangle className="size-3.5 text-amber-300" />
                    ) : item.type === "success" ? (
                      <CheckCircle className="size-3.5 text-emerald-300" />
                    ) : (
                      <Info className="size-3.5 text-sky-300" />
                    )}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="truncate text-xs font-semibold text-white drop-shadow-sm">
                {item.title}
              </span>
              <span className="shrink-0 text-[10px] text-white/70">
                • {item.time}
              </span>
            </div>
            {/* Status & Delete */}
            <div className="flex shrink-0 items-center gap-2">
              {item.unread ? (
                <span className="rounded-full border border-white/30 bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white shadow-xs backdrop-blur-md">
                  Unread
                </span>
              ) : (
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-white/60 backdrop-blur-xs">
                  Read
                </span>
              )}
              <button
                className="opacity-0 transition-all duration-150 group-hover:opacity-100 p-1 text-white/70 hover:text-white rounded-full hover:bg-white/20 border border-transparent hover:border-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                title="Remove notification"
                type="button"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
          {/* Body */}
          <button
            className="text-left w-full cursor-pointer"
            onClick={() => onMarkRead(item.id)}
            type="button"
          >
            <p className="line-clamp-2 text-white/85 text-[11.5px] leading-relaxed drop-shadow-xs">
              {item.description}
            </p>
          </button>
          {/* Action Pills */}
          <div className="flex items-center gap-2 pt-1">
            <button
              className="rounded-full border border-white/30 bg-white/15 hover:bg-white/25 px-3.5 py-1 text-[10.5px] font-semibold text-white backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all active:scale-[0.96]"
              onClick={() => onMarkRead(item.id)}
              type="button"
            >
              View
            </button>
            <button
              className="rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-3.5 py-1 text-[10.5px] font-medium text-white/80 hover:text-white backdrop-blur-sm shadow-xs transition-all active:scale-[0.96]"
              onClick={() => onRemove(item.id)}
              type="button"
            >
              Dismiss
            </button>
          </div>
        </LiquidGlassCard>
      ))}
    </div>
  );
}
