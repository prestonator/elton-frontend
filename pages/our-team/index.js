// pages/our-team/index.js
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";


const TEAM_MEMBERS = gql`
	{
		ourteams {
			data {
				id
				attributes {
					name
					slug
					biography
				}
			}
		}
	}
`;

export default function OurTeam() {
	//Execute the query using the useQuery hook and store the return values.
	const { loading, error, data } = useQuery(TEAM_MEMBERS);

	//Display the following when fetching
	if (loading) return <p>Loading...</p>;
	//Display the following in case an error is encountered
	if (error) return <p>Error :(</p>;
	//log the data to the console
	console.log(data);

	return (
		<div>
			<h1>All Team Members</h1>
            {data.ourteams.data.map((member) => (
				<div key={member.id} className="mt-2 mb-2 p-4 bg-white rounded-md">
					<div className="text-xl">{member.attributes.Title}</div>

					<small>{member.attributes.name}</small>

					{/* Display only the first 150 characters of the body */}
					<div>{member.attributes.biography.substring(0, 150)}...</div>

					{/* Link to display the whole member content */}
					<Link href={`/our-team/${member.attributes.slug}`} className="text-purple-600">
						Read more...
					</Link>
				</div>
			))}
		</div>
	);
}
