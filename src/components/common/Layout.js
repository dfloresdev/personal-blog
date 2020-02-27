import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null;

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header
                        className="site-head"
                        style={{
                            ...(site.cover_image && {
                                backgroundImage: `url(${site.cover_image})`
                            })
                        }}
                    >
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        {site.logo ? (
                                            <img
                                                className="site-logo"
                                                src={site.logo}
                                                alt={site.title}
                                            />
                                        ) : (
                                            <Img
                                                fixed={
                                                    data.file.childImageSharp
                                                        .fixed
                                                }
                                                alt={site.title}
                                            />
                                        )}
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    {site.twitter && (
                                        <a
                                            href={twitterUrl}
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="site-nav-icon"
                                                src="/images/icons/twitter.svg"
                                                alt="Twitter"
                                            />
                                        </a>
                                    )}
                                    {site.facebook && (
                                        <a
                                            href={facebookUrl}
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="site-nav-icon"
                                                src="/images/icons/facebook.svg"
                                                alt="Facebook"
                                            />
                                        </a>
                                    )}
                                    <a
                                        className="site-nav-item"
                                        href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="site-nav-icon"
                                            src="/images/icons/rss.svg"
                                            alt="RSS Feed"
                                        />
                                    </a>
                                </div>
                            </div>
                            {isHome ? (
                                <div className="site-banner">
                                    <img
                                        className="site-banner-img"
                                        src="/images/davidFlores.jpg"
                                    />
                                    <h1 className="site-banner-title">
                                        ¡Hola!🙊 Soy David Flores 🙋‍♂
                                    </h1>
                                    <p className="site-banner-desc">
                                        Ingeniero en Sistemas Computacionales,
                                        estudiante de la primer{" "}
                                        <strong>escuela de JavaScript</strong>{" "}
                                        de Platzi y del programa{" "}
                                        <strong>Platzi Master</strong>. Me
                                        encanta aprender, practicar y proponer
                                        soluciones que ayuden a las personas a
                                        hacer su vida más simple.
                                    </p>
                                    <p className="site-banner-desc">
                                        Me encanta desarrollar con{" "}
                                        <strong>React</strong>,{" "}
                                        <strong>Angular</strong>,{" "}
                                        <strong>Node</strong>,{" "}
                                        <strong>Firebase</strong> y{" "}
                                        <strong>Google Cloud Platform</strong>.
                                    </p>
                                    <p className="site-banner-desc">
                                        Desarrollo software con amor y me
                                        encanta{" "}
                                        <strong>
                                            compartir mi conocimiento
                                        </strong>{" "}
                                        a través de mi{" "}
                                        <a
                                            href="https://www.youtube.com/channel/UCB1lf-mZ7RSU-pSSR4f_IKA"
                                            target="_blank"
                                        >
                                            <strong>canal de Youtube</strong>
                                        </a>{" "}
                                        o este{" "}
                                        <a href="#">
                                            <strong>increíble blog</strong>
                                        </a>
                                        .
                                    </p>
                                </div>
                            ) : null}
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    {/* The navigation items as setup in Ghost */}
                                    <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                                </div>
                                <div className="site-nav-right">
                                    <Link
                                        className="site-nav-button"
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>
                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">{site.title}</Link> © 2020 - If we
                                grow together, we grow stronger
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation
                                    data={site.navigation}
                                    navClass="site-foot-nav-item"
                                />
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired
    }).isRequired
};

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
