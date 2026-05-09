import React from 'react';

declare const IframeWithLoader: React.MemoExoticComponent<({ src, style, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement> & {
    style?: React.CSSProperties;
}) => React.JSX.Element>;

export { IframeWithLoader, IframeWithLoader as default };
