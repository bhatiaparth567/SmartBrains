import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imagelinkform';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import 'tachyons';
import { Component } from 'react';
import Clarifai from 'clarifai';
import React from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/signin/signin';
import Register from './components/Register/register';



const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState={

  input:'',
      imageUrl:' ',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{

        id:'',
        name:'',
        email:'',
        
        entries:0,
        joined: ''

      }

}
class App extends Component{

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:' ',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{

        id:'',
        name:'',
        email:'',
        
        entries:0,
        joined: ''

      }
    }
    //this.wrapper=React.createRef();
  }

  LoadUser=(data)=>{
    
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})

  }

 
  calculateFaceLocation=(response)=>{

    const box=response.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);

    return {
      leftCol:box.left_col * width,
      topRow:box.top_row*height,
      rightCol:width-(box.right_col*width),
      bottomRow:height-(box.bottom_row*height)

    }


  }

  displayFaceBox=(box)=>{

    this.setState({box:box});
  }

  OnInputChange=(event)=>{

    this.setState({input:event.target.value});

  }
  
  OnSubmit=()=>{
   // console.log('click');
    this.setState({imageUrl:this.state.input});
    fetch('http://localhost:3000/imageurl',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            input:this.state.input

          })

        })
        .then(response=> response.json())
    .then(response=>{
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id

          })

        }).then(response=> response.json()).then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}));
        }).catch(err=>console.log(err));
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    } ).catch(
      err=>console.log(err)
    )

  }

  onRouteChange=(input)=>{
    if(input==='signout'){
      this.setState(initialState);
    }
    else if(input==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route:input});
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions} />
        
       
        
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route==='home' ?
          <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
         <ImageLinkForm onInputChange={this.OnInputChange}
         OnSubmit={this.OnSubmit}
         />
         <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
         </div>
         
          : ( this.state.route==='signin' ? <SignIn LoadUser={this.LoadUser} onRouteChange={this.onRouteChange} /> : <Register 
          LoadUser={this.LoadUser}
          onRouteChange={this.onRouteChange}/>)
         

         }
        
        
      </div>
    );
  }
}

export default App;
