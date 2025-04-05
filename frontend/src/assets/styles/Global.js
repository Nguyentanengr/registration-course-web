import { createGlobalStyle } from "styled-components";
import { Theme } from "./Theme";

const GlobalStyles = createGlobalStyle`

@keyframes anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  background: ${Theme.body};
  color: ${Theme.text};
}

body::-webkit-scrollbar {
  width: 5px;
}
 
body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

body.no-scroll {
  overflow: hidden; /* Disable scroll when adding class "no-scroll"*/
}


a {
  color: ${Theme.text};
  text-decoration: none;
  cursor: pointer;
}

img {
  width: 100%;
}

ul li {
    list-style: none;
}

p {
    opacity: 0.75;
}

.app {
  display: block;
}

.wrap-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

button, input {
  font-family: 'Inter', system-ui, -apple-system;
  background-color: transparent;
  font-size: 16px;
}

`;



export default GlobalStyles;