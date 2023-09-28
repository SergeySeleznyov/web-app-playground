import Box from '@mui/material/Box';
import { Card, CardContent, CardHeader, IconButton, Toolbar, Typography, css, styled } from '@mui/material';
import MainAppToolbar from './MainAppToolbar';
import { useEffect, useState } from 'react';
import search from '../backend/search';

const SearchResults = ({ postInfos, onOpen, searchText, onSearchChanged }) => {
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        const updateSearchResult = async () => {
            const searchResults = await search(searchText);
            setSearchResults(searchResults);
        }
        updateSearchResult();
    }, [searchText])

    // TODO Apply theme
    const StyledCard = styled(Card)(({ theme }) => css({
        '& em': {
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow',
            // borderBottom: '10px solid yellow',
        }
    }));

    return (
        <>
            <MainAppToolbar
                caption="Search results"
                showSearch={true}
                searhText={searchText}
                onSearchChanged={onSearchChanged}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
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
                                    __html: `...${searchResult.highlight.content}...`
                                }}
                                >
                            </CardContent >
                        </StyledCard>
                    )
                }
            </Box >
        </>
    )
}

export default SearchResults
