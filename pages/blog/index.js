import React from "react";
import client from "@/lib/graphql/apollo-client";
import Link from "next/link";
import BlogImage from "@/components/blog/BlogImage";
import { BLOG_POSTS, BLOG_PAGE_HERO } from "@/lib/graphql/apollo-queries";
import utilStyles from "@/styles/BlogPage.module.css";
import blogCardStyles from "@/styles/BlogCard.module.css";

const { data: BlogPageHero } = client.query({
	query: BLOG_PAGE_HERO,
	variables: {
		"mediaId": 2,
	},
});

const BlogPage = ({ posts }) => {
	const half = Math.ceil(posts.length / 2);
	const firstHalf = posts.slice(0, half);
	const secondHalf = posts.slice(half);

	

	console.log(BlogPageHero);

	return (
		<>
			<section className={`${utilStyles.section} ${utilStyles.sectionOne}`}>
				<div className={utilStyles.row}>
					<div className={utilStyles.heroTextWrapper}>
						<h1 className={utilStyles.textHeading}>Blog</h1>
						<h3 className={utilStyles.subHeading}>Latest News</h3>
						<p className={utilStyles.textContent}>
							Here you will find all of our blog posts. They can help answer
							questions you may have and provide general knowledge on various
							subjects. Both Criminal Law and Family Law posts are featured
							here.
						</p>
					</div>
				</div>
			</section>
			<section className={`${utilStyles.section} ${utilStyles.sectionTwo}`}>
				<div className={`${utilStyles.blogCol} ${utilStyles.blogColOne}`}>
					{firstHalf.map((post) => {
						return (
							<Link
								key={post.attributes.slug}
								href={`/blog/${post.attributes.slug}`}
								className={blogCardStyles.articleLink}
							>
								<article className={blogCardStyles.articleCard}>
									<div
										className={blogCardStyles.imageContainer}
										style={{
											position: "relative",
											width: "100%",
											height: "15rem",
										}}
									>
										<BlogImage image={post.attributes.image.data.attributes} />
									</div>
									<div className={blogCardStyles.textContainer}>
										<h2 className={blogCardStyles.postTitle}>
											{post.attributes.title}
										</h2>
										<div className={blogCardStyles.postMeta}>
											{post.attributes.date} |{" "}
											{post.attributes.categories.data.map((category) => {
												return (
													<span key={category.attributes.slug}>
														{category.attributes.category}
													</span>
												);
											})}
										</div>
										<p className={blogCardStyles.postContent}>
											{post.attributes.excerpt}
										</p>
									</div>
								</article>
							</Link>
						);
					})}
				</div>
                <div className={`${utilStyles.blogCol} ${utilStyles.blogColTwo}`}>
                {secondHalf.map((post) => {
						return (
							<Link
								key={post.attributes.slug}
								href={`/blog/${post.attributes.slug}`}
								className={blogCardStyles.articleLink}
							>
								<article className={blogCardStyles.articleCard}>
									<div
										className={blogCardStyles.imageContainer}
										style={{
											position: "relative",
											width: "100%",
											height: "15rem",
										}}
									>
										<BlogImage image={post.attributes.image.data.attributes} />
									</div>
									<div className={blogCardStyles.textContainer}>
										<h2 className={blogCardStyles.postTitle}>
											{post.attributes.title}
										</h2>
										<div className={blogCardStyles.postMeta}>
											{post.attributes.date} |{" "}
											{post.attributes.categories.data.map((category) => {
												return (
													<span key={category.attributes.slug}>
														{category.attributes.category}
													</span>
												);
											})}
										</div>
										<p className={blogCardStyles.postContent}>
											{post.attributes.excerpt}
										</p>
									</div>
								</article>
							</Link>
						);
					})}
				</div>
                <div className={`${utilStyles.blogCol} ${utilStyles.blogColThree}`}>
					<input type="text" placeholder="Search" />
					<p>Recent Posts</p>
					<ul>
						{posts.map((post) => (
							<li key={post.attributes.slug} className={`${utilStyles.blogLinkSideBar}`}>
								{post.attributes.title}
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
};

export async function getStaticProps() {
	// Run API calls in parallel
	const { data: BlogPosts } = await client.query({
		query: BLOG_POSTS,
	});

	// console.log(BlogPosts.posts.data);

	return {
		props: {
			posts: BlogPosts.posts.data,
		},
		revalidate: 1,
	};
}

export default BlogPage;
