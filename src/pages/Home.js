import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
// Components
import Trace from "../components/Trace";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Banner from "../components/Banner";

const lay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let i = lay.length,
	k,
	temp;
while (--i > 0) {
	k = Math.floor(Math.random() * (i + 1));
	temp = lay[k];
	lay[k] = lay[i];
	lay[i] = temp;
}

const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadTraces());
	}, [dispatch]);

	const { trace, articles, chatrooms, vision, visionary } = useSelector((state) => state.traces);
	document.body.style.overflow = "auto";
	trace.sort((a, b) => {
		return a.id - b.id; //this will sort according to .id descending
	});

	const layEnter = "lay" + lay[lay.length - 1] + " enter-container trace";
	const layLounge = "lay" + lay[lay.length - 2] + " lounge-container trace";

	let lien = "/";
	return (
		<div className="home">
			<div className="banner-container-lab">
				<div>
					<Link to={"/"}>LABYRINTH</Link>
				</div>
			</div>
			<div className="home-links-container">
				<Link to="labyrinth">
					<div className={layEnter}>
						<div key={uuid()} className="title-box-enter">
							<div className="enter-box-background">
								<div className="back-one"></div>
								<div className="back-two"></div>
								<div className="back-three"></div>
								<div className="back-four"></div>
							</div>
							<h3 className="title-intro">Enter</h3>
						</div>
					</div>
				</Link>

				{trace.map((trace, index) => (
					<Link key={uuid()} to={"/trace/" + trace.id}>
						<Trace lay={lay[index]} index={index} title={trace.attributes.title} />
					</Link>
				))}
				<Link to="/lounge">
					<div className={layLounge}>
						<div className="title-box">
							<div className="title-box-background lounge-intro"></div>
							<h3 className="title-intro lounge-text">Lounge</h3>
						</div>
					</div>
				</Link>
			</div>
			<div className="newsletter">
				<a href="#">NEWSLETTER</a>
			</div>
		</div>
	);
};

export default Home;
