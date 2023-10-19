import { type NextPage } from "next";
import Head from "next/head";

import Sidebar from "@/components/Sidebar/Sidebar";
import MainContent from "@/components/MainContent/MainContent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Menu AI</title>
        <meta name="description" content="Menu AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Sidebar />
        <main className="lg:pl-72">
          <div className="px-6 py-6 sm:px-6 md:px-6 lg:px-6 xl:px-6 2xl:px-52">
            <MainContent />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
