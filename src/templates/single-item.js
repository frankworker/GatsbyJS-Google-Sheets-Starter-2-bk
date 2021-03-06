import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"
import ReactPlayer from "react-player"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"

import Label from "@material-ui/icons/Label"
import Avatar from "@material-ui/core/Avatar"

import { kebabCase } from "lodash"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: ".2em",
  },
  backButton: {
    textDecoration: "none",
  },
  card: {
    width: "50vw",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]: {
      width: "95vw",
    },
  },
  player:{
    [theme.breakpoints.down('sm')]: {
      width: "98vw !important",

    },


  },
  cardContent: {
    height: 200,
  },

  title: {
    lineHeight: 1.2,
    fontsize: "1.3rem",
  },
  instructor: {
    color: "#616161",
  },
  tagChips: {
    margin: "3px 3px 3px 0px",
    height: 26,
  },
  tagArea: {
    marginTop: 10,
  },
  chipLabel: {
    color: "#c5c5c5",
  },
  instructorChips: {
    marginTop: 5,
    background: "none",
  },
})

const ItemPage = ({ data, classes }) => {
  //console.log(data);
  const item = data.item

  return (
    <Layout>
      <Card className={classes.card}>
        <CardActionArea>
          <ReactPlayer controls={true} url={item.videoUrl} playing className={classes.player} />

          <CardContent className={classes.cardContent}>
            <Link
              key={item.id}
              style={{ textDecoration: "none" }}
              to={`/video/${item.id}`}
            >
              <Typography variant="h5" component="h3" className={classes.title}>
                {item.title}
              </Typography>
            </Link>
            <Link
              to={`/instructor/${kebabCase(item.instructor)}/`}
              style={{ textDecoration: "none" }}
            >
              <Chip
                avatar={
                  <Avatar alt="Instructor image" src={item.optimized_instructor_image.childImageSharp.fluid.src} />
                }
                label={item.instructor}
                variant="outlined"
                clickable
                className={classes.instructorChips}
              />
            </Link>
            <div className={classes.tagArea}>
              {item.tags.map(tag => (
                <Link
                  to={`/tag/${kebabCase(tag)}/`}
                  style={{ textDecoration: "none" }}
                >
                  <Chip
                    icon={<Label className={classes.chipLabel} />}
                    clickable
                    label={tag}
                    key={tag.toString()}
                    className={classes.tagChips}
                  />
                </Link>
              ))}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Layout>
  )
}

export default withStyles(styles)(ItemPage)

export const ItemPageQuery = graphql`
  query ItemDetails($itemId: String!) {
    item(id: { eq: $itemId }) {
      id
      move
      videoUrl
      optimized_thumbnail {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      tags
      level
      instructor
      optimized_instructor_image {
        childImageSharp {
          fluid(maxHeight: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
