import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
//import { ParallaxProvider } from "react-scroll-parallax";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
