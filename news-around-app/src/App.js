// import logo from './logo.svg';
// import './App.css';
import * as React from 'react'
import CategoryFilter from './CategoryFilter';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
        <CategoryFilter />
    </ChakraProvider>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Welcome to the News Around app!
//         </p>
//       </header>
//     </div>
//   );
// }

export default App;
