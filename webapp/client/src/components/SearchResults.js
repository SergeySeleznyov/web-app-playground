// @ts-check
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Card, CardContent, CardHeader, css, styled} from '@mui/material';
import search from '../backend/search';
import useAppBar from '../hooks/useAppBar';
import PropTypes from 'prop-types';

/** @typedef {import('../model/SearchResult').default} SearchResult */
/** @typedef {import('../utils/types').VoidNotifyCallback} VoidNotifyCallback */
/** @typedef {import('../utils/types').TextChangedNotifyCallback} TextChangedNotifyCallback */

/**
 * View of post searching
 * @Component
 * @param {Object} params - params
 * @param {string} params.searchText The text to search in posts
 * @param {TextChangedNotifyCallback} params.onSearchTextChanged The navigateBack
 * @param {VoidNotifyCallback} params.navigateBack The callback to navigate back
 * @return {React.ReactElement}
*/
const SearchResults = ({searchText, onSearchTextChanged, navigateBack}) => {
    /** @type {[?SearchResult[], import('react').Dispatch<import('react').SetStateAction<?SearchResult[]>>]} */
    const [searchResults, setSearchResults] = useState(/** @type {?SearchResult[]} */(null));

    const AppBarCaption = `Search results for: "${searchText}"`;
    const {setCaption} = useAppBar(AppBarCaption, onSearchTextChanged, navigateBack);

    useEffect(() => {
        setCaption(AppBarCaption);
    }, [searchText]);

    useEffect(() => {
        const updateSearchResult = async () => {
            const searchResults = await search(searchText);
            setSearchResults(searchResults);
        };
        updateSearchResult();
    }, [searchText]);

    // TODO Apply theme
    const SearchResultCard = styled(Card, {
        name: 'search-result-card',
    })(({theme}) => css({
        '& em': {
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow',
        },
    }));

    return (
        <Box
            sx={{
                'display': 'flex',
                'flexWrap': 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                },
            }}
        >
            {
                searchResults?.map((searchResult, index) =>
                    <SearchResultCard key={searchResult.id}>
                        <CardHeader title={searchResult.title}>
                        </CardHeader>
                        <CardContent
                            dangerouslySetInnerHTML={{
                                __html: `...${searchResult.content}...`,
                            }}
                        >
                        </CardContent >
                    </SearchResultCard>,
                )
            }
        </Box >
    );
};

SearchResults.propTypes = {
    searchText: PropTypes.string.isRequired,
    onSearchTextChanged: PropTypes.func.isRequired,
    navigateBack: PropTypes.func.isRequired,
};

export default SearchResults;
