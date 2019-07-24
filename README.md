# gatsby-framework-blog

Bring-Your-Own-CMS Framework for Gatsby Blog

## The problem

There are many great Gatsby starters/themes out there, each having its own opinions for content type (BlogPost, Category, Tag, etc) and CMS (MDX, Contentful, Sanity, etc). When deciding which to use, users either have to choose a theme that fits their use case and preferred CMS, or they have to spend time converting the unfit themes.

## This solution

This framework attempt to establish a set of universally accepted data types with adapters to several data sources. When theme developers adopt the framework, they allow users to choose from where data is coming.

This is an effort to bring Gatsby 1 step closer to WordPress as it can establish a "marketplace" of themes (free or paid) that every users can plug and play without the hassle of converting/massaging data or sources.

## The design

At its core, `gatsby-framework-blog` establishes a set of data interfaces: `BlogPost` and `Tag`.

It provides a collection of adapters that will transform data into its equivalent interface. For example, using `gatsby-framework-blog-contentful` and `gatsby-source-contentful` together, you can create `BlogPost` nodes from `ContentfulBlogPost` nodes.

This creates a consistent API that allows UI developers to create beautiful themes and designs that will work no matter how the data is sourced.
