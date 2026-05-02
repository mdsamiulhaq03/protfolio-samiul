import useWindowStore from "../store/windows";
import { WINDOW_CONFIG } from "../data";

type WindowKey = keyof typeof WINDOW_CONFIG;

type Props = {
  target: WindowKey;
};

const WindowControls = ({ target }: Props) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.nativeEvent as any).stopImmediatePropagation?.();
  };

  return (
    <div id="window-controls" onMouseDown={stop}>
      <div
        className="close"
        onMouseDown={stop}
        onClick={(e) => {
          stop(e);
          closeWindow(target);
        }}
      />

      <div
        className="minimize"
        onMouseDown={stop}
        onClick={(e) => {
          stop(e);
          minimizeWindow(target);
        }}
      />

      <div
        className="maximize"
        onMouseDown={stop}
        onClick={(e) => {
          stop(e);
          maximizeWindow(target);
        }}
      />
    </div>
  );
};

export default WindowControls;
