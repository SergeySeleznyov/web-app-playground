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
 * Custom useAppBar hook
 * @param {string} [initialCaption=""]
 * @param {(TextChangedNotifyCallback|null)} [onSearchTextChanged=null] Search text changed
 * @param {(VoidNotifyCallback|null)} [onNavigateBack=null] Navigate back
 * @param {(VoidNotifyCallback|null)} [onAddNew=null] Add new
 * @param {(VoidNotifyCallback|null)} [onSave=null] Save
 * @return {AppBarHook} The AppBarHook
 */
const useAppBar = (initialCaption, onSearchTextChanged, onNavigateBack, onAddNew, onSave) => {
    const [caption, setCaptionCore] = useState(initialCaption ?? 'Blogs');
    const [searchTextChanged, setSearchTextChangedCore] = useState(null);
    const [navigateBack, setNavigateBackCore] = useState(null);
    const [addNew, setAddNewCore] = useState(null);
    const [save, setSaveCore] = useState(null);

    const handleSetCaptionChanged = (value) => setCaptionCore(value);
    const handleSetSearchTextChanged = (value) => setSearchTextChangedCore(value);
    const handleNavigateBackChanged = (value) => setNavigateBackCore(value);
    const handleAddNewChanged = (value) => setAddNewCore(value);
    const handleSaveChanged = (value) => setSaveCore(value);

    useEffect(() => {
        event.on(eventNames.setCaption, handleSetCaptionChanged);
        event.on(eventNames.setSearchTextChanged, handleSetSearchTextChanged);
        event.on(eventNames.setNavigateBack, handleNavigateBackChanged);
        event.on(eventNames.addNew, handleAddNewChanged);
        event.on(eventNames.save, handleSaveChanged);

        setCaption(initialCaption);
        setSearchTextChanged(() => onSearchTextChanged);
        setNavigateBack(() => onNavigateBack);
        setAddNew(() => onAddNew);
        setSave(() => onSave);

        return () => {
            event.removeListener(eventNames.setCaption, handleSetCaptionChanged);
            event.removeListener(eventNames.setSearchTextChanged, handleSetSearchTextChanged);
            event.removeListener(eventNames.setNavigateBack, handleNavigateBackChanged);
            event.removeListener(eventNames.addNew, handleAddNewChanged);
            event.removeListener(eventNames.save, handleSaveChanged);
        };
    }, []);

    return {caption, setCaption, searchTextChanged, navigateBack, addNew, save};
};

export default useAppBar;
