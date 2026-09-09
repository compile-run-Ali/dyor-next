import HomeBase from "@/components/Home";
import { Web3ReactProvider } from "@web3-react/core";
import Head from "next/head";

const index = () => {
  return (
    <Web3ReactProvider>
      <div>
        <Head>
          <meta name="description" content="Dyor App Dashboard Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HomeBase />
      </div>
    </Web3ReactProvider>
  );
};

export default index;
