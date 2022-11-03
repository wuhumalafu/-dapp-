pragma solidity >=0.4.22 <0.6.0;

contract demo{
   enum ProposalStatus { Continuing , Agree , Oppose}
   enum VoteResult{Agree,Oppose}
   struct Proposal{
        uint id;
        uint agreed;
        uint opposed;
        string name;
        string description;
        uint StartTime;
        uint EndTime;
        uint tot;
        address payable proposer;
        ProposalStatus prostatus;
   }
   struct Vote{
       address voter;
       uint proposalid;
       VoteResult result;
   }
   
   uint public proIndex;
   uint public voteIndex;
   mapping (uint => address[]) public proposalvote; 
   mapping (uint => Vote) public votes;
   mapping (uint => Proposal) public proposals;
   
   constructor() payable public{
        proIndex = 0;
        voteIndex = 0;
   }
   
   function addProposal(string memory _name, string memory _description, 
   uint _starttime , uint _endtime)payable public{
       require(_endtime>_starttime,"Start time should be earlier than end time.");
       Proposal memory pro = Proposal(proIndex,0,0,_name,_description,
       _starttime,_endtime,0,msg.sender,ProposalStatus.Continuing);
       proposals[proIndex] = pro;
       proIndex += 1;
   }
   
   function check(uint _proid) payable public{
       require(proposals[_proid].prostatus==ProposalStatus.Continuing);
       Proposal storage pro = proposals[_proid];
       if (pro.EndTime<now){
           if (pro.agreed>pro.opposed){
               pro.prostatus = ProposalStatus.Agree;
               pro.proposer.transfer(msg.value);
           }
           else{
               pro.prostatus = ProposalStatus.Oppose;
           }
       }
   }
   function vote(uint _proid, uint _result)payable public{
       Proposal memory pro = proposals[_proid];
       uint label=1;
       require(now >= pro.StartTime,"Current time should be later than start time");
       require(now <= pro.EndTime,"Current time should be earlier than end time");
       for (uint i=0;i<voteIndex;i++){
           if (votes[i].voter==msg.sender && votes[i].proposalid==_proid){
               label=0;
               break;
           }
       }
       require(label==1,"you have already voted");
            Vote memory vote = Vote(msg.sender,_proid,VoteResult.Oppose);
            if (_result==1){
                vote.result = VoteResult.Agree;
                proposals[_proid].agreed += 1;
            }
            else{
                proposals[_proid].opposed += 1;
            }
           votes[voteIndex] = vote;
           voteIndex += 1;
       
   }
   function getDate() public view returns(uint ){
        return now;
    }
}