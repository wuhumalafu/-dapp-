// @ts-nocheck
import React,{Component} from 'react'
import {PageHeader, Tabs, Button, Descriptions, Tag, Modal, Input, Form, Select, message} from 'antd';
import web3 from "../../utils/web3";
import contract from "../../utils/contracts";
const { Option } = Select;
/**
 * footer
 */
 interface IProps {
    pro: any
}

class CardAll extends Component<IProps> {

    formRef = React.createRef()

    constructor(props: IProps) {
        super(props)
    }

    state = {
        modalVisible: false,
        tabInUse: 1,
        isConnected: false,
        address: "",
        buttonDisable: true,
        tagColor: "blue",
        ProState: "进行中",
        Proname:"",
        startTime:"",
        endTime:""
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
            let proposal = this.props.pro;
            let flag = 0;
            let curTime = new Date().getTime() / 1000;
            const proposal1 = await contract.methods.proposals(proposal.id).call();
            if (proposal1.EndTime < curTime)
            {
                if (proposal1.agreed>proposal1.opposed){
                    flag = 1;
                }
                else{
                    flag = 2;
                }
            }
            ////console.log(product);
            if(flag == 1 ) {
                this.setState({
                    ProState: "赞同",
                    tagColor:"green"
                })
            }
            else if(flag == 2) {
                this.setState({
                    ProState: "反对",
                    tagColor:"red"
                })
            }
            else {
                this.setState({
                    ProState: "进行中",
                    tagColor:"blue"
                })
            }
            if(flag == 0) {
                this.setState({
                    buttonDisable: false
                })
            }
            this.setState({
                Proname: proposal.name,
                Prodes: proposal.description,
                startTime: this.formatTime(proposal.StartTime),
                endTime: this.formatTime(proposal.EndTime)
            })
        }
    }
    private formatTime(time: string) {
        var d = new Date(parseInt(time) * 1000);
        return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
    }
    // @ts-ignore
    Content = ({ children }) => (
        <div className="content">
            <div className="main" >{children}</div>
        </div>
    );

    async involveAucSubmit(values: any){
        let id = this.props.pro.id;
        var result=0;
        console.log(values);
        if (values.result=='支持'){
            result=1;
        }
        try {
            let ret = await contract.methods.vote(id,result).send({
                from: this.state.address,

            })
            message.success('投票成功!');
            window.location.href = '/home';
        }
        catch(e){
            console.log(e);
            message.error('投票失败，请检查！');
        }
    }


    renderContent = (column = 2) => (
        <Descriptions size="small" column={column}>
            <Descriptions.Item label="名字">{this.state.Proname}</Descriptions.Item>
            <Descriptions.Item label="活动描述">
                {this.state.Prodes}
            </Descriptions.Item>
            <Descriptions.Item label="投票开始时间">
                {this.state.startTime}
            </Descriptions.Item>
            <Descriptions.Item label="截止时间">
                {this.state.endTime}
            </Descriptions.Item>
            <Descriptions.Item label="支持票">
                {this.props.pro.agreed}
            </Descriptions.Item>
            <Descriptions.Item label="反对票">
                {this.props.pro.opposed}
            </Descriptions.Item>
        </Descriptions>
    );

    render() {
        return (
            <div style={{boxShadow: "2px 2px 1px 2px #888", margin: "5px"}}>
                <PageHeader
                    className="site-page-header-responsive"
                    title={this.props.pro.name}
                    tags={<Tag color={this.state.tagColor}>{this.state.ProState}</Tag>}
                    extra={[
                        <Button key="1" type="primary" disabled={this.state.buttonDisable} onClick={() => {
                            this.setState({
                                modalVisible: true
                            })
                        }}>
                            投票
                        </Button>
                    ]}
                >
                    <this.Content >{this.renderContent()}</this.Content>
                </PageHeader>
                <Modal
                    visible={this.state.modalVisible}
                    title="投票结果"
                    okText="提交"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}
                    onOk={() => {
                        this.formRef
                            .current
                            .validateFields()
                            .then((values: any) => {
                                // 重置表单并且提交表单
                                this.formRef.current.resetFields();
                                this.involveAucSubmit(values);
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
                            name="result"
                            label="投票结果"
                            rules={[{ required: true, message: '必须投票!' }]}
                        >
                            <Select
          allowClear
        >
          <Option value="支持">支持</Option>
          <Option value="反对">反对</Option>
        </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

    onTabChange = (activeKey: any) => {
        this.setState({
            tabInUse: activeKey
        })
    };
}

export default CardAll