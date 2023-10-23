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

/** @typedef {import('../utils/types').TextMethod} TextMethod */
/** @typedef {import('../utils/types').TextCallback} TextCallback */
/** @typedef {import('../utils/types').VoidNotifyCallback} VoidNotifyCallback */
/** @typedef {import('../utils/types').TextChangedNotifyCallback} TextChangedNotifyCallback */

/**
 * @typedef {Object} AppBarHook
 * @property {string} caption The caption
 * @property {TextMethod} setCaption The setCaption method
 * @property {?TextChangedNotifyCallback} searchTextChanged The searchTextChanged method
 * @property {?VoidNotifyCallback} navigateBack The navigateBack method
 * @property {?VoidNotifyCallback} addNew The addNew method
 * @property {?VoidNotifyCallback} save The save method
 */

/**
 * Custom useAppBar hook
 * @param {string} [initialCaption=""]
 * @param {?TextChangedNotifyCallback} [onSearchTextChanged=null] Search text changed
 * @param {?VoidNotifyCallback} [onNavigateBack=null] Navigate back
 * @param {?VoidNotifyCallback} [onAddNew=null] Add new
 * @param {?VoidNotifyCallback} [onSave=null] Save
 * @return {AppBarHook} The AppBarHook
 */
const useAppBar = (initialCaption, onSearchTextChanged, onNavigateBack, onAddNew, onSave) => {
    /** @type {[string, import('react').Dispatch<import('react').SetStateAction<string>]} */
    const [caption, setCaptionCore] = useState(initialCaption ?? 'Blogs');

    /** @type {[?TextMethod, import('react').Dispatch<import('react').SetStateAction<?TextMethod>]} */
    const [searchTextChanged, setSearchTextChangedCore] = useState(/** @type {?TextMethod} */(null));

    /** @type {[?VoidNotifyCallback, import('react').Dispatch<import('react').SetStateAction<?VoidNotifyCallback>]} */
    const [navigateBack, setNavigateBackCore] = useState(/** @type {?VoidNotifyCallback} */(null));

    /** @type {[?VoidNotifyCallback, import('react').Dispatch<import('react').SetStateAction<?VoidNotifyCallback>]} */
    const [addNew, setAddNewCore] = useState(/** @type {?VoidNotifyCallback} */(null));

    /** @type {[?VoidNotifyCallback, import('react').Dispatch<import('react').SetStateAction<?VoidNotifyCallback>]} */
    const [save, setSaveCore] = useState(/** @type {?VoidNotifyCallback} */(null));

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
