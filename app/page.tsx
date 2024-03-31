import { Suspense } from "react";

import { Illust } from "@/types/api";
import IllustList from "@/components/IllustList";
import Profile from "@/components/Profile";
import styles from "./page.module.css";

interface PrefetchResponse {
  data: Array<Illust>;
}

const getData = async () => {
  // 1時間ごとにprefetchする
  let res: Array<Illust> = new Array<Illust>();

  if (process.env.DEPLOY_MODE === "SSR") {
    res = await fetch("https://mochiduko-api.netlify.app/each_illusts.json", {
      next: { revalidate: 60 * 60 },
    }).then((res) => res.json());
  }

  return {
    data: res,
  };
};

// This component passed as fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.

// https://nextjs.org/docs/messages/deopted-into-client-rendering
function SearchBarFallback() {
  return <>placeholder</>;
}

import dynamic from "next/dynamic";
import EgoLink from "@/components/EgoLink";
import MyWork from "@/components/MyWork";

const DynamicComponent = dynamic(
  () => import("@/components/Canvas"), // コンポーネントのパスを指定
  { ssr: false }, // サーバーサイドレンダリングを無効にする
);

export default async function Page() {
  let initialContentsList: Array<Illust> = new Array<Illust>();

  if (process.env.DEPLOY_MODE === "SSR") {
    const res: PrefetchResponse = await getData();
    initialContentsList = res.data;
  }

  return (
    <>
      <main className={styles.main} id="mainLayout">
        <Profile></Profile>
        <MyWork></MyWork>
        <EgoLink></EgoLink>
        {/* Worksを作る */}
        <Suspense fallback={<SearchBarFallback />}>
          <IllustList initialContentsList={initialContentsList}></IllustList>
        </Suspense>
      </main>
      <DynamicComponent></DynamicComponent>
    </>
  );
}
