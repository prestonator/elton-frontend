import React from "react";
import Link from "next/link";
import BlogImage from "./BlogImage";
import blogCardStyles from "../../styles/BlogCard.module.css";

const Card = ({ post }) => {
	return (
		<Link
			href={`/blog/${post.attributes.categories.data.attributes.slug}/${post.attributes.slug}`}
			className={blogCardStyles.articleLink}
		>
			<article className={blogCardStyles.articleCard}>
				<div
					className={blogCardStyles.imageContainer}
					style={{ position: "relative", width: "100%", height: "15rem" }}
				>
					<BlogImage image={post.attributes.image.data.attributes} />
				</div>
				<div className={blogCardStyles.textContainer}>
					<h2 className={blogCardStyles.postTitle}>{post.attributes.title}</h2>
					<div className={blogCardStyles.postMeta}>
						{post.attributes.date} |{" "}
						{post.attributes.categories.data.map((category) => {
							return <span key={category.attributes.slug}>{category.attributes.category}</span>;
						})}
					</div>
					<p className={blogCardStyles.postContent}>
						{post.attributes.excerpt}
					</p>
				</div>
			</article>
		</Link>
	);
};

export default Card;
