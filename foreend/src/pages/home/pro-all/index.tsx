import React, {Component} from "react";
import {Button, Form, Input, List, Modal} from "antd";
import CardAll from "../../../components/card/card-all";

import web3 from "../../../utils/web3";
import contract from "../../../utils/contracts";

class PROAll extends Component {

    state ={
        Pros: [],
        ProNum: 0,
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
            let numPro = await contract.methods.proIndex().call();
            let pros = [];
            for(let i = 0; i < numPro; i++) {
                await contract.methods.check(i).call();
                const pro = await contract.methods.proposals(i).call();
                this.formatItem(pro, i)
                pros.push(pro);
            }
            this.setState({
                Pros: pros,
                ProNum: numPro
            })
        }
    }

    private formatItem(data: any, index: number) {
        ////console.log(data);
        data.proid = index;
        ////console.log(data)
    }

    render() {
        // @ts-ignore
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.Pros}
                    renderItem={(item ) => (
                        <List.Item>
                            <CardAll pro={item}/>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default PROAll;