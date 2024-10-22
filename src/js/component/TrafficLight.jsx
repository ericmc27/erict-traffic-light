import React, {useEffect, useState} from "react";

const TrafficLight = () => {
	const [color, setActiveColor] = useState(null);
	const colors = ["red", "yellow", "green"]
	let currentIndex;

	const handleClick = (color)=>{
		setActiveColor(color);
	}

	const handleLightCycle = ()=>{
		currentIndex = colors.indexOf(color);
		const nextColor = (currentIndex + 1) % colors.length
		setActiveColor(colors[nextColor])
	}

	useEffect(()=>{
		let interval;
		if(color){
			interval = setInterval(handleLightCycle, 1000);
			return () => clearInterval(interval);
		}
		
	}, [color])

	return (
		<div className="trafficSquare">
			<div className="littleSquare"></div>
			<div className="square">
				<div className={`circle red ${color === "red" ? "active" : ""}`} style={{backgroundColor: "red"}} onClick={()=>{handleClick("red")}}></div>
				<div className={`circle yellow ${color === "yellow" ? "active" : ""}`} style={{backgroundColor: "yellow"}} onClick={()=>{handleClick("yellow")}}></div>
				<div className={`circle green ${color === "green" ? "active" : ""}`} style={{backgroundColor: "green"}} onClick={()=>{handleClick("green")}}></div>
			</div>
			<button onClick={handleLightCycle}>Cycle light</button>
		</div>
	);
};

export default TrafficLight;
