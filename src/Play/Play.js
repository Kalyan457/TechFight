import React, {Component} from 'react';
import Avatar from '../Avatar/Avatar';
import Auxillary from '../hoc/Auxillary';
import classes from './Play.css';
import ReactDOM from 'react-dom';

class Play extends Component{

    state={
        avatar1:"",
        leftHand1:"",
        rightHand1:"",
        avatar2:"",
        leftHand2:"",
        rightHand2:"",
        player1:"react",
        player2:"angular",
        int1:"",
        int2:"",
        int3:"",
        int4:"",
        int5:"",
        int6:"",
    }

    moveAvatar = (avatar,whichPlayer) =>{
        if(whichPlayer=="player1"){
            var curLeft = avatar.getBoundingClientRect().left;
            // var x = Math.floor((Math.random() * 100) + 1);
            // var nextPos = curLeft+x;
            // if(nextPos>600){
            //     nextPos = 0;
            // }
            var windowWidth = window.screen.availWidth;
            var x = Math.floor((Math.random() * windowWidth) + 1);
            var nextPos = curLeft+x;
            if(nextPos>windowWidth/2){
                nextPos = 0;
            }
            avatar.style.marginLeft = nextPos+ "px";
        }
        else{
            var curRight = avatar.getBoundingClientRect().right;
            // var x = Math.floor((Math.random() * 100) + 1);
            // var nextPos = curRight+x;
            // if(nextPos<300){
            //     nextPos = 500;
            // }
            var windowWidth = window.screen.availWidth;
            var x = Math.floor((Math.random() * 100) + 1);
            var nextPos = curRight+x;
            if(nextPos<windowWidth/2){
                nextPos = 200;
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

        var int1 = setInterval(this.moveAvatar,1000,avatar1,"player1");
        var int2 = setInterval(this.moveHands, 1000,leftHand1);
        var int3 = setInterval(this.moveHands, 1000,rightHand1);
        var int4 = setInterval(this.moveAvatar,1000,avatar2,"player2");
        var int5 = setInterval(this.moveHands,1000,leftHand2);
        var int6 = setInterval(this.moveHands,1000,rightHand2);

        this.setState({
            int1:int1,
            int2:int2,
            int3:int3,
            int4:int4,
            int5:int5,
            int6:int6,
        })
    }

    stop = () =>{
        clearInterval(this.state.int1);
        clearInterval(this.state.int2);
        clearInterval(this.state.int3);
        clearInterval(this.state.int4);
        clearInterval(this.state.int5);
        clearInterval(this.state.int6);
    }

    matchesHandler = () =>{
        var matchesFilter = document.getElementById("matchesDD");
        var match = matchesFilter.value;
        var player1;
        var player2;
        if(match=="fe"){
            player1="react";
            player2="angular";
        }
        else if(match=="db"){
            player1="sql";
            player2="nosql";
        }
        else{
            player1="express";
            player2="django";
        }

        this.setState({
            player1:player1,
            player2:player2
        })
    }

    render(){
        var matchCode;
        var differencesCode;
        if(this.state.player1=="react"){
            matchCode=(
                <Auxillary>
                    <div className={classes.player1}>
                        <Avatar company={"react"} callBack = {this.storePlayerData}/>
                    </div>
                    <div className={classes.player2}>
                        <Avatar company={"angular"} callBack = {this.storePlayerData}/>
                    </div>
                </Auxillary>);
            differencesCode=(
                <Auxillary>
                    <div className={classes.differencesTable}>
                        <div className={classes.points}>
                            <h2 className={classes.slides}>I am best at front end design</h2>
                            <h2 className={classes.slides}>I am easy to start with</h2>
                            <h2 className={classes.slides}>I have a virtual DOM and it is best</h2>
                        </div>
                        <div className={classes.points}>
                            <h2 className={classes.slides}>No. You are not</h2>
                            <h2 className={classes.slides}>I am easy to end with</h2>
                            <h2 className={classes.slides}>I have a real DOM</h2>
                        </div>
                    </div>
                </Auxillary>
            );
        }
        else if(this.state.player1=="sql"){
            matchCode=(
                <Auxillary>
                    <div className={classes.player1}>
                        <Avatar company={"sql"} callBack = {this.storePlayerData}/>
                    </div>
                    <div className={classes.player2}>
                        <Avatar company={"nosql"} callBack = {this.storePlayerData}/>
                    </div>
                </Auxillary>);

            differencesCode=(
                <Auxillary>
                    <div className={classes.differencesTable}>
                        <div className={classes.points}>
                            <h2 className={classes.slides}>I am elder than you. Respect me</h2>
                            <h2 className={classes.slides}>I am easy to start with</h2>
                            <h2 className={classes.slides}>I have tables</h2>
                            <h2 className={classes.slides}>Dont worry. You dont need them</h2>
                        </div>
                        <div className={classes.points}>
                            <h2 className={classes.slides}>Hi GrandPa</h2>
                            <h2 className={classes.slides}>People are using me now</h2>
                            <h2 className={classes.slides}>I dont have tables</h2>
                            <h2 className={classes.slides}>Cool! Grandpa!</h2>
                        </div>
                    </div>
                </Auxillary>
            );
        }
        else{
            matchCode=(
                <Auxillary>
                    <div className={classes.player1}>
                        <Avatar company={"express"} callBack = {this.storePlayerData}/>
                    </div>
                    <div className={classes.player2}>
                        <Avatar company={"django"} callBack = {this.storePlayerData}/>
                    </div>
                </Auxillary>);
            
            differencesCode=(
                <Auxillary>
                    <div className={classes.differencesTable}>
                        <div className={classes.points}>
                            <h2 className={classes.slides}>I have freedom to choose</h2>
                            <h2 className={classes.slides}>I am much scalable</h2>
                            <h2 className={classes.slides}>I belong to family of JavaScript</h2>
                        </div>
                        <div className={classes.points}>
                            <h2 className={classes.slides}>I have in-house templates</h2>
                            <h2 className={classes.slides}>I am easy to start with</h2>
                            <h2 className={classes.slides}>I belong to Python</h2>
                        </div>
                    </div>
                </Auxillary>
            );
        }
        return(
            <Auxillary>
                <div className={classes.players}>
                    {matchCode}
                </div>
                <div className={classes.stage}>
                    <select id="matchesDD" className={classes.dropdown} onChange={this.matchesHandler}>
                        <option value="fe">React vs Angular</option>
                        <option value="db">SQL vs NoSQL</option>
                        <option value="be">Express vs Django</option>
                    </select>
                    <button onClick={this.play} className={classes.playBtn}>Play</button>
                    <button onClick={this.stop} className={classes.stopBtn}>Stop</button>
                </div>
                {differencesCode}
            </Auxillary>
        );
    }
}

export default Play;