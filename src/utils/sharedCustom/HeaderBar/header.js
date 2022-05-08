import Cookies from "js-cookie";
import randomColor from "randomcolor";
import { useState } from "react";
import { MdFacebook, MdOutgoingMail } from "react-icons/md";
import { When } from "react-if";
import { useHistory } from "react-router-dom";
import './styled.css';

const Header = () => {
    var color = randomColor()
    const history = useHistory();
    const getUserName = document.cookie?.replace("token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NDAiLCJleHAiOjE3Mjk0ODA2NTksImlhdCI6MTY0MzA4MDY1OX0.-yAjNmRzMKA6Sg5mj1qAu_TNKpWtlGgQBi05oPHiOcYek4oPxEdyVt3ASVl0aGY4Q6a0MD1-e7DCt8oCvtvXww", "")
    const [showContextMenu, setShowContextmenu] = useState(false)
    const onClickContextMenu = () => setShowContextmenu(!showContextMenu)
    const changePassworkPage = () => {
        history.push('/Change-password');
    }
    const logOut = () => {
        Cookies.remove('token');
        history.push('/login');
    }
    return (
        <div className="header">
            <div className="logo">
                <img className="logo_img" src="https://cdn.dribbble.com/users/384646/screenshots/10774919/media/1a5d0064ae5c47ef6d2e1292c32dd7a0.png" />
                <div class="stage">
                    <div class="wrapper">
                        <div class="slash"></div>
                        <div class="sides">
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                            <div class="side"></div>
                        </div>
                        <div class="text">
                            <div class="text--backing"><span style={{ color: '00796b' }}>SVC</span></div>
                            <div class="text--left">
                                <div class="inner"><span style={{ color: '00796b' }}>SVC</span></div>
                            </div>
                            <div class="text--right">
                                <div class="inner"><span style={{ color: '00796b' }}>SVC</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="action-btn">
                <h2 class="links" onClick={() => history.push("/")}>Home Page</h2>
                <h2 class="links" onClick={() => history.push("/about")}>About</h2>
                <h2 class="links" onClick={() => history.push("/ratting")}>Ratting</h2>
                <h2 class="links" onClick={() => history.push("/blog")}>Blog SVC</h2>
                <h2 class="links" onClick={() => history.push("/files")}>Files</h2>

                <div class="avatar" style={{ background: color, cursor: 'pointer' }} onClick={onClickContextMenu}>
                    <div class="avatar__letters">
                        {getUserName && getUserName?.slice(0, 2).toUpperCase()}
                    </div>
                    <div class="online-indicator">
                        <span class="blink"></span>
                    </div>
                </div>

                <When condition={showContextMenu}>
                    <div className='menu-context-home background_calling_color'>
                        <h2 style={{ color: '#00796b', fontSize: '18px' }}>{getUserName} !</h2>
                        <ul>
                            <li><a onClick={changePassworkPage}>Change password</a></li>
                            <li><a onClick={logOut}>Logout</a></li>
                        </ul>
                    </div>
                </When>

            </div>
        </div>
    );
};
export default Header;