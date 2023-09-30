import { useEffect, useState } from "react";
const EventEmitter = require('eventemitter3');

const eventNames = {
    setCaption: "setCaption",
    setSearchTextChanged: "setSearchTextChanged",
    setNavigateBack: "setNavigateBack",
}

var captionChanged = new EventEmitter();

const setCaption = (value) => captionChanged.emit(eventNames.setCaption, value);
const setSearchTextChanged = (value) => captionChanged.emit(eventNames.setSearchTextChanged, value);
const setNavigateBack = (value) => captionChanged.emit(eventNames.setNavigateBack, value);

const useAppBar = (_caption, _onSearchTextChanged, _navigateBack) => {
    const [caption, setCaptionCore] = useState(_caption ?? "Blogs");
    const [searchTextChanged, setSearchTextChangedCore] = useState(null);
    const [navigateBack, setNavigateBackCore] = useState(null);

    const OnSetCaptionChanged = (value) => setCaptionCore(value);
    const OnSetSearchTextChanged = (value) => setSearchTextChangedCore(value);
    const OnNavigateBackChanged = (value) => setNavigateBackCore(value);

    useEffect(() => {
        captionChanged.on(eventNames.setCaption, OnSetCaptionChanged);
        captionChanged.on(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
        captionChanged.on(eventNames.setNavigateBack, OnNavigateBackChanged);

        setCaption(_caption);
        setSearchTextChanged(() => _onSearchTextChanged);
        setNavigateBack(() => _navigateBack);

        return () => {
            captionChanged.removeListener(eventNames.setCaption, OnSetCaptionChanged);
            captionChanged.removeListener(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
            captionChanged.removeListener(eventNames.setNavigateBack, OnNavigateBackChanged);
        }
    }, [])

    return { caption, setCaption, searchTextChanged, navigateBack };
}

export default useAppBar;
