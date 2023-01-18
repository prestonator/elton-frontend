// pages/our-team/[slug].js
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import urlBuilder from "@/lib/imageUrl";
import teamStyle from "@/styles/OurTeamSlug.module.css";
import Image from "next/image";
import client from "@/lib/graphql/apollo-client";
import {
	TEAM_MEMBER_SLUG,
	TEAM_MEMBER_SLUGS,
	TEAM_MEMBER,
} from "@/lib/graphql/apollo-queries";

//Create the query

export default function TeamMember({ memberData }) {
	const router = useRouter();
	const pathName = router.pathname;
	const pathSlug = pathName.match(/\/our-team\/(.*)/)[1];

	const [toggleState, setToggleState] = useState(1);
	const toggleTab = (index) => {
		setToggleState(index);
	};


	const tabOneData = memberData.attributes.tabOne.split("\n- ");


	return (
		<>
			<section className="bg-bio-gradient animate-biobg bg-[length:300%_300%]">
				<div className="flex items-center">
					<div className="basis-1/2">
						<div className="relative w-full h-[40rem]">
							<Image
								fill
								style={{ objectFit: "contain" }}
								sizes="100vw"
								src={urlBuilder(
									memberData.attributes.headshot.data.attributes.url
								)}
								alt={`${memberData.attributes.headshot.data.attributes.alternativeText}`}
							/>
						</div>
					</div>
					<div className="basis-1/2 text-white">
						<div className="flex w-4/5 flex-col gap-3">
							<h1 className="text-7xl">{memberData.attributes.name}</h1>
							<h3 className="text-lg underline">
								{memberData.attributes.title} | {memberData.attributes.location}
							</h3>
							<h4>
								{memberData.attributes.phone} | {memberData.attributes.email}
							</h4>
							<p>{memberData.attributes.biography}</p>
						</div>
					</div>
				</div>
			</section>
			<section className={`pb-20 ${teamStyle.section2}`}>
				<div className={teamStyle.tabContainer}>
					<div className={teamStyle.tabs}>
						<ul className={teamStyle.tabLinks}>
							<li>
								<button
									className={`${
										toggleState === 1 ? teamStyle.active : "singleLink"
									} ${teamStyle.singleLink}`}
									onClick={() => toggleTab(1)}
								>
									<span className={teamStyle.linkText} data-text="Education">
										Education
									</span>
								</button>
							</li>
							<li>
								<button
									className={`${
										toggleState === 2 ? teamStyle.active : "singleLink"
									} ${teamStyle.singleLink}`}
									onClick={() => toggleTab(2)}
								>
									<span className={teamStyle.linkText} data-text="Licenses">
										Licenses
									</span>
								</button>
							</li>
							<li>
								<button
									className={`${
										toggleState === 3 ? teamStyle.active : "singleLink"
									} ${teamStyle.singleLink}`}
									onClick={() => toggleTab(3)}
								>
									<span
										className={teamStyle.linkText}
										data-text="Job Responsibilities"
									>
										Job Responsibilities
									</span>
								</button>
							</li>
							<li>
								<button
									className={`${
										toggleState === 4 ? teamStyle.active : "singleLink"
									} ${teamStyle.singleLink}`}
									onClick={() => toggleTab(4)}
								>
									<span className={teamStyle.linkText} data-text="Experience">
										Experience
									</span>
								</button>
							</li>
						</ul>
						<ul className={teamStyle.tabContent}>
							<li>
								<div
									className={`${
										toggleState === 1 ? teamStyle.active : "insideContent"
									} ${teamStyle.insideContent}`}
								>
									<ul className="list-disc">
										{tabOneData.map((tabOne) => (
											<li key={tabOne}>
												{tabOne}
											</li>
										))}
									</ul>
								</div>
							</li>
							<li>
								<div
									className={`${
										toggleState === 2 ? teamStyle.active : "insideContent"
									} ${teamStyle.insideContent}`}
								>
									<ul className="list-disc">
										
											<li key={memberData.attributes.tabTwoTitle}>
												{memberData.attributes.tabTwo}
											</li>

									</ul>
								</div>
							</li>
							<li>
								<div
									className={`${
										toggleState === 3 ? teamStyle.active : "insideContent"
									} ${teamStyle.insideContent}`}
								>
									<ul className="list-disc">
										
											<li key={memberData.attributes.tabThreeTitle}>
												{memberData.attributes.tabThree}
											</li>
									</ul>
								</div>
							</li>
							<li>
								<div
									className={`${
										toggleState === 4 ? teamStyle.active : "insideContent"
									} ${teamStyle.insideContent}`}
								>
									<ul className="list-disc">
											<li key={memberData.attributes.tabFourTitle}>
												{memberData.attributes.tabFour}
											</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps({ params }) {
	const { data: TeamMemberSlug } = await client.query({
		query: TEAM_MEMBER_SLUG,
		variables: {
			filters: {
				slug: {
					contains: params.slug,
				},
			},
		},
	});

	console.log(TeamMemberSlug.ourteams);

	return {
		props: {
			memberData: TeamMemberSlug.ourteams.data[0],
		},
	};
}

export async function getStaticPaths() {
	const { data: TeamMemberSlugs } = await client.query({
		query: TEAM_MEMBER_SLUGS,
	});

	console.log(TeamMemberSlugs.ourteams.data);

	const paths = TeamMemberSlugs.ourteams.data.map(
		({ attributes }) => `/our-team/${attributes.slug}`
	);

	console.log(paths);

	return {
		paths,
		fallback: false,
	};
}
