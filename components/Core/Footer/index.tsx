import React from "react";
import styled from "styled-components";

const FooterConatiner = styled.footer`
  height: 100px;
  width: 100%;
  padding: 0 1rem;
  background-color: #15171a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e5eff5;
  .link-container {
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterConatiner>
      <div className="link-container">
        <a href="https://www.linkedin.com/in/anar-guliyev">
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "white",
            }}
            src="https://img.icons8.com/metro/452/linkedin.png"
            alt="linkedIn"
          />
          <div>My LinkedIn account</div>
        </a>
      </div>
      <div className="link-container">
        <a href="https://github.com/anarguliyev-ag/nextJs-blog">
          <img
            style={{ width: 50, height: 50, borderRadius: "50%" }}
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="github"
          />
          <div>WebSite's source code</div>
        </a>
      </div>
      <div className="link-container">
        <a href="https://www.youtube.com/watch?v=zthQPe41w24">
          <img
            style={{ width: 50, height: 50, borderRadius: "50%" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/YouTube_dark_icon_%282017%29.svg/1200px-YouTube_dark_icon_%282017%29.svg.png"
            alt="github"
          />
          <div>And a nice song to listen</div>
        </a>
      </div>
    </FooterConatiner>
  );
};
