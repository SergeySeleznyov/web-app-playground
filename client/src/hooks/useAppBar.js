import { useEffect, useState } from "react";
const EventEmitter = require('eventemitter3');

const eventNames = {
    setCaption: "setCaption",
    setSearchTextChanged: "setSearchTextChanged",
    setNavigateBack: "setNavigateBack",
    addNew: "addNew",
}

var captionChanged = new EventEmitter();

const setCaption = (value) => captionChanged.emit(eventNames.setCaption, value);
const setSearchTextChanged = (value) => captionChanged.emit(eventNames.setSearchTextChanged, value);
const setNavigateBack = (value) => captionChanged.emit(eventNames.setNavigateBack, value);
const setAddNew = (value) => captionChanged.emit(eventNames.addNew, value);

const useAppBar = (_caption, _onSearchTextChanged, _navigateBack, _addNew) => {
    const [caption, setCaptionCore] = useState(_caption ?? "Blogs");
    const [searchTextChanged, setSearchTextChangedCore] = useState(null);
    const [navigateBack, setNavigateBackCore] = useState(null);
    const [addNew, setAddNewCore] = useState(null);

    const OnSetCaptionChanged = (value) => setCaptionCore(value);
    const OnSetSearchTextChanged = (value) => setSearchTextChangedCore(value);
    const OnNavigateBackChanged = (value) => setNavigateBackCore(value);
    const OnAddNewChanged = (value) => setAddNewCore(value);

    useEffect(() => {
        captionChanged.on(eventNames.setCaption, OnSetCaptionChanged);
        captionChanged.on(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
        captionChanged.on(eventNames.setNavigateBack, OnNavigateBackChanged);
        captionChanged.on(eventNames.addNew, OnAddNewChanged);

        setCaption(_caption);
        setSearchTextChanged(() => _onSearchTextChanged);
        setNavigateBack(() => _navigateBack);
        setAddNew(() => _addNew);

        return () => {
            captionChanged.removeListener(eventNames.setCaption, OnSetCaptionChanged);
            captionChanged.removeListener(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
            captionChanged.removeListener(eventNames.setNavigateBack, OnNavigateBackChanged);
            captionChanged.removeListener(eventNames.addNew, OnAddNewChanged);
        }
    }, [])

    return { caption, setCaption, searchTextChanged, navigateBack, addNew };
}

export default useAppBar;
