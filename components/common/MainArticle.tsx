import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  newsTitle?: string;
  imgNumber?: number;
  description?: string;
  id?: number;
}

const ArticleContainer = styled.article`
  cursor: pointer;
  height: 380px;
  margin: 1rem 0;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e4eaed;
  width: 100%;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    border-radius: 3px;
    height: 100%;
    width: 70%;
  }
  .info {
    height: 100%;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    overflow: hidden;
    .title {
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    .short-description {
      color: #738a94;
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }
    .user {
      display: flex;
      align-items: center;
      justify-content: start;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .user-info {
        margin-left: 1rem;
        .username {
          color: #434952;
          font-weight: 600;
          fontsize: 12px;
        }
        .date-and-time {
          font-size: 12px;
          color: #90a2aa;
          span {
            margin: 0 5px;
          }
        }
      }
    }
  }
  @media (max-width: 750px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    img {
      width: 100%;
    }
    .info {
      margin-left: 0px;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .title {
        margin-bottom: 0.5rem;
      }
      .short-description {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export const MainArticle: any = ({
  description,
  imgNumber,
  newsTitle,
  id,
}: Props) => {
  return (
    <Link href={`posts/${id}`}>
      <ArticleContainer className="main-article">
        <img
          src={`https://picsum.photos/id/${imgNumber}/680/380`}
          alt="random-picture"
        />
        <div className="info">
          <h2 className="title text-ellipsis">{newsTitle || "NoData"}</h2>
          <p className="short-description text-ellipsis">
            {description || "NoData"}
          </p>
          <div className="user">
            <img src={`https://picsum.photos/id/${id}/680/380`} alt="avatar" />
            <div className="user-info">
              <div className="username">Anar Guliyev</div>
              <div className="date-and-time">
                26.07.1999 <span className="bull">•</span> 5min
              </div>
            </div>
          </div>
        </div>
      </ArticleContainer>
    </Link>
  );
};
