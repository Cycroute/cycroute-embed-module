import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
const IframeWithLoader = memo(function IframeWithLoader({ src, style, onLoad, ...props }) {
	const [loadedSrc, setLoadedSrc] = useState(null);
	const loaded = loadedSrc === src;
	const [frame, setFrame] = useState(0);
	const resolvedStyle = useMemo(() => {
		const baseStyle = src?.includes("/small") ? iframeStyleSmall : iframeStyleDefault;
		return style ? {
			...baseStyle,
			...style
		} : baseStyle;
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
	const handleLoad = useCallback((e) => {
		setLoadedSrc(src);
		onLoad?.(e);
	}, [src, onLoad]);
	useEffect(() => {
		if (loaded) return;
		const id = setInterval(() => setFrame((f) => (f + 1) % LOADER_FRAMES.length), 50);
		return () => clearInterval(id);
	}, [loaded]);
	return /* @__PURE__ */ React.createElement("div", { style: wrapperStyle }, !loaded && /* @__PURE__ */ React.createElement("div", { style: loaderStyle }, "Loading " + LOADER_FRAMES[frame]), /* @__PURE__ */ React.createElement("iframe", {
		src,
		style: iframeStyle,
		title: "Cycroute",
		referrerPolicy: "no-referrer",
		...props,
		onLoad: handleLoad
	}));
});
export { IframeWithLoader, IframeWithLoader as default };

//# sourceMappingURL=index.mjs.map