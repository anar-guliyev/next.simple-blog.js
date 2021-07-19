import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import styled from "styled-components";

interface Props {
  postsPage?: boolean;
  newsTitle?: string;
  imgNumber?: number;
  description?: string;
  id?: number;
  reload?: any;
}

const SecondaryArticleContainer = styled.article`
  padding: 1rem 0;
  display: flex;
  width: 49%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  img {
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    .actions {
      button {
        margin: 0 1rem;
        color: white;
        border: none;
        width: 5rem;
        height: 2rem;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
      }
      button:first-of-type {
        background-color: #5cb85c;
      }
      button:last-of-type {
        background-color: red;
      }
    }
    .title {
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    .short-description {
      color: #738a94;
      font-size: 1.125rem;
      max-width: 200px;
    }
    .user {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: start;
      margin-top: 1rem;
      max-width: 70%;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0;
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
  &.large {
    width: 100%;
    flex-direction: row;
    height: 230px;
    align-items: center;
    img {
      width: 40%;
      height: 100%;
      margin: 0 1rem 0 0;
    }
    .info {
      img {
        margin: 0;
      }
    }
  }
  @media (max-width: 750px) {
    width: 100%;
  }
  @media (max-width: 950px) {
    &.large {
      flex-direction: column;
      height: auto;
      img {
        width: 100%;
        margin: 1rem 0;
      }
      .user {
        flex-wrap: wrap;
        button {
          margin: 1rem 0rem;
        }
        button.btn {
          width: 100% !important;
          margin: 0.5rem 0.25rem;
        }
        .actions {
          width: 100%;
          display: flex;
          justify-content: space-between;
          button {
            width: 48%;
            margin: 0.5rem auto;
          }
        }
      }
    }
  }
`;

export const SecondaryArticle = ({
  postsPage = false,
  imgNumber,
  newsTitle,
  id,
  description,
  reload,
}: Props) => {
  const router = useRouter();

  const onDelete = (id: any) => {
    Swal.fire({
      title: "Do you want to delete the post?",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response: any = await axios.delete(
          `https://simple-blog-api.crew.red/posts/${id}`
        );
        if (response || response.status == 200) {
          Swal.fire("Deleted!", "", "success");
          setTimeout(reload, 500);
        }
      }
    });
  };

  return (
    <SecondaryArticleContainer
      className={`secondary-article${postsPage && " large"}`}
    >
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
          <img
            src={`https://picsum.photos/id/${
              imgNumber ? imgNumber + 3 : ""
            }/680/380`}
            alt="avatar"
          />
          <div className="user-info">
            <div className="username">Anar Guliyev</div>
            <div className="date-and-time">
              26.07.1999 <span className="bull">•</span> 5min
            </div>
          </div>
          {postsPage && (
            <div className="actions">
              <button
                onClick={() => {
                  router.push(`posts/update/${id}`);
                }}
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              >
                Delete
              </button>
            </div>
          )}
          <Link href={`posts/${id}`}>
            <button
              className="btn"
              style={{
                border: "none",
                borderRadius: 7,
                width: "7rem",
                cursor: "pointer",
                height: "2rem",
              }}
            >
              Go to the post
            </button>
          </Link>
        </div>
      </div>
    </SecondaryArticleContainer>
  );
};
