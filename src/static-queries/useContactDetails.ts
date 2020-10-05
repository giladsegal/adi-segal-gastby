import { graphql, useStaticQuery } from "gatsby"
import { ContactDetails } from "../types"

export type ContactDetailsQuery = {
    contentfulContactDetails: ContactDetails
}

const contactDetailsQuery = graphql`
    query contactDetailsQuery {
        contentfulContactDetails {
            addressLine1
            addressLine2
            email
            mobileNumber
            photo {
                fluid(maxWidth: 355) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
        }
    }
`

export const useContactDetails = () => {
    return useStaticQuery<ContactDetailsQuery>(contactDetailsQuery)
        .contentfulContactDetails
}
