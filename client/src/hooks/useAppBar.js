import { useEffect, useState } from "react";
const EventEmitter = require('eventemitter3');

var captionChanged = new EventEmitter();
const setCaption = (value) => {
    // console.log(` =========== setCaption(${value})`);
    captionChanged.emit('setCaption', value);
}

const useAppBar = () => {
    const [caption, setCaptionCore] = useState('Blogs');

    const OnSetCaption = (value) => {
        // console.log(` =========== OnSetCaption(${value})`);
        setCaptionCore(value);
    }

    useEffect(() => {
        captionChanged.on('setCaption', OnSetCaption);

        return () => {
            captionChanged.removeListener('setCaption', OnSetCaption);
        }
    }, [])

    return { caption, setCaption };
}

export default useAppBar;
