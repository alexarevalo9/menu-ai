import { type NextPage } from "next";
import Head from "next/head";

import Sidebar from "@/components/Sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Menu AI</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Sidebar />
        <main className="lg:pl-72">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6"></div>
        </main>
      </div>
    </>
  );
};

export default Home;
