import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabsContainer, TabButton } from "./StyleGambTabs";

export interface Tab {
  id: string;
  label: string;
}
 
export interface GambTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function GambTabs({ tabs, activeTab, onTabChange }: GambTabsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    const params = new URLSearchParams(location.search);
    params.set("tab", tabId);
    navigate(`?${params.toString()}`);
  };

  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
