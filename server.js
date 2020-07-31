const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4D03AQGKac3jwioxMg/profile-displayphoto-shrink_400_400/0?e=1599091200&v=beta&t=NhqOECyjpbNAFW_KIJNZNMQOZ-9CiaTUWt4anWdENz4",
        name: "Júlia Totta",
        role: 'Estudante - <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>',
        description: "Futura desenvolvedora Web Full-Stack",
        links: [
            { name: "GitHub", url: "https://github.com/juliatotta" },
            { name: "Twitter", url: "https://twitter.com/tottajulia" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/j%C3%BAlia-totta-746476182/" }
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
            return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log("server is running")
})