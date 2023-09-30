import { useEffect, useState } from "react";
const EventEmitter = require('eventemitter3');

const eventNames = {
    setCaption: "setCaption",
    setShowSearch: "setShowSearch",
    setNavigateBack: "setNavigateBack",
}

var captionChanged = new EventEmitter();

const setCaption = (value) => captionChanged.emit(eventNames.setCaption, value);
const setShowSearch = (value) => captionChanged.emit(eventNames.setShowSearch, value);
const setNavigateBack = (value) => captionChanged.emit(eventNames.setNavigateBack, value);

const useAppBar = (_caption, _showSearch, _navigateBack) => {
    const [caption, setCaptionCore] = useState(_caption ?? "Blogs");
    const [showSearch, setShowSearchCore] = useState(!!_showSearch);
    const [navigateBack, setNavigateBackCore] = useState(null);

    const OnSetCaptionChanged = (value) => setCaptionCore(value);
    const OnSetShowSearchChanged = (value) => setShowSearchCore(value);
    const OnNavigateBackChanged = (value) => setNavigateBackCore(value);

    useEffect(() => {
        captionChanged.on(eventNames.setCaption, OnSetCaptionChanged);
        captionChanged.on(eventNames.setShowSearch, OnSetShowSearchChanged);
        captionChanged.on(eventNames.setNavigateBack, OnNavigateBackChanged);

        setCaption(_caption);
        setShowSearch(_showSearch);
        setNavigateBack(() => _navigateBack);

        return () => {
            captionChanged.removeListener(eventNames.setCaption, OnSetCaptionChanged);
            captionChanged.removeListener(eventNames.setShowSearch, OnSetShowSearchChanged);
            captionChanged.removeListener(eventNames.setNavigateBack, OnNavigateBackChanged);
        }
    }, [])

    return { caption, setCaption, showSearch, setShowSearch, navigateBack };
}

export default useAppBar;
