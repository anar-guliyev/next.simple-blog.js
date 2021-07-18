import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import { useToast } from "@hooks";
import { Section, Loading } from "@components";

const StyledForm = styled.form`
  width: 40%;
  margin: 0 auto;
  margin-top: 10vh;
  h1 {
    margin-bottom: 2rem;
    font-size: 1.7rem;
  }
  .form-group {
    width: 100%;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    input {
      width: 100%;
      height: 2rem;
      border: none;
      border-bottom: 2px solid #e4eaed;
      &:focus {
        outline: none;
      }
    }
    label {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
  button {
    cursor: pointer;
    width: 100%;
    height: 3rem;
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
  @media (max-width: 700px) {
    width: 80%;
  }
`;

const CreatePost: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [params, setParams] = React.useState({
    title: "",
    body: "",
  });

  const onSubmitHandler = async (e: any) => {
    if (params.title.trim() == "" || params.body.trim() == "") {
      toast.fire({
        icon: "error",
        title: "Both fields should be filled",
      });
      return;
    } else {
      setLoading(true);
      e.preventDefault();
      const response = await axios.post(
        "https://simple-blog-api.crew.red/posts",
        {
          ...params,
        }
      );
      if (response) {
        setLoading(false);
        toast.fire({
          icon: response.status === 201 ? "success" : "error",
          title:
            response.status === 201
              ? "Created Succesfuly"
              : "Something went wrong",
        });
        if (response.status == 201) {
          router.push("/");
          setParams({
            title: "",
            body: "",
          });
        }
      }
    }
  };

  return (
    <Section>
      {loading && <Loading />}
      <Head>
        <title>Add a new post</title>
      </Head>
      <StyledForm onSubmit={onSubmitHandler}>
        <h1>Add a new Post</h1>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={params.title}
            onChange={(e) => {
              setParams((previousParams) => ({
                ...previousParams,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={params.body}
            onChange={(e) => {
              setParams((previousParams) => ({
                ...previousParams,
                body: e.target.value,
              }));
            }}
          />
        </div>
        <button>Submit</button>
      </StyledForm>
    </Section>
  );
};

export default CreatePost;
