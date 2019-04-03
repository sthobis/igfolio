const cheerio = require("cheerio")
const rp = require("request-promise")
const { json, send } = require("micro")

module.exports = async (req, res) => {
  try {
    const { username } = await json(req)

    const $ = await rp({
      uri: `https://instagram.com/${username}`,
      transform: body => cheerio.load(body)
    })
    const userGraphString = $("body script").first().html()
    const userGraph = JSON.parse(
      userGraphString.substring(
        "window._sharedData = ".length,
        userGraphString.length - 1
      )
    )
    const user = userGraph.entry_data.ProfilePage[0].graphql.user
    const images = user.edge_owner_to_timeline_media.edges
      .slice(0, 6)
      .map(obj => obj.node.display_url)

    send(res, 200, { username, images })
  } catch (e) {
    sendError(req, res, e)
  }
}