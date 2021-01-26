import React, {Component} from 'react';
import Avatar from '../Avatar/Avatar';
import Auxillary from '../hoc/Auxillary';
import classes from './Play.css';

class Play extends Component{

    state={
        avatar1:"",
        leftHand1:"",
        rightHand1:"",
        avatar2:"",
        leftHand2:"",
        rightHand2:""
    }

    moveAvatar = (avatar,whichPlayer) =>{
        if(whichPlayer=="player1"){
            var curLeft = avatar.getBoundingClientRect().left;
            var x = Math.floor((Math.random() * 100) + 1);
            var nextPos = curLeft+x;
            if(nextPos>600){
                nextPos = 0;
            }
            avatar.style.marginLeft = nextPos+ "px";
        }
        else{
            var curRight = avatar.getBoundingClientRect().right;
            var x = Math.floor((Math.random() * 100) + 1);
            var nextPos = curRight+x;
            if(nextPos<300){
                nextPos = 500;
            }
            avatar.style.marginRight = nextPos+ "px";
        }
    }

    moveHands = (hand) =>{
        var i = 0;
        var st = window.getComputedStyle(hand, null);
        var tr = st.getPropertyValue("transform");
        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var curAngle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        var x = Math.floor((Math.random() * 360) + 0);
        var nextDegree = curAngle+x;
        hand.style.transform = "rotateZ("+nextDegree+"deg"+")";
    }

    storePlayerData = (avatar1,leftHand1,rightHand1,avatar2,leftHand2,rightHand2) =>{
        this.setState({
            avatar1:avatar1,
            leftHand1:leftHand1,
            rightHand1:rightHand1,
            avatar2:avatar2,
            leftHand2:leftHand2,
            rightHand2:rightHand2,
        })
    }

    play = () =>{
        var avatar1 = this.state.avatar1;
        var leftHand1 = this.state.leftHand1;
        var rightHand1 = this.state.rightHand1;        
        var avatar2 = this.state.avatar2;
        var leftHand2 = this.state.leftHand2;
        var rightHand2 = this.state.rightHand2;

        setInterval(this.moveAvatar,500,avatar1,"player1");
        setInterval(this.moveHands, 500,leftHand1);
        setInterval(this.moveHands, 500,rightHand1);
        setInterval(this.moveAvatar,500,avatar2,"player2");
        setInterval(this.moveHands,500,leftHand2);
        setInterval(this.moveHands,500,rightHand2);
    }

    render(){
        console.log(this.state);
        return(
            <Auxillary>
                <div className={classes.players}>
                    <div className={classes.player1}>
                        <Avatar company={"react"} callBack = {this.storePlayerData}/>
                    </div>
                    <div className={classes.player2}>
                        <Avatar company={"angular"} callBack = {this.storePlayerData}/>
                    </div>
                </div>
                <div className={classes.stage}>
                    <h1 className={classes.matchTitle}>React vs Angular</h1>
                </div>
                <button onClick={this.play}>Play</button>
            </Auxillary>
        );
    }
}

export default Play;