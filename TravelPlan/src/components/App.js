import React, {Component} from 'react';
import NavBar from "./NavBar"
import TopBar from "./TopBar"
import Main from "./Main"
import { TOKEN_KEY } from './utils/constants';
import Detail from "./Detail"

class App extends Component{
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    }
    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
         this.setState({ isLoggedIn: false });
        window.history.back()
    }


    handleLoginSucceed = (token) => {
        console.log('token --- ', token)
        localStorage.setItem(TOKEN_KEY, token)
        this.setState({ isLoggedIn: true });
    }

    render(){
        return (
            <div className="App">
                <TopBar handleLogout={this.handleLogout}
                        isLoggedIn={this.state.isLoggedIn}
                />

                <Main
                    handleLoginSucceed={this.handleLoginSucceed}
                    isLoggedIn={this.state.isLoggedIn}
                />
                {/*<Detail/>*/}
            </div>
        );
    }
}

export default App;
