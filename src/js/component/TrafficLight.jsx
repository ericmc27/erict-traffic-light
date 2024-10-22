import React, { useEffect, useState, setState } from "react";

const TrafficLight = () => {
	const [color, setActiveColor] = useState(null);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [showPurple, setShowPurple] = useState(false);
	const [isCycling, setCycling] = useState(false);
	const [colors, setColors] = useState(["red", "yellow", "green"])


	const updateStyles = () => {
		if (!colors.includes("purple")) {
			setShowPurple(true);
			setColors(prevColors => [...colors, "purple"])
		}

	}

	const handleClick = (color) => {
		if (isCycling) setCycling(false), setButtonClicked(false)
		setActiveColor(color);
		setButtonClicked(false);
	}

	const handleLightCycle = () => {
		const nextColor = (colors.indexOf(color) + 1) % colors.length
		setActiveColor(colors[nextColor])
		setButtonClicked(true);
		setCycling(true);
	}

	useEffect(() => {
		let interval;
		if (color && buttonClicked && isCycling) {
			interval = setInterval(handleLightCycle, 1000);
		}
		return () => clearInterval(interval);

	}, [color, isCycling])

	return (
		<div className="trafficSquare">
			<div className="littleSquare"></div>
			<div className="square" style={{ height: showPurple ? "370px" : "280px" }}>
				<div className={`circles red ${color === "red" ? "active" : ""}`} style={{ backgroundColor: "red" }} onClick={() => { handleClick("red") }}></div>
				<div className={`circles yellow ${color === "yellow" ? "active" : ""}`} style={{ backgroundColor: "yellow" }} onClick={() => { handleClick("yellow") }}></div>
				<div className={`circles green ${color === "green" ? "active" : ""}`} style={{ backgroundColor: "green" }} onClick={() => { handleClick("green") }}></div>
				{showPurple && <div className={`circles purple ${color === "purple" ? "active" : ""}`} style={{ backgroundColor: "purple" }} onClick={() => { handleClick("purple") }}></div>}
			</div>
			<div className="buttons">
				<button onClick={handleLightCycle}>Cycle light</button>
				<button onClick={updateStyles}>Add circle purple</button>
			</div>

		</div>
	);
};

export default TrafficLight;
