/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

// interface ImagesQueryResponse {
//   after?: {
//     id: string;
//   };
//   data: {
//     data: {
//       title: string;
//       description: string;
//       url: string;
//     };
//     ts: number;
//     ref: {
//       id: string;
//     };
//   }[];
// }

interface ImageProps {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
}


type PagesProps = {
  after: boolean;
  data: ImageProps[];
}

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function fetchImages({ pageParam = null }) {
    const { data } = await api.get<PagesProps>('/api/images', {
      params: {
        after: pageParam
      }
    })
    return data
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: page => page.after ? page.after : null,
  })

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data).flat();
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;
  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage ? (
          <Button
            mt={6}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage
              ? 'Carregando...'
              : hasNextPage
                ? 'Carregar mais'
                : 'Nothing more to load'}

          </Button>
        ) : ''}
      </Box>
    </>
  )
}