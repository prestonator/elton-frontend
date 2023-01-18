import { useQuery, gql } from "@apollo/client";
import client from "./apollo-client";

export const TEAM_MEMBER_SLUGS = gql`
	query TeamMemberSlug {
		ourteams {
			data {
				attributes {
					slug
				}
			}
		}
	}
`;

export const TEAM_MEMBER_SLUG = gql`
	query TeamMemberBySlug($filters: OurteamFiltersInput) {
		ourteams(filters: $filters) {
			data {
				attributes {
					slug
					name
					title
					phone
					email
					biography
					location
					tabOne
					tabTwo
					tabThree
					tabFour
					tabOneTitle
					tabTwoTitle
					tabThreeTitle
					tabFourTitle
					headshot {
						data {
							attributes {
								url
								alternativeText
							}
						}
					}
				}
			}
		}
	}
`;

export const TEAM_MEMBER = gql`
	query getTeamMember($slug: String!) {
		ourteam(id: $slug) {
			data {
				id
				attributes {
					name
					title
					location
					phone
					email
					biography
					slug
					headshot {
						data {
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const MENU_LEFT = gql`
	query MenuLeft(
		$navigationIdOrSlug: String!
		$type: NavigationRenderType
		$menuOnly: Boolean
	) {
		renderNavigation(
			navigationIdOrSlug: $navigationIdOrSlug
			type: $type
			menuOnly: $menuOnly
		) {
			id
			title
			path
			items {
				id
				title
				path
			}
		}
	}
`;

export const MENU_RIGHT = gql`
	query MenuRight(
		$navigationIdOrSlug: String!
		$type: NavigationRenderType
		$menuOnly: Boolean
	) {
		renderNavigation(
			navigationIdOrSlug: $navigationIdOrSlug
			type: $type
			menuOnly: $menuOnly
		) {
			id
			title
			path
			items {
				id
				title
				path
			}
		}
	}
`;

export const MENU_LOGO = gql`
	query MenuLogo {
		global {
			data {
				attributes {
					logo {
						data {
							attributes {
								url
								alternativeText
							}
						}
					}
				}
			}
		}
	}
`;

export const FOOTER_BG = gql`
	query FooterBg($mediaId: ID) {
		media(id: $mediaId) {
			data {
				attributes {
					image {
						data {
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const BLOG_POSTS = gql`
	query BlogPosts {
		posts {
			data {
				attributes {
					title
					date
					excerpt
					image {
						data {
							attributes {
								url
								alternativeText
							}
						}
					}
					content
					slug
					categories {
						data {
							attributes {
								category
								slug
							}
							id
						}
					}
					author {
						data {
							attributes {
								image {
									data {
										attributes {
											url
											alternativeText
										}
									}
								}
								bio
								name
							}
						}
					}
				}
			}
		}
	}
`;

export const BLOG_POST_SLUG = gql`
	query BlogPostSlug($filters: PostFiltersInput) {
		posts(filters: $filters) {
			data {
				attributes {
					title
					slug
					date
					image {
						data {
							attributes {
								url
								alternativeText
							}
						}
					}
					content
					categories {
						data {
							attributes {
								category
								slug
							}
						}
					}
					author {
						data {
							attributes {
								image {
									data {
										attributes {
											url
											alternativeText
										}
									}
								}
								name
								bio
							}
						}
					}
				}
			}
		}
	}
`;

export const BLOG_POST_SLUGS = gql`
	query BlogPostSlugs {
		posts {
			data {
				attributes {
					slug
				}
			}
		}
	}
`;

export const BLOG_PAGE_HERO = gql`
	query BlogPageHero($mediaId: ID) {
		media(id: $mediaId) {
			data {
				attributes {
					image {
						data {
							attributes {
								url
								alternativeText
							}
						}
					}
				}
			}
		}
	}
`;
