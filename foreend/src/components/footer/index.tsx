import React,{Component} from 'react'
import { Layout } from 'antd'
const { Footer } = Layout;

/**
 * footer
 */
class WebFooter extends Component {

    render() {
        return (
            <Footer style={{ textAlign: 'center', position:"fixed", bottom: 0, width:"100%" }}>
                ©2022 Created RYF - Course Project in ZJU Blockchain course
            </Footer>
        )
    }
}

export default WebFooter