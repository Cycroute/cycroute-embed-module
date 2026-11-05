Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
let react = require("react");
react = __toESM(react, 1);
// src/IframeWithLoader.tsx
const iframeStyleDefault = {
	display: "block",
	boxSizing: "content-box",
	border: "1px solid rgb(172, 172, 172)",
	width: "400px",
	height: "156px"
};
const iframeStyleSmall = {
	display: "block",
	boxSizing: "content-box",
	border: "1px solid rgb(172, 172, 172)",
	width: "300px",
	height: "116px"
};
const LOADER_FRAMES = [
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
const loaderStyle = {
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
const IframeWithLoader = (0, react.memo)(function IframeWithLoader({ src, style, onLoad, ...props }) {
	const [loadedSrc, setLoadedSrc] = (0, react.useState)(null);
	const loaded = loadedSrc === src;
	const [frame, setFrame] = (0, react.useState)(0);
	const resolvedStyle = (0, react.useMemo)(() => {
		const baseStyle = src?.includes("/small") ? iframeStyleSmall : iframeStyleDefault;
		return style ? {
			...baseStyle,
			...style
		} : baseStyle;
	}, [src, style]);
	const wrapperStyle = (0, react.useMemo)(() => ({
		position: "relative",
		width: resolvedStyle.width,
		height: resolvedStyle.height,
		border: resolvedStyle.border,
		boxSizing: "content-box"
	}), [resolvedStyle]);
	const iframeStyle = (0, react.useMemo)(() => ({
		...resolvedStyle,
		border: "none",
		display: "block"
	}), [resolvedStyle]);
	const handleLoad = (0, react.useCallback)((e) => {
		setLoadedSrc(src);
		onLoad?.(e);
	}, [src, onLoad]);
	(0, react.useEffect)(() => {
		if (loaded) return;
		const id = setInterval(() => setFrame((f) => (f + 1) % LOADER_FRAMES.length), 50);
		return () => clearInterval(id);
	}, [loaded]);
	return /* @__PURE__ */ react.default.createElement("div", { style: wrapperStyle }, !loaded && /* @__PURE__ */ react.default.createElement("div", { style: loaderStyle }, "Loading " + LOADER_FRAMES[frame]), /* @__PURE__ */ react.default.createElement("iframe", {
		src,
		style: iframeStyle,
		title: "Cycroute",
		referrerPolicy: "no-referrer",
		...props,
		onLoad: handleLoad
	}));
});
exports.IframeWithLoader = IframeWithLoader;
exports.default = IframeWithLoader;

//# sourceMappingURL=index.cjs.map