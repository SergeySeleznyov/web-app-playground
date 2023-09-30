import { useEffect, useState } from "react";
const EventEmitter = require('eventemitter3');

const eventNames = {
    setCaption : "setCaption",
    setShowSearch : "setShowSearch",
}

var captionChanged = new EventEmitter();

const setCaption = (value) => captionChanged.emit(eventNames.setCaption, value);
const setShowSearch = (value) => captionChanged.emit(eventNames.setShowSearch, value);

const useAppBar = () => {
    const [caption, setCaptionCore] = useState('Blogs');
    const [showSearch, setShowSearchCore] = useState('Blogs');

    const OnSetCaption = (value) => setCaptionCore(value);
    const OnSetShowSearch = (value) => setShowSearchCore(value);

    useEffect(() => {
        captionChanged.on(eventNames.setCaption, OnSetCaption);
        captionChanged.on(eventNames.setShowSearch, OnSetShowSearch);

        return () => {
            captionChanged.removeListener(eventNames.setCaption, OnSetCaption);
            captionChanged.removeListener(eventNames.setShowSearch, OnSetShowSearch);
        }
    }, [])

    return { caption, setCaption, showSearch, setShowSearch };
}

export default useAppBar;
