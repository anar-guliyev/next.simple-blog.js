import React from "react";
import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Section, SecondaryArticle, Loading } from "@components";

interface article {
  title: string;
  body: string;
  id: number;
}

const ScrollLoader = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #738a94;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: none;
  border-radius: 50%;
  background-color: #738a94;
  i {
    &.arrow {
      border: solid #efefef;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
    }
    &.up {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }
  }
`;

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const loader: any = React.useRef();
  const data = useSelector((state: any) => state.postsData);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const limit = 10;

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 500) {
      setVisible(false);
    }
  };

  const loadData = async (mode?: any) => {
    setLoading(true);

    const response = await axios.get("https://simple-blog-api.crew.red/posts");
    if (response) {
      setLoading(false);
      setCount(response?.data?.length);
      if (mode == "reload") {
        const listData = response?.data?.reverse().slice(0, 0 + limit);
        dispatch({
          type: "SET_POSTS",
          payload: listData,
        });
        return;
      }
      const listData = response?.data?.reverse().slice(skip, skip + limit);
      if (skip) {
        dispatch({
          type: "SET_POSTS",
          payload: data.concat(listData),
        });
      } else {
        dispatch({
          type: "SET_POSTS",
          payload: listData,
        });
      }
    } else {
      dispatch({
        type: "SET_POSTS",
        payload: [],
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    loadData();
    return () => {
      null;
    };
  }, []);

  React.useEffect(() => {
    skip && loadData();
  }, [skip]);

  React.useEffect(() => {
    if (count > limit && loader.current) {
      new IntersectionObserver(
        (entities) => {
          if (entities[0].isIntersecting) {
            setSkip((prevSkip) => prevSkip + limit);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1,
        }
      ).observe(loader.current);
    }
  }, [count, data]);

  return (
    <Section>
      <Head>
        <title>Latest Posts</title>
      </Head>
      {loading && <Loading />}
      {visible && (
        <Button onClick={scrollToTop}>
          <i className="arrow up" />
        </Button>
      )}
      {data.length > 0 &&
        data.map((article: article, key: number) => {
          return (
            <SecondaryArticle
              reload={() => {
                setSkip(0);
                loadData();
              }}
              postsPage
              description={article?.body}
              newsTitle={article.title}
              imgNumber={key}
              id={article.id}
              key={key}
            />
          );
        })}
      {!loading && count > limit && skip + limit <= count && (
        <ScrollLoader ref={loader}>
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </ScrollLoader>
      )}
    </Section>
  );
};

export default Posts;
