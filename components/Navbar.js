import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import styles from "@/styles/Navbar.module.css";
import { debounce } from "@/lib/debounce";
import urlBuilder from "@/lib/imageUrl";
import { MENU_LEFT, MENU_RIGHT, MENU_LOGO } from "@/lib/graphql/apollo-queries";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";

export default function Navbar() {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
	const handleScroll = debounce(() => {
		const currentScrollPos = window.pageYOffset;

		setVisible(
			(prevScrollPos > currentScrollPos &&
				prevScrollPos - currentScrollPos > 70) ||
				currentScrollPos < 10
		);

		setPrevScrollPos(currentScrollPos);
	}, 100);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos, visible, handleScroll]);

	const router = useRouter();
	const currentRoute = router.pathname;

	const {
		loading: LoadingLeft,
		error: ErrorLeft,
		data: MenuLeft,
	} = useQuery(MENU_LEFT, {
		variables: {
			navigationIdOrSlug: "left-navigation",
			type: "TREE",
			menuOnly: false,
		},
	});

	const {
		loading: LoadingRight,
		error: ErrorRight,
		data: MenuRight,
	} = useQuery(MENU_RIGHT, {
		variables: {
			navigationIdOrSlug: "right-navigation",
			type: "TREE",
			menuOnly: false,
		},
	});

	const {
		loading: LoadingLogo,
		error: ErrorLogo,
		data: MenuLogo,
	} = useQuery(MENU_LOGO);

	if (LoadingLeft) return "Loading...";
	if (ErrorLeft) return `Error! ${ErrorLeft.message}`;
	if (LoadingLogo) return "Loading...";
	if (ErrorLogo) return `Error! ${ErrorLogo.message}`;
	if (LoadingRight) return "Loading...";
	if (ErrorRight) return `Error! ${ErrorRight.message}`;

	const navbarStyles = {
		position: "fixed",
		height: "6rem",
		width: "100%",
		transition: "top 0.5s ease",
		zIndex: "100",
	};

	return (
		<nav
			className={styles.navbar}
			style={{ ...navbarStyles, top: visible ? "0" : "-100px" }}
		>
			<ul className={styles.navList}>
				{MenuLeft.renderNavigation.map((item) => {
					if (item.title !== "Our Team" && item.title !== "Practice Areas") {
						return (
							<li className={styles.navItem} key={item.id}>
								<Link
									href={item.path}
									className={
										currentRoute === item.path
											? styles.active
											: styles.nonActive
									}
								>
									{item.title}
								</Link>
							</li>
						);
					}

					return (
						<li className={styles.navItem} key={item.id}>
							<Link
								href={item.path}
								className={
									currentRoute === item.path ? styles.active : styles.nonActive
								}
								style={{ position: "relative" }}
							>
								{item.title}
							</Link>
							<IoIosArrowForward style={{ height: "20px", width: "20px" }} />
							<ul className={styles.subMenu}>
								{item.items.map((subItem) => (
									<li className={styles.subMenuItem} key={subItem.id}>
										<Link
											href={`${subItem.path}`}
											className={
												currentRoute === item.path
													? styles.active
													: styles.nonActive
											}
										>
											{subItem.title}
										</Link>
									</li>
								))}
							</ul>
						</li>
					);
				})}

				<li
					className={styles.navLogo}
					style={{ position: "relative", height: "10rem" }}
				>
					<Image
						src={urlBuilder(
							MenuLogo.global.data.attributes.logo.data.attributes.url
						)}
						fill
						style={{ objectFit: "contain" }}
					/>
				</li>
				{MenuRight.renderNavigation.map((item) => {
					if (item.title !== "Blog") {
						return (
							<li className={styles.navItem} key={item.id}>
								<Link
									href={item.path}
									className={
										currentRoute === item.path
											? styles.active
											: styles.nonActive
									}
								>
									{item.title}
								</Link>
							</li>
						);
					}

					
						return (
							<li className={styles.navItem} key={item.id}>
								<Link
									href={item.path}
									className={
										currentRoute === item.path
											? styles.active
											: styles.nonActive
									}
									style={{ position: "relative" }}
								>
									{item.title}
								</Link>
								<IoIosArrowForward style={{ height: "20px", width: "20px" }} />
								<ul className={styles.subMenu}>
									{item.items.map((subItem) => (
										<li className={styles.subMenuItem} key={subItem.id}>
											<Link
												href={`${subItem.path}`}
												className={
													currentRoute === item.path
														? styles.active
														: styles.nonActive
												}
											>
												{subItem.title}
											</Link>
										</li>
									))}
								</ul>
							</li>
						);
				})}
			</ul>
		</nav>
	);
}
