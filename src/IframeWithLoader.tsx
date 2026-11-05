import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';

const iframeStyleDefault = {
    display: 'block',
    boxSizing: 'content-box',
    border: '1px solid rgb(172, 172, 172)',
    width: '400px',
    height: '156px'
} as const;

const iframeStyleSmall = {
    display: 'block',
    boxSizing: 'content-box',
    border: '1px solid rgb(172, 172, 172)',
    width: '300px',
    height: '116px'
} as const;

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
    "    .",
];

const loaderStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    background: '#d0d0d0',
    padding: '5px 10px',
    fontSize: '14px', color: '#555',
    fontWeight: 'bold',
    whiteSpace: 'pre',
    textAlign: 'left',
};

// Return type is explicitly React.ReactElement: the inferred React.JSX.Element does not exist in older @types/react,
// which would make the emitted type declarations unreadable for those consumers.
const IframeWithLoader = memo(function IframeWithLoader({ src, style, onLoad, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement> & { style?: React.CSSProperties }): React.ReactElement {
    // Remember which src finished loading, so the loader shows again automatically when src changes.
    const [loadedSrc, setLoadedSrc] = useState<string | undefined | null>(null);
    const loaded = loadedSrc === src;
    const [frame, setFrame] = useState(0);

    const resolvedStyle = useMemo<React.CSSProperties>(() => {
        const baseStyle = src?.includes('/small') ? iframeStyleSmall : iframeStyleDefault;
        return style ? { ...baseStyle, ...style } : baseStyle;
    }, [src, style]);

    const wrapperStyle = useMemo<React.CSSProperties>(() => ({
        position: 'relative',
        width: resolvedStyle.width,
        height: resolvedStyle.height,
        border: resolvedStyle.border,
        boxSizing: 'content-box',
    }), [resolvedStyle]);

    const iframeStyle = useMemo<React.CSSProperties>(() => ({
        ...resolvedStyle, border: 'none', display: 'block',
    }), [resolvedStyle]);

    // Always call the consumer's onLoad too, instead of letting it override ours and leave the loader stuck.
    const handleLoad = useCallback((e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
        setLoadedSrc(src);
        onLoad?.(e);
    }, [src, onLoad]);

    useEffect(() => {
        if (loaded) return;
        const id = setInterval(() => setFrame(f => (f + 1) % LOADER_FRAMES.length), 50);
        return () => clearInterval(id);
    }, [loaded]);

    return (
        <div style={wrapperStyle}>
            {!loaded && (
                <div style={loaderStyle}>
                    {"Loading " + LOADER_FRAMES[frame]}
                </div>
            )}
            <iframe
                src={src}
                style={iframeStyle}
                title="Cycroute"
                referrerPolicy="no-referrer"
                {...props}
                onLoad={handleLoad}
            />
        </div>
    );
});

export default IframeWithLoader;
