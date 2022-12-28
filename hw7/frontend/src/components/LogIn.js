import {Input} from "antd"
import {UserOutlined} from "@ant-design/icons";

const LogIn = ({me, onLogin, setName}) => {
    return(
        <Input.Search
            prefix = {<UserOutlined />}
            placeholder="Enter your name"
            defaultValue = {me}
            onChange = {e => setName(e.target.value)}
            enterButton="Sign In"
            size="large"
            style = {{width:300, margin: 50}}
            onSearch = {name => onLogin(name)}
        />
         
    );
}

export default LogIn