// @ts-check
import {useEffect, useState} from 'react';
const {EventEmitter} = require('eventemitter3');

const eventNames = {
    setCaption: 'setCaption',
    setSearchTextChanged: 'setSearchTextChanged',
    setNavigateBack: 'setNavigateBack',
    addNew: 'addNew',
    save: 'save',
};

/** @constructor */
const event = new EventEmitter();

const setCaption = (value) => event.emit(eventNames.setCaption, value);
const setSearchTextChanged = (value) => event.emit(eventNames.setSearchTextChanged, value);
const setNavigateBack = (value) => event.emit(eventNames.setNavigateBack, value);
const setAddNew = (value) => event.emit(eventNames.addNew, value);
const setSave = (value) => event.emit(eventNames.save, value);

/**
 * The callback
 * @callback TextChangedNotifyCallback
 * @param {string} value
 */

/**
 * The method with string arg
 * @callback TextMethod
 * @param {string} value
 */

/**
 * The callback
 * @callback VoidNotifyCallback
 */

/**
 * @typedef {Object} AppBarHook
 * @property {string} caption The caption
 * @property {(TextMethod)} setCaption The searchTextChanged
 * @property {(TextChangedNotifyCallback|null)} searchTextChanged The searchTextChanged
 * @property {(VoidNotifyCallback|null)} navigateBack The searchTextChanged
 * @property {(VoidNotifyCallback|null)} addNew The searchTextChanged
 * @property {(VoidNotifyCallback|null)} save The searchTextChanged
 */

/**
 * Returns state of the AppBar
 * @param {string} [_caption=""]
 * @param {(TextChangedNotifyCallback|null)} [_onSearchTextChanged=null] Search text changed
 * @param {(VoidNotifyCallback|null)} [_navigateBack=null] Navigate back
 * @param {(VoidNotifyCallback|null)} [_addNew=null] Add new
 * @param {(VoidNotifyCallback|null)} [_save=null] Save
 * @return {AppBarHook} The AppBarHook
 */
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
        event.on(eventNames.setCaption, OnSetCaptionChanged);
        event.on(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
        event.on(eventNames.setNavigateBack, OnNavigateBackChanged);
        event.on(eventNames.addNew, OnAddNewChanged);
        event.on(eventNames.save, OnSaveChanged);

        setCaption(_caption);
        setSearchTextChanged(() => _onSearchTextChanged);
        setNavigateBack(() => _navigateBack);
        setAddNew(() => _addNew);
        setSave(() => _save);

        return () => {
            event.removeListener(eventNames.setCaption, OnSetCaptionChanged);
            event.removeListener(eventNames.setSearchTextChanged, OnSetSearchTextChanged);
            event.removeListener(eventNames.setNavigateBack, OnNavigateBackChanged);
            event.removeListener(eventNames.addNew, OnAddNewChanged);
            event.removeListener(eventNames.save, OnSaveChanged);
        };
    }, []);

    return {caption, setCaption, searchTextChanged, navigateBack, addNew, save};
};

export default useAppBar;
