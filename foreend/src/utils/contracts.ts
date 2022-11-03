import demo from './demo.json'
import web3 from './web3'

var contractAddr = "0xf9246FcB4Ba99a7d38543F29EBBbAcB1bB7F5214"
const demoABI = demo.abi

// @ts-ignore
const contract = new web3.eth.Contract(demoABI, contractAddr);

export default contract
