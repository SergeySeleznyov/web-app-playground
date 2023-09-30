import { useEffect, useState } from "react";
const EventEmitter = require('eventemitter3');

const eventNames = {
    setCaption: "setCaption",
    setShowSearch: "setShowSearch",
    setShowNavigateBack: "setShowNavigateBack",
}

var captionChanged = new EventEmitter();

const setCaption = (value) => captionChanged.emit(eventNames.setCaption, value);
const setShowSearch = (value) => captionChanged.emit(eventNames.setShowSearch, value);
const setShowNavigateBack = (value) => captionChanged.emit(eventNames.setShowNavigateBack, value);

const useAppBar = (_caption, _showSearch, _showNavigateBack) => {
    const [caption, setCaptionCore] = useState(_caption ?? "Blogs");
    const [showSearch, setShowSearchCore] = useState(!!_showSearch);
    const [showNavigateBack, setShowNavigateBackCore] = useState(!!_showNavigateBack);

    const OnSetCaption = (value) => setCaptionCore(value);
    const OnSetShowSearch = (value) => setShowSearchCore(value);
    const OnShowNavigateBack = (value) => setShowNavigateBackCore(value);

    useEffect(() => {
        captionChanged.on(eventNames.setCaption, OnSetCaption);
        captionChanged.on(eventNames.setShowSearch, OnSetShowSearch);
        captionChanged.on(eventNames.setShowNavigateBack, OnShowNavigateBack);

        setCaption(_caption);
        setShowSearch(_showSearch);
        setShowNavigateBack(_showNavigateBack);

        return () => {
            captionChanged.removeListener(eventNames.setCaption, OnSetCaption);
            captionChanged.removeListener(eventNames.setShowSearch, OnSetShowSearch);
            captionChanged.removeListener(eventNames.setShowNavigateBack, OnShowNavigateBack);
        }
    }, [])

    return { caption, setCaption, showSearch, setShowSearch, showNavigateBack, setShowNavigateBack };
}

export default useAppBar;
