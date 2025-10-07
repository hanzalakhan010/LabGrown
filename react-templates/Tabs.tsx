// components/ui/Tabs.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type TabsContextType = {
  active: string;
  setActive: (key: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs = ({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: ReactNode;
}) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="flex flex-col w-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex border-b border-gray-200 bg-white">{children}</div>
  );
};

export const Tab = ({ value, children }: { value: string; children: ReactNode }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be used inside <Tabs>");

  const isActive = ctx.active === value;

  return (
    <button
      onClick={() => ctx.setActive(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

export const TabPanel = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanel must be used inside <Tabs>");

  return ctx.active === value ? (
    <div className="flex-1 p-4 bg-gray-50 rounded-md shadow-sm">{children}</div>
  ) : null;
};
