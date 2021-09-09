import { GetStaticProps } from 'next';
import Header from '../components/Header';

const Home = () => {
  return <Header />;
};

const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {},
  };
};

export default Home;
