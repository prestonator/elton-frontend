import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import footer from "../styles/Footer.module.css";
import { ImFacebook, ImTwitter, ImYoutube, ImLinkedin2 } from "react-icons/im";
import { useQuery } from "@apollo/client";
import { FOOTER_BG } from "@/lib/graphql/apollo-queries";
import urlBuilder from "@/lib/imageUrl";

export default function Footer() {
	const showFooter = {
		visible: {
			opacity: 1,
			visibility: "visible",
			transform: "translateY(0vh)",
			marginTop: "-10vh",
			width: "100%",
			transition: { duration: 0.75 },
		},
		hidden: {
			opacity: 0,
			visibility: "hidden",
			width: "100%",
			transform: "translateY(5vh)",
		},
	};

	const controls = useAnimation();

	useEffect(() => {
		controls.start("visible");
	}, [controls]);

	const {
		loading: LoadingFooterBg,
		error: ErrorFooterBg,
		data: FooterBg,
	} = useQuery(FOOTER_BG, {
		variables: {
			mediaId: 1,
		},
	});

	if (LoadingFooterBg) return "Loading...";
	if (ErrorFooterBg) return `Error! ${ErrorFooterBg.message}`;

	const bgImage = urlBuilder(
		FooterBg.media.data.attributes.image.data.attributes.url
	);

	return (
		<>
			<div
				className={`${footer.map}`}
				style={{
					backgroundImage: `url(${bgImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
					width: "100%",
				}}
			>
				<div
					className={`${footer.meetingCol} flex flex-row gap-4 items-center justify-center bg-white translate-y-[-2rem]`}
				>
					<div className={`${footer.meetingWrapper} w-1/2`}>
						<h2 className={footer.sectionHeader}>Free Consultation</h2>
						<div className={footer.meeting}>
							<iframe
								src="https://app.simplymeet.me/eltonjenkins?is_widget=1&view=compact"
								style={{ width: "100%", height: "650px" }}
								frameborder="0"
								scrolling="yes"
							/>
						</div>
					</div>
					<div
						className={`${footer.aboutWrapper} w-1/2 flex flex-col items-center`}
					>
						<div
							className={`flex items-center flex-col border-t-8 border-yellow-500 px-24 py-16 bg-neutral-700 text-white`}
						>
							<p>124 East Main Street,</p>
							<p>Norman, OK 73069</p>
							<p>+1 405 217 3623</p>
							<p>elton@eltonjenkinslaw.com</p>
						</div>
					</div>
				</div>
			</div>
			<motion.div
				animate={controls}
				initial="hidden"
				whileInView="visible"
				variants={showFooter}
				viewport={{ once: false }}
			>
				<div className={footer.wrapper}>
					<div className={footer.container}>
						<div className={`${footer.column1} ${footer.column}`}>
							<span>Staff</span>
							<p>Elton Jenkins</p>
							<p>Eric Kroier</p>
							<p>Greg Milstead</p>
							<p>Jamie Arnold</p>
						</div>
						<div className={`${footer.column2} ${footer.column}`}>
							<span>Clients</span>
							<p>About Us</p>
							<p>Contact</p>
							<p>MyCase Login</p>
							<p>Directions</p>
						</div>
						<div className={`${footer.column3} ${footer.column}`}>
							<span>Helpful Pages</span>
							<p>Criminal Defense</p>
							<p>Family Law</p>
							<p>Personal Injury</p>
							<p>In The News</p>
						</div>
						<div className={`${footer.column4} ${footer.column}`}>
							<ul>
								<li>
									<ImFacebook />
								</li>
								<li>
									<ImTwitter />
								</li>
								<li>
									<ImYoutube />
								</li>
								<li>
									<ImLinkedin2 />
								</li>
							</ul>
							<input type="text" placeholder="First Name" />
							<input type="text" placeholder="Last Name" />
							<input type="text" placeholder="Email Address" />
							<input type="button" placeholder="Subscribe" value="Subscribe" />
							<span>Copyright ©2023 | All Rights Reserved</span>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
