import React from "react";
import Head from "next/head";
import { Section } from "@components";

const About: React.FC = () => {
  return (
    <Section>
      <Head>
        <title>About the project</title>
      </Head>
      <h1 style={{ width: "100%", textAlign: "center" }}>About the project</h1>
      <div style={{ margin: "2rem 0", letterSpacing: "2px" }}>
        <p>
          The Main technologies that are used in the project are Redux, React,
          NextJs, TypeScript.
        </p>
        <p>
          Some 3rd party libraries such as axios and styledComponent are also
          used in the project.
        </p>
        <p>
          One of the little details that improves the UX is the usage of
          SwalAlert components.( You can see them in Add, Update, Delete and
          etc. pages )
        </p>
      </div>
      <h3 style={{ textAlign: "center", width: "100%" }}>Conclusion</h3>
      <div style={{ margin: "2rem 0", letterSpacing: "2px" }}>
        <p>
          This blog consists of 6 pages that every of them is highly responsive
          and user friendly. Users can create, update, delete, or can add
          comments to the posts. <br />
          Posts and Latest posts page load articles that are stored in redux
          store. Both of the pages have infinite scrolling method that improves
          the overall performance of the website.
          <br />
          In the page where you create new Posts all of the inputs are trimmed
          and checked before they are sent to the database to prevent dummy data
          entering the database. Same features were also applied to the Update
          Post page. After finishing the update or creation of a post you are
          going to be redirected to the main page of the website.
          <br />
          In the latest posts page after the deletion of a page tries to reload
          the posts list. But the fact that the deletion process goes really
          slow on the back-end side, the changes can not be reflected at the
          very time. But if you reload the page after 1 or 2 seconds pass the
          deletion, you can see that the choosen item has actually been deleted.
        </p>
      </div>
    </Section>
  );
};

export default About;
