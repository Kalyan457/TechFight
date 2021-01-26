import React, {Component} from 'react';
import classes from './Avatar.css';
import Auxillary from '../hoc/Auxillary';
import reactImg from '../Assets/react.png';

class Avatar extends Component{

    moveAvatar = (avatar) =>{
        var curLeft = avatar.getBoundingClientRect().left;
        var x = Math.floor((Math.random() * 100) + 1);
        var nextPos = curLeft+x;
        if(nextPos>300){
            nextPos = 0;
        }
        avatar.style.marginLeft = nextPos+ "px";
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

    play = () =>{
        var avatar = document.getElementById("avatarDiv");
        var leftHand = document.getElementById("leftHand");
        var rightHand = document.getElementById("rightHand");
        setInterval(this.moveAvatar,100,avatar);
        setInterval(this.moveHands,1000,leftHand);
        setInterval(this.moveHands,1000,rightHand);
    }

    componentDidMount = () =>{    
        var avatar1 = document.getElementById("avatarDiv1");
        var leftHand1 = document.getElementById("leftHand1");
        var rightHand1 = document.getElementById("rightHand1");    
        var avatar2 = document.getElementById("avatarDiv2");
        var leftHand2 = document.getElementById("leftHand2");
        var rightHand2 = document.getElementById("rightHand2");
        this.props.callBack(avatar1,leftHand1,rightHand1,avatar2,leftHand2,rightHand2);
    }

    render(){
        var avatarBody;
        if(this.props.company=="react"){
            avatarBody = (<div className={classes.bodyReact}></div>);
        }
        else if(this.props.company=="angular"){
            avatarBody = (<div className={classes.bodyAngular}></div>);
        }
        else if(this.props.company=="sql"){
            avatarBody = (<div className={classes.bodySQL}></div>);
        }
        else if(this.props.company=="nosql"){
            avatarBody = (<div className={classes.bodyNOSQL}></div>);
        }
        else if(this.props.company=="express"){
            avatarBody = (<div className={classes.bodyExpress}></div>);
        }
        else if(this.props.company=="django"){
            avatarBody = (<div className={classes.bodyDjango}></div>);
        }
        return(
            <Auxillary>
                <div className={this.props.company=="react" || this.props.company=="sql" || this.props.company=="express" ? classes.player1 : classes.player2} id={this.props.company=="react" || this.props.company=="sql" || this.props.company=="express" ? "avatarDiv1" : "avatarDiv2"}>
                    <div className={classes.face}>
                        <div className={classes.leftEye}></div>
                        <div className={classes.rightEye}></div>
                        <div className={classes.noseLeft}></div>
                        <div className={classes.noseRight}></div>
                        <div className={classes.mouth}><hr></hr></div>
                    </div>
                    <div className={classes.neck}></div>
                    {avatarBody}
                    <div className={classes.hands}>
                        <div className={classes.leftHand} id={this.props.company=="react" || this.props.company=="sql" || this.props.company=="express" ? "leftHand1" : "leftHand2"}></div>
                        <div className={classes.rightHand} id={this.props.company=="react" || this.props.company=="sql" || this.props.company=="express"? "rightHand1" : "rightHand2"}></div>
                    </div>
                    <div className={classes.legs}>
                        <div className={classes.leftLeg}></div>
                        <div className={classes.rightLeg}></div>
                    </div>
                    <div className={classes.feet}>
                        <div className={classes.leftFeet}></div>
                        <div className={classes.rightFeet}></div>
                    </div>
                </div>
            </Auxillary>
        );
    }
}

export default Avatar;
