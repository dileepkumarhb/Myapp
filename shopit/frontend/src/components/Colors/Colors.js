import React from "react";
import './style.css'
const Colors = ({colors, deleteColor}) => {
   console.log('colors',colors)
    return (
        <div>
            {colors && colors.length > 0 && <h1 className="right-heading">colors list</h1>}
            {colors && colors.length > 0 && <div className="color_flex flex-wrap -mx-1">
                {colors.map(color => (
                    <div className="p-1" key={color.id}>
                    <div  className=" cursor-pointer" style={{background: color.color,width:"30px",height:"30px"}} onClick={() => deleteColor(color)}></div></div>
                ))}
                </div>}
        </div>
    )
}
export default Colors;