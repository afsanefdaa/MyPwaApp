import React, { useState, useRef, useCallback } from 'react';
import {
  Container, Input, IconButton,
  InputAdornment,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Search } from '@material-ui/icons';
import styled from 'styled-components';
import useBookSearch from '../../hooks/useBookSearch';


const BooksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const StyledCard = styled(Card)`
   width: 100%;
   background: lightblue;
   margin: 10px 0;
`;

const Loading = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 10px;
`;

const StyledInput = styled(Input)`
   width: 100%;
   margin-bottom: 10px;
`;

export default function InfiniteLoop() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const {
    loading, error, books, hasMore,
  } = useBookSearch(query, pageNumber);
  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    // eslint-disable-next-line no-undef
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevState) => prevState + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };
  console.log(books);

  return (
    <Container maxWidth="lg" style={{ borderRadius: '4px', marginTop: '30px' }}>
      <StyledInput
        placeholder="Search for a book"
        onChange={handleSearch}
        value={query}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle visibility"
            >
              <Search color="secondary" />
            </IconButton>
          </InputAdornment>
        )}
      />
      <BooksWrapper>
        {
          books && books.map((book, index) => {
            if (books.length === index + 1) {
              return (
                <StyledCard ref={lastBookElementRef}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {book.title_suggest}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h4">
                        {book.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {book.last_modified_i}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              );
            }
            return (
              <StyledCard>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book.title_suggest}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h4">
                      {book.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {book.last_modified_i}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            );
          })
        }
      </BooksWrapper>
      {
        loading && (
          <Loading>
            <CircularProgress color="secondary" />
          </Loading>
        )
      }
      {
        error && <Alert severity="error">This is an error alert — check it out!</Alert>
      }
    </Container>
  );
}
