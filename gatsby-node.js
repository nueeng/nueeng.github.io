const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);

  const result = await graphql(`
  {
    categories: allMarkdownRemark {
      distinct(field: {frontmatter: {category: SELECT}})
    }
  }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const categories = result.data.categories.distinct;

  for (const category of categories) {
    const categoryPosts = await graphql(`
    query ($category: String) {
      posts: allMarkdownRemark(
        filter: {
          frontmatter: { category: { eq: $category }, draft: { ne: true } }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
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
    `, { category });

    if (categoryPosts.errors) {
      throw categoryPosts.errors;
    }

    const posts = categoryPosts.data.posts.edges;

    posts.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
          previous: index === posts.length - 1 ? null : posts[index + 1].node,
          next: index === 0 ? null : posts[index - 1].node,
          category,
        },
      });
    });
  }
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
      blogName: String
      title: String
      author: String
      bio: String
      githubUrl: String
      blogUrl: String
    }
  `;
  createTypes(typeDefs);
};
