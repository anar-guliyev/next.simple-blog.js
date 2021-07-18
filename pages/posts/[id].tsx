import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import { useToast } from "@hooks";
import { Section, Loading } from "@components";

const StyledDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  alig-items: center;
  justify-content: center;
  img {
    width: 400px;
    height: 250px;
    border-radius: 7px;
  }
  .info {
    h1 {
      font-size: 1.8rem;
    }
  }
  input {
    margin-top: 1rem;
    padding: 2px 8px;
    width: 100%;
    height: 30px;
    border: 1px solid #738a94;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
  button {
    margin-top: 1rem;
    cursor: pointer;
    width: 100%;
    height: 2.5rem;
    color: white;
    background-color: #5cb85c;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    line-height: 1.5rem;
    &:hover {
      background-color: #449d44;
    }
  }
  @media (max-width: 500px) {
    width: 80%;
    img {
      width: 100%;
    }
  }
`;

const SinglePost: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [text, setText] = React.useState("");
  const [params, setParams] = React.useState({
    title: "",
    body: "",
  });

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://simple-blog-api.crew.red/posts/${id}?_embed=comments`
    );
    if (response) {
      setLoading(false);
      if (response.data) {
        setParams({
          title: response.data.title,
          body: response.data.body ? response.data.body : response.data.text,
        });
        setComments(response.data.comments);
      }
    }
  };

  const onSubmit = async () => {
    if (text.trim() == "") {
      toast.fire({
        icon: "error",
        title: "Field should be filled",
      });
      return;
    }
    setLoading(true);
    const response = await axios.post(
      "https://simple-blog-api.crew.red/comments",
      { body: text, postId: parseInt(id as string) }
    );
    if (response) {
      setLoading(false);
      if (response.status == 201) {
        setText("");
        loadData();
        toast.fire({
          icon: "success",
          title: "Succesfully added",
        });
      }
    }
  };

  React.useEffect(() => {
    id && loadData();
  }, [id]);

  return (
    <Section>
      {loading && <Loading />}
      <Head>
        <title>{params.title}</title>
      </Head>
      <StyledDiv>
        <img
          src={`https://picsum.photos/id/${id ? id : "74"}/680/380`}
          alt="random-picture"
        />
        <div className="info">
          <h1>{params.title}</h1>
          <p>{params.body}</p>
        </div>
        <h3 style={{ textAlign: "start", fontSize: "1.4rem" }}>Comments</h3>
        <div>
          {comments.map((comment: any, key) => {
            return (
              <div
                key={comment.id}
                className="text-ellipsis"
                style={{
                  textAlign: "start",
                  fontSize: "1rem",
                  margin: "1rem 0",
                }}
              >
                {key + 1} - {comment.body}
              </div>
            );
          })}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button>Add Comment</button>
          </form>
        </div>
      </StyledDiv>
    </Section>
  );
};

export default SinglePost;
