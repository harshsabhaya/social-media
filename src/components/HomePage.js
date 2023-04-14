import React, { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';

import { useGetUserPostQuery } from '../store/user-posts/userPosts';
import FeedCard from './feedcard/FeedCard';
import Header from './Header';
import Loader from './Loader';

const HomePage = () => {
  const scrollRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const pageNumber = Number(searchParams.get('page'))
    ? Number(searchParams.get('page'))
    : 1;
  const { data, isFetching } = useGetUserPostQuery(pageNumber);
  // const [posts, setPosts] = useState([]);
  // console.log('number', searchParams.toString(), pageNumber);

  useEffect(() => {
    if (searchParams.get('page') === '1') {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // useEffect(() => {
  //   const newPosts = data?.data?.length > 0 ? data.data : [];
  //   setPosts((prev) => [...prev, ...newPosts]);
  // }, [data?.data]);

  // const handleScroll = () => {
  //   const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
  //   if (scrollTop + clientHeight + 1 === scrollHeight) {
  //     // setPage((prev) => prev + 1);
  //     setSearchParams({ page: pageNumber + 1 });
  //   }
  // };

  const handlePagination = (value) => {
    let count;
    if (value) {
      count = pageNumber + 1;
    } else {
      count = pageNumber - 1;
    }
    setSearchParams({ page: count });
  };

  return (
    <>
      <Header />
      <div
        // onScroll={handleScroll}
        ref={scrollRef}
        style={{ height: '100vh', overflowX: 'hidden' }}
      >
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'center', pt: '90px' }}
          spacing={2}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
                minWidth: '300px',
              }}
            >
              <Button
                variant={'contained'}
                disabled={pageNumber === 1}
                onClick={() => handlePagination(false)}
              >
                Prev
              </Button>
              <Button
                variant={'contained'}
                disabled={data?.data?.length <= 0}
                onClick={() => handlePagination(true)}
              >
                Next
              </Button>
            </div>
            {isFetching ? (
              <Loader />
            ) : data?.data?.length > 0 ? (
              data?.data.map((post) => <FeedCard key={post._id} post={post} />)
            ) : (
              <h3>No data Found</h3>
            )}
          </Box>
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
