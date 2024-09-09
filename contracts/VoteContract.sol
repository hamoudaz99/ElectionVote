// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;
    import "@openzeppelin/contracts/interfaces/IERC721.sol";


    contract Voting {

        struct Candidate {
            string name;
            uint voteCount;
    }

        address public owner;
        mapping(address => bool) public voters;
        mapping(uint =>bool) public CheckNftVote;
        mapping(uint =>string) public NftId;
        Candidate[] public candidates;
        bool public votingEnded;
         address nftContract;

        constructor(string[] memory candidateNames,address _nftContract) {
            owner = msg.sender;
            for (uint i = 0; i < candidateNames.length; i++) {
                candidates.push(Candidate({
                    name: candidateNames[i],
                    voteCount: 0
                }));
            }
           nftContract=_nftContract;
        }

        modifier onlyOwner() {
            require(msg.sender == owner, "Only owner can call this function.");
            _;
        }

        modifier hasNotVoted() {
            require(!voters[msg.sender], "You have already voted.");
            _;
        }

        modifier votingNotEnded() {
            require(!votingEnded, "Voting has ended.");
            _;
        }

        modifier eligibility()
        {
        require(IERC721(nftContract).balanceOf(msg.sender) > 0,"You are not eligible !");
        _;
        }
        modifier checkNftIdOwnership(uint id)
    {
        require(IERC721(nftContract).ownerOf(id)==msg.sender);
        _;
    }
    
    function vote(uint candidateIndex,uint candidateNftIndex) public hasNotVoted votingNotEnded eligibility checkNftIdOwnership(candidateNftIndex)  {
            require(candidateIndex < candidates.length, "Invalid candidate index.");
            require(!CheckNftVote[candidateNftIndex], "This NFT have already voted");
            voters[msg.sender] = true;
            CheckNftVote[candidateNftIndex]=true;
            candidates[candidateIndex].voteCount += 1;
        }

        function endVoting() public onlyOwner {
            votingEnded = true;
        }

        function getCandidateCount() public view returns (uint) {
            return candidates.length;
        }

        function getCandidate(uint index) public view returns (string memory, uint) {
            require(index < candidates.length, "Invalid candidate index.");
            return (candidates[index].name, candidates[index].voteCount);
        
        }
        function checkEligibility(uint id) public view returns (bool)
        {
            if(IERC721(nftContract).ownerOf(id)==msg.sender) return true;
            return false;
        }
        
    }