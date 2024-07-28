import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${props => props.theme.fonts.primary};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.blockchain};
  }
  
  button {
    cursor: pointer;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 5px;
    font-size: 1rem;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: ${props => props.theme.colors.secondary};
    }
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid ${props => props.theme.colors.light};
    border-radius: 4px;
    font-size: 1rem;
  }
  
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;
