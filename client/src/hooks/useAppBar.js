import {useEffect, useState} from 'react';
const EventEmitter = require('eventemitter3');

const eventNames = {
    setCaption: 'setCaption',
    setSearchTextChanged: 'setSearchTextChanged',
    setNavigateBack: 'setNavigateBack',
    addNew: 'addNew',
    save: 'save',
};

const captionChanged = new EventEmitter();

const setCaption = (value) => captionChanged.emit(eventNames.setCaption, value);
const setSearchTextChanged = (value) => captionChanged.emit(eventNames.setSearchTextChanged, value);
const setNavigateBack = (value) => captionChanged.emit(eventNames.setNavigateBack, value);
const setAddNew = (value) => captionChanged.emit(eventNames.addNew, value);
const setSave = (value) => captionChanged.emit(eventNames.save, value);

const useAppBar = (_caption, _onSearchTextChanged, _navigateBack, _addNew, _save) => {
    const [caption, setCaptionCore] = useState(_caption ?? 'Blogs');
    const [searchTextChanged, setSearchTextChangedCore] = useState(null);
    const [navigateBack, setNavigateBackCore] = useState(null);
    const [addNew, setAddNewCore] = useState(null);
    const [save, setSaveCore] = useState(null);

    const OnSetCaptionChanged = (value) => setCaptionCore(value);
    const OnSetSearchTextChanged = (value) => setSearchTextChangedCore(value);
    const OnNavigateBackChanged = (value) => setNavigateBackCore(value);
    const OnAddNewChanged = (value) => setAddNewCore(value);
    const OnSaveChanged = (value) => setSaveCore(value);

    useEffect(() => {
        captionChanged.on(eventNames.setCaption, OnSetCaptionChanged);
        captionChanged.on(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
        captionChanged.on(eventNames.setNavigateBack, OnNavigateBackChanged);
        captionChanged.on(eventNames.addNew, OnAddNewChanged);
        captionChanged.on(eventNames.save, OnSaveChanged);

        setCaption(_caption);
        setSearchTextChanged(() => _onSearchTextChanged);
        setNavigateBack(() => _navigateBack);
        setAddNew(() => _addNew);
        setSave(() => _save);

        return () => {
            captionChanged.removeListener(eventNames.setCaption, OnSetCaptionChanged);
            captionChanged.removeListener(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
            captionChanged.removeListener(eventNames.setNavigateBack, OnNavigateBackChanged);
            captionChanged.removeListener(eventNames.addNew, OnAddNewChanged);
            captionChanged.removeListener(eventNames.save, OnSaveChanged);
        };
    }, []);

    return {caption, setCaption, searchTextChanged, navigateBack, addNew, save};
};

export default useAppBar;
