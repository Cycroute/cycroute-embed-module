"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  IframeWithLoader: () => IframeWithLoader_default,
  default: () => IframeWithLoader_default
});
module.exports = __toCommonJS(index_exports);

// src/IframeWithLoader.tsx
var import_react = __toESM(require("react"), 1);
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
var IframeWithLoader = (0, import_react.memo)(function IframeWithLoader2({ src, style, ...props }) {
  const [loaded, setLoaded] = (0, import_react.useState)(false);
  const [frame, setFrame] = (0, import_react.useState)(0);
  const resolvedStyle = (0, import_react.useMemo)(() => {
    const baseStyle = src?.includes("/small") ? iframeStyleSmall : iframeStyleDefault;
    return style ? { ...baseStyle, ...style } : baseStyle;
  }, [src, style]);
  const wrapperStyle = (0, import_react.useMemo)(() => ({
    position: "relative",
    width: resolvedStyle.width,
    height: resolvedStyle.height,
    border: resolvedStyle.border,
    boxSizing: "content-box"
  }), [resolvedStyle]);
  const iframeStyle = (0, import_react.useMemo)(() => ({
    ...resolvedStyle,
    border: "none",
    display: "block"
  }), [resolvedStyle]);
  const handleLoad = (0, import_react.useCallback)(() => setLoaded(true), []);
  (0, import_react.useEffect)(() => {
    if (loaded) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % LOADER_FRAMES.length), 50);
    return () => clearInterval(id);
  }, [loaded]);
  return /* @__PURE__ */ import_react.default.createElement("div", { style: wrapperStyle }, !loaded && /* @__PURE__ */ import_react.default.createElement("div", { style: loaderStyle }, "Loading " + LOADER_FRAMES[frame]), /* @__PURE__ */ import_react.default.createElement(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IframeWithLoader
});
//# sourceMappingURL=index.cjs.map