import '../styles/GameBox.css';
import React from "react";
import emptyblock from '../images/emptyblock.jpg';
import foodblock from '../images/foodblock.jpg';
import dinoblock from '../images/dinoblock.jpg';
import bombblock from '../images/bombblock.jpg';

const GameBox = (props) => {
    const {position, positionFoodX, positionFoodY, positionDinoX, positionDinoY, bpx1, bpy1, bpx2, bpy2, bpx3, bpy3} = props;
    
    if (position[1] === positionDinoX && position[0] === positionDinoY) {
        return(
            <div>
                <img className="block" src={dinoblock} alt="block with dino"></img>
            </div>
        );
    }

    if (position[1] === positionFoodX && position[0] === positionFoodY) {
        return(
            <div>
                <img className="block" src={foodblock} alt="block with food"></img>
            </div>
        );
    }

    if ((position[1] === bpx1 && position[0] === bpy1) || (position[1] === bpx2 && position[0] === bpy2) || (position[1] === bpx3 && position[0] === bpy3)) {
        return (
            <div>
                <img className="block" src={bombblock} alt="block with bomb"></img>
            </div>
        )
    }

    return(
        <div>
            <img className="block" src={emptyblock} alt="empty block"></img>
        </div>
    );

    
}

export default GameBox;
