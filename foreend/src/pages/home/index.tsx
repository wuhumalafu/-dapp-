// @ts-nocheck
import React, {Component} from 'react';

import { Layout, Tabs, Button, Modal, Form, Input, InputNumber, message } from 'antd';

import PROAll from "./pro-all";
import MyPRO from "./my-pro";

import web3 from "../../utils/web3";
import contract from "../../utils/contracts";



const { Content } = Layout;
const { TabPane } = Tabs;


class HomePage extends Component {

    formRef = React.createRef()

    state = {
        modalVisible: false,
        isConnected: false,
        address: ""
    }

    async componentDidMount() {
        let accounts = await web3.eth.getAccounts()
        if (accounts.length == 0) {
            this.setState({
                isConnected: false
            })
        }
        else {
            await this.setState({
                isConnected: true,
                address: accounts[0]
            })
        }
    }


     async campaignFormSubmit(values: any){
        console.log(values);
        let PRODescription = values.PRODescription;
        let PROName = values.PROName;
        let curTime = new Date().getTime() / 1000;
        let duration = curTime + values.duration*24*60*60;
        curTime=Math.trunc(curTime);
        duration=Math.trunc(duration);
        console.log(PROName, PRODescription,curTime,duration);
        try {
            let ret = await contract.methods.addProposal(PROName, PRODescription,curTime,duration).send({
                from: this.state.address,
            })

            //console.log(dig);
            message.success('成功发布活动!');
            window.location.href = '/home';
        }
        catch(e){
            console.log(e);
            message.error('发布活动失败，请检查！');
        }
    }

    render() {

        // @ts-ignore
        return (
            <Content style={{ padding: '50px' }}>
                <Tabs defaultActiveKey="1" tabBarExtraContent={
                    <Button
                        disabled={!this.state.isConnected}
                        type={"primary"}
                        onClick={() => {
                            this.setState({
                                modalVisible: true
                            })
                        }}>
                        发布活动
                    </Button>
                }>
                    <TabPane tab="全部活动" key="1">
                        <PROAll />
                    </TabPane>
                    <TabPane tab="我的活动" key="2">
                        <MyPRO />
                    </TabPane>
                </Tabs >
                <Modal
                    visible={this.state.modalVisible}
                    title="发布活动"
                    okText="提交"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}
                    onOk={() => {
                        // @ts-ignore
                        this.formRef
                            .current
                            .validateFields()
                            .then((values: any) => {
                                // 重置表单并且提交表单
                                this.formRef.current.resetFields();
                                this.campaignFormSubmit(values);
                            })
                            .catch((info: any) => {
                                ////console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        ref={this.formRef}
                        layout="vertical"
                        name="campaignForm"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item
                            name="PROName"
                            label="活动名称"
                            rules={[{ required: true, message: '必须填写名称!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="PRODescription"
                            label="活动描述"
                        >
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item
                            name="duration"
                            label="投票开放时间/小时"
                            rules={[{ required: true, message: '必须填写投票开放时间!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>

        )
    }
}

export default HomePage;