import React from 'react';
import Router from "./routers";
// import AuthRouter from '@src/routers/utils/authRouter';
import './App.less'


const App:React.FC = () => {

  return (
    <div  className='App'>

        {/* <AuthRouter> */}
          <Router />
        {/* </AuthRouter> */}

    </div>
       
  );
}
export default App;
