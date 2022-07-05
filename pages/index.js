import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";

const welcomeUser = (userName, toastHandler = toast) => {
  toastHandler.success(
    `Welcome back${userName !== "Unnamed" ? ` ${userName}` : ""}!`,
    {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    }
  );
};

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

export default function Home() {
  const { address, connectWallet } = useWeb3();
  useEffect(() => {
    if (!address) {
      console.log("Adress Not");
      return;
    }
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };

      const result = await client
        .createIfNotExists(userDoc)
        .then(() => {
          console.log("User Created");
        })
        .catch((error) => {
          console.log(error.message);
        });

      welcomeUser(userDoc.userName);
    })();
  }, [address]);
  return (
    <div className={style.wrapper}>
      <Head>
        <title>Opensea</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet("injected")}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need Chrome, Edge or <br /> Firefox to be able to run this app.
          </div>
        </div>
      )}
    </div>
  );
}
