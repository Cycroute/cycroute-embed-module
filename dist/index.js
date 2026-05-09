// src/IframeWithLoader.tsx
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
var iframeStyleDefault = {
  display: "block",
  boxSizing: "content-box",
  border: "1px solid rgb(172, 172, 172)",
  width: "400px",
  height: "156px"
};
var iframeStyleSmall = {
  display: "block",
  boxSizing: "content-box",
  border: "1px solid rgb(172, 172, 172)",
  width: "300px",
  height: "116px"
};
var LOADER_FRAMES = [
  "",
  ".",
  "..",
  "...",
  "....",
  ".....",
  " ....",
  "  ...",
  "   ..",
  "    ."
];
var loaderStyle = {
  position: "absolute",
  inset: 0,
  background: "#d0d0d0",
  padding: "5px 10px",
  fontSize: "14px",
  color: "#555",
  fontWeight: "bold",
  whiteSpace: "pre",
  textAlign: "left"
};
var IframeWithLoader = memo(function IframeWithLoader2({ src, style, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [frame, setFrame] = useState(0);
  const resolvedStyle = useMemo(() => {
    const baseStyle = src?.includes("/small") ? iframeStyleSmall : iframeStyleDefault;
    return style ? { ...baseStyle, ...style } : baseStyle;
  }, [src, style]);
  const wrapperStyle = useMemo(() => ({
    position: "relative",
    width: resolvedStyle.width,
    height: resolvedStyle.height,
    border: resolvedStyle.border,
    boxSizing: "content-box"
  }), [resolvedStyle]);
  const iframeStyle = useMemo(() => ({
    ...resolvedStyle,
    border: "none",
    display: "block"
  }), [resolvedStyle]);
  const handleLoad = useCallback(() => setLoaded(true), []);
  useEffect(() => {
    if (loaded) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % LOADER_FRAMES.length), 50);
    return () => clearInterval(id);
  }, [loaded]);
  return /* @__PURE__ */ React.createElement("div", { style: wrapperStyle }, !loaded && /* @__PURE__ */ React.createElement("div", { style: loaderStyle }, "Loading " + LOADER_FRAMES[frame]), /* @__PURE__ */ React.createElement(
    "iframe",
    {
      src,
      style: iframeStyle,
      referrerPolicy: "no-referrer",
      onLoad: handleLoad,
      ...props
    }
  ));
});
var IframeWithLoader_default = IframeWithLoader;
export {
  IframeWithLoader_default as IframeWithLoader,
  IframeWithLoader_default as default
};
//# sourceMappingURL=index.js.map