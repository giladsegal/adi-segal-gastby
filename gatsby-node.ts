import { GatsbyNode } from "gatsby"
import { resolve } from "path"

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
    await Promise.resolve()

    actions.createPage({
        path: "a/b",
        context: {},
        component: resolve(__dirname, "./src/pages/index.tsx"),
    })
}
