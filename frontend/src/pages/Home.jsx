import About from './Sub-components/About';
import Contact from './Sub-components/Contact';
import Hero from './Sub-components/Hero';
import MyApps from './Sub-components/MyApps';
import Portfolio from './Sub-components/Portfolio';
import Skills from './Sub-components/Skills';
import Timeline from './Sub-components/Timeline';

const Home = () => {
  return (
    <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14  '>
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <MyApps />
      <Contact />
    </article>
  );
};

export default Home;
