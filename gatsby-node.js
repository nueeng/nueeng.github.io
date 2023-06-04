const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
  return graphql(
    `
      {
        allMarkdownRemark(
          filter: {
            frontmatter: { title: { ne: "null" }, draft: { ne: true } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              html
              fields {
                slug
              }
              frontmatter {
                title
                category
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
            next {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allMarkdownRemark.edges.forEach((edge) => {
      createPage({
        path: edge.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: edge.node.fields.slug,
          previous: edge.next,
          next: edge.previous,
        },
      });
    });
  });
};
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

// Github Actions 추가하려고 넣은 코드
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadata {
      blogName: "누에의 개발로그",

      title: "개발로그",
      author: "nueeng",
      bio: "누에의 개발로그",
    
      githubUrl: "https://github.com/nueeng",
      blogUrl: "https://nueeng.github.io/",
    }
  `;
  createTypes(typeDefs);
};
