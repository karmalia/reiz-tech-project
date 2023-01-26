import FilterBar from '@/components/FilterBar/FilterBar';
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ARRAY_OF_COUNTRIES } from '@/utils/InterfacesAndTypes';
import CountriesList from '@/components/Countries/CountriesList';
import { SET_COUNTRIES } from '@/Features/countriesSlice';
import { useEffect } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import useDeclaredHooks from '@/components/DeclaredHooks/useDeclaredHooks';
import Footer from '@/components/Footer/Footer';

interface homeProps {
  data: ARRAY_OF_COUNTRIES;
}

const Home: React.FC<homeProps> = ({ data }: homeProps) => {
  const { dispatch, router } = useDeclaredHooks();
  useEffect(() => {
    dispatch(SET_COUNTRIES(data));
  }, []);

  useEffect(() => {
    //if there is no page query push user into page=1

    if (router.query.page && router.query.page !== '1') {
      router.push(`?page=${router.query.page}`, undefined, { shallow: true });
    }
  }, [router.query.page]);

  return (
    <>
      <Head>
        <title>REIZ TECH ASSESMENT</title>
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
        {/* NAVBAR */}
        <Navbar />
        {/* FILTER-BAR */}
        <FilterBar />
        {/* LIST */}
        <CountriesList />
        {/* PAGINATION */}
        <Pagination />
        {/* FOOTER */}
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
