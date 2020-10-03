import { graphql, useStaticQuery } from "gatsby"
import { Document } from "@contentful/rich-text-types"
import { FluidObject, FixedObject } from "gatsby-image"

export type AboutDetailsQuery = {
    contentfulAboutDetails: {
        childContentfulAboutDetailsResumeRichTextNode: {
            resume: string
        }
    }
    allContentfulAboutDetailsPhoto: {
        nodes: Array<{
            photo: {
                contentful_id: string
                fluid: FluidObject
                fixed: FixedObject
            }
        }>
    }
}

const aboutDetailsQuery = graphql`
    query aboutDetailsQuery {
        contentfulAboutDetails {
            childContentfulAboutDetailsResumeRichTextNode {
                resume
            }
        }
        allContentfulAboutDetailsPhoto {
            nodes {
                photo {
                    contentful_id
                    fluid {
                        ...GatsbyContentfulFluid_withWebp
                    }
                    fixed(width: 135, height: 135) {
                        ...GatsbyContentfulFixed_withWebp
                    }
                }
            }
        }
    }
`

export const useAboutDetails = () => {
    const {
        contentfulAboutDetails: {
            childContentfulAboutDetailsResumeRichTextNode: { resume },
        },
        allContentfulAboutDetailsPhoto: { nodes },
    } = useStaticQuery<AboutDetailsQuery>(aboutDetailsQuery)

    return { images: nodes, resume: JSON.parse(resume) as Document }
}
