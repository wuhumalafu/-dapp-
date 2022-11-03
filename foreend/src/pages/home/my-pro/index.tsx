import React, {Component} from "react";
import {Button, Form, Input, List, Modal} from "antd";

import web3 from "../../../utils/web3";
import contract from "../../../utils/contracts";
import CardMyPRO from "../../../components/card/card-my-pro";
class MyPRO extends Component {

    state ={
        Pros: [],
        isConnected: false,
        address: ""
    }

    async componentDidMount() {
        let accounts = await web3.eth.getAccounts()
        if(accounts.length == 0) {
            this.setState({
                isConnected: false
            })
        }
        else {
            await this.setState({
                isConnected: true,
                address: accounts[0]
            })

            let numPROs = await contract.methods.proIndex().call();
            console.log(numPROs);
            let pros = [];
            for(let i = 0; i < numPROs; i++) {
                const pro = await contract.methods.proposals(i).call();
                this.formatPRO(pro, i)
                
                if(pro.proposer == this.state.address) {
                    pros.push(pro);
                    console.log(pro);
                }
            }
            console.log(pros);
            this.setState({
                Pros: pros,
            })
        }
    }

    private formatPRO(data: any, index: number) {
        data.id = index;
    }



    render() {
        // @ts-ignore
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.Pros}
                    renderItem={(item) => (
                        <List.Item>
                            <CardMyPRO pro={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default MyPRO;