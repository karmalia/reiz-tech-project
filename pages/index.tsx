import FilterBar from '@/components/FilterBar/FilterBar';
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { COUNTRY_OBJECT, ARRAY_OF_COUNTRIES } from '@/utils/InterfacesAndTypes';
import CountriesList from '@/components/Countries/CountriesList';
import { SET_COUNTRIES } from '@/Features/countriesSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

interface Props {
  data: ARRAY_OF_COUNTRIES;
}

const Home: React.FC<Props> = ({ data }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SET_COUNTRIES(data));
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
          integrity='sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </Head>
      <main>
        {/* Navbar */}
        <Navbar />
        <FilterBar />
        {/* Filter Bar */}
        <CountriesList />
        {/* Footer */}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const countries = await axios.get('https://restcountries.com/v2/all');

  //To prevent stale data, revalidation timer setted: One week
  return {
    props: {
      data: countries.data,
    },
    revalidate: 604800,
  };
};

export default Home;
