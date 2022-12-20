import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Welcome from './Pages/Welcome'
import Changepassword from './Pages/Changepassword'
import Changename from './Pages/changename'

const App = () => {
    return (
        <div className="App">
            <Router>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/welcome" component={Welcome}/>
                <Route path="/changes" component={Changepassword}/>
                <Route path="/changename" component={Changename}/>
            </Router>
        </div>
    )
}

export default App
