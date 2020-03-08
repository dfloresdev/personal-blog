import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    const containerHeader = {
        minHeight: "350px",
        backgroundImage: "url(" + post.feature_image + ")",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <section style={containerHeader}></section>
                <div className="site-main">
                    <div className="container">
                        <article className="content">
                            <div className="">
                                <section className="post-full-content">
                                    <h1 className="content-title-post">
                                        {post.title}
                                    </h1>
                                    <div className="post-data-author">
                                        <div className="post-data-author__section">
                                            <img
                                                className="post-data-author__section-name-tag"
                                                src={
                                                    post.primary_author
                                                        .profile_image
                                                }
                                                alt={post.primary_author.name}
                                            />
                                            <div>
                                                <p className="data-post-author">
                                                    {post.primary_author.name}
                                                </p>
                                                <p className="data-post-author">
                                                    {post.primary_tag.name}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="data-post-author">
                                            {new Date(
                                                post.published_at
                                            ).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </p>
                                    </div>

                                    {/* The main post content */}
                                    <section
                                        className="content-body load-external-scripts"
                                        dangerouslySetInnerHTML={{
                                            __html: post.html
                                        }}
                                    />
                                </section>
                            </div>
                        </article>
                    </div>
                </div>
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string
        }).isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
