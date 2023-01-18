import Image from "next/image"
import urlBuilder from "@/lib/imageUrl"


const BlogImage = ({ image }) => {

  const imageUrl = urlBuilder(image.url)
  const imageAlt = image.alternativeText


  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    <Image
      // loader={loader}
      fill
      style={{ objectFit: "cover" }}
      src={imageUrl}
      alt={imageAlt}
    />
  )
}

export default BlogImage