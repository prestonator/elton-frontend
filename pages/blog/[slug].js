import React from "react";
import client from "@/lib/graphql/apollo-client";
import { BLOG_POST_SLUG, BLOG_POST_SLUGS } from "@/lib/graphql/apollo-queries";
import blogPage from "@/styles/BlogPost.module.css";
import Image from "next/image";
import urlBuilder from "@/lib/imageUrl";
import { BiCategory } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { ImCalendar } from "react-icons/im";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ postData }) {
	return (
		<>
			<section className={`${blogPage.section} ${blogPage.sectionOne}`}>
				<div className={blogPage.row}>
					<h1 className={blogPage.textHeading}>{postData.attributes.title}</h1>
				</div>
			</section>
			<section className={`${blogPage.section} ${blogPage.sectionTwo}`}>
				<div className={blogPage.row}>
					<div className={`${blogPage.col} ${blogPage.colOne}`}>
						<div
							className={blogPage.imageContainer}
							style={{ position: "relative", height: "30rem" }}
						>
							<Image
								src={urlBuilder(postData.attributes.image.data.attributes.url)}
								alt={postData.attributes.image.data.attributes.alternativeText}
								fill
								style={{ objectFit: "cover" }}
								className={blogPage.image}
							/>
						</div>
					</div>
					<div className={`${blogPage.col} ${blogPage.colTwo}`}>
						<div className={blogPage.blurbWrapper}>
							<div className={blogPage.textRow}>
								<div className={blogPage.blurbContainer}>
									<div
										className={blogPage.blurbImage}
										style={{
											position: "relative",
											width: "3rem",
											height: "3rem",
											flex: "none",
										}}
									>
										<Image
											src={urlBuilder(
												postData.attributes.author.data.attributes.image.data
													.attributes.url
											)}
											alt={
												postData.attributes.author.data.attributes.image.data
													.attributes.alternativeText
											}
											width={50}
											height={50}
											style={{ objectFit: "cover" }}
											className={blogPage.blurbAvatar}
										/>
									</div>
									<div className={blogPage.blurbText}>
										<h4>
											Written by{" "}
											{postData.attributes.author.data.attributes.name}
										</h4>
										<p>{postData.attributes.author.data.attributes.bio}</p>
									</div>
								</div>
							</div>
							<div className={blogPage.textRow}>
								<div className={blogPage.blurbContainer}>
									<div className={blogPage.blurbImage}>
										<BiCategory />
									</div>
									<div className={blogPage.blurbText}>category</div>
								</div>
							</div>
							<div className={blogPage.textRow}>
								<div className={blogPage.blurbContainer}>
									<div className={blogPage.blurbImage}>
										<FaCommentDots />
									</div>
									<div className={blogPage.blurbText}>n comments</div>
								</div>
							</div>
							<div className={blogPage.textRow}>
								<div className={blogPage.blurbContainer}>
									<div className={blogPage.blurbImage}>
										<ImCalendar />
									</div>
									<div className={blogPage.blurbText}>
										{postData.attributes.date}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className={`${blogPage.section} ${blogPage.sectionThree}`}>
				<ReactMarkdown>{postData.attributes.content}</ReactMarkdown>
			</section>
		</>
	);
}

export async function getStaticProps({ params }) {
	const { data: BlogPostSlug } = await client.query({
		query: BLOG_POST_SLUG,
		variables: {
			filters: {
				slug: {
					contains: params.slug,
				},
			},
		},
	});

	return {
		props: {
			postData: BlogPostSlug.posts.data[0],
		},
	};
}

export async function getStaticPaths() {
	const { data: BlogPostSlugs } = await client.query({
		query: BLOG_POST_SLUGS,
	});


	const paths = BlogPostSlugs.posts.data.map(
		({ attributes }) => `/blog/${attributes.slug}`
	);


	return {
		paths,
		fallback: false,
	};
}
