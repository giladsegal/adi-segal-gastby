import { graphql, useStaticQuery } from "gatsby"
import { Document } from "@contentful/rich-text-types"

export type AboutDetailsQuery = {
    contentfulAboutDetails: {
        childContentfulAboutDetailsResumeRichTextNode: {
            resume: string
        }
    }
}

const aboutDetailsQuery = graphql`
    query aboutDetailsQuery {
        contentfulAboutDetails {
            childContentfulAboutDetailsResumeRichTextNode {
                resume
            }
        }
    }
`

export const useAboutDetails = () => {
    const {
        contentfulAboutDetails: {
            childContentfulAboutDetailsResumeRichTextNode: { resume },
        },
    } = useStaticQuery<AboutDetailsQuery>(aboutDetailsQuery)

    return JSON.parse(resume) as Document
}
