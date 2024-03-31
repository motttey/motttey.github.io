"use client";
import useSWR from "swr";
import { useState, useEffect, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

import { useSearchParams } from "next/navigation";
import { Grid, Image, Alert, TagsInput, Divider, Box } from "@mantine/core";

import styles from "@/app/page.module.css";
import { Illust, Tag } from "@/types/api";

const chunkArray = (array: Array<Illust>) => {
  const results = [];
  let count = 0;

  while (count < array.length) {
    if (results.length % 2 === 0) {
      // 偶数行: 4要素
      results.push(array.slice(count, count + 4));
      count += 4;
    } else {
      // 奇数行: 3要素
      results.push(array.slice(count, count + 3));
      count += 3;
    }
  }

  return results;
};

const isProd = process.env.NODE_ENV === "production";
const prefixPath = isProd ? "/mochiduko-24" : "";

const fetchUrl = (id: string) =>
  `https://embed.pixiv.net/decorate.php?illust_id=${id || ""}&mode=sns-automator`;
const fetchPixivLink = (id: string) =>
  `https://www.pixiv.net/artworks/${id || ""}`;

const IllustList: React.FC<{ initialContentsList: Array<Illust> }> = (props: {
  initialContentsList: Array<Illust>;
}) => {
  const fetcher = () =>
    fetch(prefixPath + "/api/mochiduko").then((res) => {
      return res.json();
    });

  const { data, error, isValidating } = useSWR("/api/mochiduko", fetcher, {
    refreshInterval: 0,
  });

  const [filterdIllusts, setFilteredIllusts] = useState([] as Array<Illust>);
  const [groupedIllusts, setGroupedIllusts] = useState(
    [] as Array<Array<Illust>>,
  );

  const searchParams = useSearchParams();
  /*
  const router = useRouter()
  const pathname = usePathname()
  */

  const searchParamsQueryList: Array<string> =
    searchParams.get("query" || "")?.split(",") || [];
  const [queryList, setQueryList] = useState(searchParamsQueryList);

  const fetchedIllust: Array<Illust> = useMemo(
    () =>
      props.initialContentsList && !isValidating
        ? data?.illusts
        : props.initialContentsList || [],
    [data?.illusts, isValidating, props.initialContentsList],
  );

  useEffect(() => {
    const filterdIllusts = (
      queryList.length > 0
        ? fetchedIllust.filter((illust: Illust) =>
            queryList.some(
              (query) =>
                illust.title.includes(query) ||
                illust.tags.some((tag: Tag) => tag.name === query),
            ),
          )
        : fetchedIllust
    ).sort(() => Math.random() - 0.5);
    setFilteredIllusts(filterdIllusts);

    /*
    if (queryList.length > 0) {
      const params = new URLSearchParams()
      params.set('query', queryList.join(','))
      router.replace(pathname + '?' + params.toString());
    } else {
      router.replace(pathname);
    }
    */
  }, [queryList, fetchedIllust]);

  useMemo(() => {
    const groupedIllusts = chunkArray(filterdIllusts);
    setGroupedIllusts(groupedIllusts);
  }, [filterdIllusts]);

  if (error)
    return (
      <Alert
        variant="light"
        color="red"
        title="Failed to load"
        style={{
          minWidth: "80vw",
        }}
      >
        failed to load
      </Alert>
    );

  if (!fetchedIllust || fetchedIllust.length === 0)
    return <div>loading...</div>;

  const handleClick = (e: { clientX: number; clientY: number }) => {
    const canvas = document.getElementById("fluidCanvas");
    if (canvas) {
      // 新しいイベントを作成し、Canvasに発火させる
      const event = new MouseEvent("click", {
        clientX: e.clientX,
        clientY: e.clientY,
      });
      canvas.dispatchEvent(event);
    }
  };

  return (
    <div
      className={styles.illustContainer}
      id="illustContainer"
      onClick={handleClick}
    >
      <Grid my="lg">
        <Grid.Col>
          <Divider
            className={styles.commonDivider}
            label={
              <>
                <Box ml={5}>
                  <h3>望月田吾作のイラスト</h3>
                </Box>
              </>
            }
          />
          <TagsInput
            my={10}
            mx={100}
            data={[]}
            value={queryList}
            placeholder="Please input keywords"
            onChange={setQueryList}
          />
          <Divider
            my="md"
            size="xs"
            style={{
              width: "80%",
              margin: "0 auto",
            }}
            label={
              <>
                <Box ml={5}>Search results</Box>
              </>
            }
          />
        </Grid.Col>
      </Grid>
      <Virtuoso
        style={{
          width: "80vw",
          maxWidth: "1200px",
          height: "100vh",
          margin: "0 auto",
        }}
        className={styles.hexContainer}
        data={groupedIllusts}
        totalCount={groupedIllusts.length}
        itemContent={(groupIdx, group) => {
          return (
            <div
              className={`${styles.hexRow} ${
                groupIdx % 2 === 0 ? styles.hexRowEven : styles.hexRowOdd
              }`}
              style={{
                visibility: isValidating ? "hidden" : "visible",
                overflow: "hidden",
              }}
              key={groupIdx}
            >
              {group.map((illust, index) => (
                <div
                  className={styles.hex}
                  key={index.toString() + "_" + illust.id}
                  style={{
                    minHeight: "50px",
                  }}
                >
                  <a
                    href={fetchPixivLink(illust.id.toString())}
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${index}_${illust.id.toString()}`}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={fetchUrl(illust.id.toString())}
                        alt={illust.title}
                        style={{ objectFit: "cover" }}
                        className={styles.illustImage}
                        loading="eager"
                        fallbackSrc="https://placehold.co/600x400?text=Loading..."
                      />
                      <p>{illust.title}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default IllustList;
