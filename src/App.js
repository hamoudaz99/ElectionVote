import "./App.css";
import React from "react";
import web3 from "./web3";
import vote from './vote';
import RNIImage from './img/RNI.jpg';
import PAMImage from './img/PAM.jpg' ;
import PIImage from './img/PI.png';


class App extends React.Component {

  state=
{
 RNI:'',
 PAM:'',
 PI:'',
 nft:'',
 nftVote:'',
 message:"Bienvenue au processus de vote , Patientez pendant qu'on vérifie votre éligibilité"
}
getNFTsFromOpenSea = async () => {
    const [userAddress]= await web3.eth.getAccounts();
    const fetch = require('node-fetch');
   const url = `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${userAddress}/nfts?collection=votenft-3`;
   const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      this.setState({ nft: json.nfts[0].identifier }); // Assimile à la varible nft l'identifiant de la nft de l'utilisteur dans la blockchain
      this.setState({message:"Vous êtes éligible au vote !"})
      return true;
    } catch (err) {
      this.setState({message:"Désolé . Vous n'êtes pas éligible au vote"});
      console.error('error:', err);
      return null;
    }
};

checkNftVote= async (id)=>
  {
    try
    {
    const checkNftVote= await vote.methods.CheckNftVote(id).call();
    this.setState({nftVote:checkNftVote});
    if(checkNftVote)
      {
   this.setState({message: 'Vous avez déja voté'});
      }


    }catch(err)
    {
      console.error('error',err);
      return null;
    }



  }

  vote = async(id,nftId)=>
  {
    try
    {
    const [userAddress]= await web3.eth.getAccounts(); // The wallet adress connected to the Dapp
    this.setState({message:"Vote en cours ... Prière de confirmer la transaction dans votre portefeuille"});
    //La fonction accepte 2 arguments l'id de l'un des parties , et l'id de la NFT pour des verifications onChain de l'éligibilité
    await vote.methods.vote(id,nftId).send(
      {
        from: userAddress
      }
    );
    const votedParti= await vote.methods.getCandidate(id).call();
    this.setState({message:`Merci! votre vote pour le parti ${votedParti[0]} a été traité`});
      
}catch(err)
    {
      console.error(err);
      return null;
    }
  }

async componentDidMount()
{
   // Apelle de la fonction getCandidate pour obtenir des informations sur les parties
  const RNI= await vote.methods.getCandidate(0).call(); 
  const PAM = await vote.methods.getCandidate(1).call();
  const PI = await vote.methods.getCandidate(2).call();
  const [userAddress]= await web3.eth.getAccounts();
  await this.getNFTsFromOpenSea();
  console.log(this.state.nft)
   if(this.state.nft) this.checkNftVote(this.state.nft);
  this.setState({RNI,PAM,PI,userAddress});


}
  render() {
  
    if(!this.state.nft)
      {
        return(
           <div className="App" >
        <div>
        <h2>Morocco Election Simulation</h2>
</div>
<hr />

        <h2>{this.state.message}</h2>
        <hr />
        <h2>Résultats en cours</h2>
        <div className="horizontal-container">
          <div className="item">
        <p><strong>{((this.state.RNI)[0])}</strong></p>
        <img src={RNIImage} className="small-image" alt="RNI LOGO"/>
        <p>Count : {String((this.state.RNI)[1])}</p>
          </div>
        <div className="item">
        <p ><strong>{((this.state.PAM)[0])}</strong></p>
        <img src={PAMImage} className="small-image" alt="PAM LOGO"/>
        <p>Count : {String((this.state.PAM)[1])}</p>
       </div>
        <div className="item">
        <p><strong>{((this.state.PI)[0])}</strong></p>
        <img src={PIImage} className="small-image" alt="PI LOGO"/>
        <p>Count : {String((this.state.PI)[1])}</p>
        </div>
        </div>
        <hr />
        
        
        <h2>Votre adresse est : {this.state.userAddress}</h2>
</div>

        )

      }
  else
  {
    if(!this.state.nftVote)
      {
    return (
      <div className="App" >
        <div>
        <h2>Morocco Election Simulation</h2>
        
</div>
 <hr />

        <h2>{this.state.message}</h2>
        <hr />
        <div className="horizontal-container">
          <div className="item">
        <p><strong>{((this.state.RNI)[0])}</strong></p>
        <img src={RNIImage} className="small-image" alt="RNI LOGO"/>
        <p>Count : {String((this.state.RNI)[1])}</p>
        <button onClick={()=>this.vote(0,this.state.nft)}>VOTE RNI</button>
          </div>
        <div className="item">
        <p ><strong>{((this.state.PAM)[0])}</strong></p>
        <img src={PAMImage} className="small-image" alt="PAM LOGO"/>
        <p>Count : {String((this.state.PAM)[1])}</p>
        <button onClick={()=>this.vote(1,this.state.nft)}>VOTE PAM</button>
       </div>
        <div className="item">
        <p><strong>{((this.state.PI)[0])}</strong></p>
        <img src={PIImage} className="small-image" alt="PI LOGO"/>
        <p>Count : {String((this.state.PI)[1])}</p>
        <button onClick={()=>this.vote(2,this.state.nft)}>VOTE PI</button>
        </div>
        </div>
        <hr />
        <h2>Votre adresse est : {this.state.userAddress}</h2>
        </div>
    );
  }
   return(
           <div className="App" >
        <div>
        <h2>Morocco Election Simulation</h2>
</div>
<hr />

        <h2>{this.state.message}</h2>
        <hr />
        <h2>Résultats en cours</h2>
        <div className="horizontal-container">
          <div className="item">
        <p><strong>{((this.state.RNI)[0])}</strong></p>
        <img src={RNIImage} className="small-image" alt="RNI LOGO"/>
        <p>Count : {String((this.state.RNI)[1])}</p>
          </div>
        <div className="item">
        <p ><strong>{((this.state.PAM)[0])}</strong></p>
        <img src={PAMImage} className="small-image" alt="PAM LOGO"/>
        <p>Count : {String((this.state.PAM)[1])}</p>
       </div>
        <div className="item">
        <p><strong>{((this.state.PI)[0])}</strong></p>
        <img src={PIImage} className="small-image" alt="PI LOGO"/>
        <p>Count : {String((this.state.PI)[1])}</p>
        </div>
        </div>
        <hr />
        <h2>Votre adresse est : {this.state.userAddress}</h2>
</div>

        )

    
  }
}
}
export default App;
