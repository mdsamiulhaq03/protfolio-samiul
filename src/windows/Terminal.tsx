import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";
import { techStack } from "../data";
import { Check, Flag } from "lucide-react";

function Terminal() {
  return (
    <>
      {/* HEADER (drag-safe zone) */}
      <div
        id="window-header"
        className="px-4 py-2 flex items-center justify-between"
      >
        {/* Controls */}
        <div className="flex items-center">
          <WindowControls target="terminal" />
        </div>

        <h2 className="text-lg font-semibold">Tech Stack</h2>
      </div>

      {/* BODY */}
      <div className="techstack font-mono text-sm px-4 py-3 overflow-auto">
        {/* Command */}
        <p className="mb-4">
          <span className="font-bold text-green-400">@samiul % </span>
          show tech stack
        </p>

        {/* Table Header */}
        <div className="grid grid-cols-[40px_180px_1fr] gap-4 border-b border-gray-700 pb-2 mb-3 text-gray-400">
          <span></span>
          <span>Category</span>
          <span>Technologies</span>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {techStack.map((stack) => (
            <div
              key={stack.category}
              className="grid grid-cols-[40px_180px_1fr] gap-4 items-start"
            >
              <Check className="text-amber-400 mt-[2px]" size={18} />

              <h3 className="font-semibold">{stack.category}</h3>

              <p className="text-green-800 leading-relaxed">
                {stack.items.join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-6 border-t border-gray-700 pt-3 space-y-1 text-gray-400">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            <p>11 out of 11 Stack Loaded</p>
          </div>

          <div className="flex items-center gap-2">
            <Flag size={16} />
            <p>Render Time: 0.5s</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* Wrapped export */
const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
