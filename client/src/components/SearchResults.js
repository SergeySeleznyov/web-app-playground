import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Card, CardContent, CardHeader, css, styled} from '@mui/material';
import search from '../backend/search';
import useAppBar from '../hooks/useAppBar';
import PropTypes from 'prop-types';

const SearchResults = ({searchText, onSearchTextChanged, navigateBack}) => {
    const [searchResults, setSearchResults] = useState(null);

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
    const StyledCard = styled(Card)(({theme}) => css({
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
                    <StyledCard key={searchResult._id}>
                        <CardHeader title={searchResult._source.title}>
                        </CardHeader>
                        <CardContent
                            dangerouslySetInnerHTML={{
                                __html: `...${searchResult.highlight.content}...`,
                            }}
                        >
                        </CardContent >
                    </StyledCard>,
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
