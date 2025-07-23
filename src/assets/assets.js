import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import spotify_logo from './spotify_logo.png'
import clock_icon from './clock_icon.png'
import mute_icon from './mute_icon.png'
import liked_songs from './liked_songs.png'
import main_liked_songs from './liked_songs_main.jpeg'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'
import img7 from './img7.jpg'
import img8 from './img8.jpg'
import img9 from './img9.jpg'
import img10 from './img10.jpg'
import img11 from './img11.jpg'
import img12 from './img12.jpg'
import img13 from './img13.jpg'
import img14 from './img14.jpg'
import img15 from './img15.jpg'
import img16 from './img16.jpg'
import img17 from './img17.jpg'
import img18 from './img18.jpg'
import img19 from './img19.jpg'
import pod1 from './pod1.jpg'
import pod2 from './pod2.jpg'
import pod3 from './pod3.jpg'
import pod4 from './pod4.png'
import pod5 from './pod5.jpg'
import pod6 from './pod6.jpg'
import pod7 from './pod7.jpg'
import song1 from  './song1.mp3'
import song2 from  './song2.mp3'
import song3 from  './song3.mp3'
import song4 from  './song4.mp3'
import song5 from  './song5.mp3'
import song6 from  './song6.mp3'
import song7 from  './song7.mp3'
import song8 from  './song8.mp3'
import song9 from  './song9.mp3'
import song10 from  './song10.mp3'

export const assets = {
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    volume_icon,
    queue_icon,
    pause_icon,
    arrow_left,
    arrow_right,
    spotify_logo,
    clock_icon,
    mute_icon,
    liked_songs,
    main_liked_songs
}

export const albumsData = [
    {   
        id:0,
        name: "Top 50 Global",
        image: img8,
        desc:"Your daily update of the most played tracks right now - Global.",
        bgColor:"#2a4365"
    },
    {   
        id:1,
        name: "Top 50 India",
        image: img9,
        desc:"Your daily update of the most played tracks right now - India.",
        bgColor:"#22543d"
    },
    {   
        id:2,
        name: "Trending India",
        image: img10,
        desc:"Your daily update of the most viral tracks right now - India.",
        bgColor:"#742a2a"
    },
    {   
        id:3,
        name: "Trending Global",
        image: img16,
        desc:"Your weekly update of the most viral tracks right now - Global.",
        bgColor:"#44337a"
    },
    {   
        id:4,
        name: "Mega Hits",
        image: img11,
        desc:"A mega mix of 75 favorites from the last few years!",
        bgColor:"#234e52"
    },
    {   
        id:5,
        name: "Happy Favorites",
        image: img15,
        desc:"Put a smile on your face with these happy tunes from the last 30 years.",
        bgColor:"#744210"
    }
]

export const songsData = [
    {
        id:0,
        name: "Soda Pop",
        image: img1,
        file:song1,
        desc:"Saja Boys",
        duration:"2:30",
        albumName: "KPop Demon Hunters(Soundtrack from the Netflix Film)",
        releaseYear: "2025",
        plays: "93,303,417",
        bgColor: "#EA99C2"
    },
    {
        id:1,
        name: "Standing Next to You",
        image: img2,
        file:song2,
        desc:"Jung Kook",
        duration:"3:26",
        albumName: "GOLDEN",
        releaseYear: "2023",
        plays: "1,246,879,685",
        bgColor: "#1D762F"
    },
    {
        id:2,
        name: "Watermelon Sugar",
        image: img3,
        file:song3,
        desc:"Harry Styles",
        duration:"2:54",
        albumName: "Fine Line",
        releaseYear: "2019",
        plays: "3,059,788,367",
        bgColor: "#F56565"
    },
    {
        id:3,
        name: "Attention",
        image: img4,
        file:song4,
        desc:"Charlie Puth",
        duration:"3:31",
        albumName: "Voicenotes",
        releaseYear: "2018",
        plays: "2,100,990,682",
        bgColor: "#1A202C"
    },
    {
        id:4,
        name: "Espresso",
        image: img5,
        file:song5,
        desc:"Sabrina Carpenter",
        duration:"2:55",
        albumName: "Espresso",
        releaseYear: "2024",
        plays: "2,403,354,038",
        bgColor: "#3D85C6"
    },
    {
        id:5,
        name: "Save Your Tears (Ft. Ariana Grande)",
        image: img6,
        file:song6,
        desc:"The Weeknd, Ariana Grande",
        duration:"3:11",
        albumName: "Save Your Tears(Remix)",
        releaseYear: "2021",
        plays: "1,901,293,392",
        bgColor: "#E13300"
    },
    {
        id:6,
        name: "Side To Side",
        image: img7,
        file:song7,
        desc:"Ariana Grande, Nicki Minaj",
        duration:"3:46",
        albumName: "Dangerous Women",
        releaseYear: "2016",
        plays: "1,640,561,552",
        bgColor: "#718096"
    },
    {
        id:7,
        name: "Like Crazy",
        image: img17,
        file:song8,
        desc:"Park Jimin",
        duration:"3:32",
        albumName: "FACE",
        releaseYear: "2023",
        plays: "1,376,497,640",
        bgColor: "#D0D0D0"
    },
    {
        id:8,
        name: "Into It",
        image: img18,
        file:song9,
        desc:"Chase Atlantic",
        duration:"3:17",
        albumName: "Chase Atlantic",
        releaseYear: "2017",
        plays: "708,636,410",
        bgColor: "#B70000"
    },
    {
        id:9,
        name: "Run BTS",
        image: img19,
        file:song10,
        desc:"BTS",
        duration:"3:25",
        albumName: "Proof",
        releaseYear: "2022",
        plays: "534,081,327",
        bgColor: "#A3A3A3"
    }
]

export const podcastsData = [
    {
        id:0,
        name: "We Study Billionaires",
        image: pod1,
        desc:"The Investor's Podcast Network"
    },
    {
        id:1,
        name: "Rotten Mango",
        image: pod2,
        desc:"Stephanie Soo"
    },
    {
        id:2,
        name: "MrBallen Podcast",
        image: pod3,
        desc:"The Strange, Dark & Mysterious delivered in podcast format."
    },
    {
        id:3,
        name: "This Past Weekend",
        image: pod4,
        desc:"What happened this past weekend. And sometimes what happened on other days."
    },
    {
        id:4,
        name: "The Daily",
        image: pod5,
        desc:"The New York Times"
    },
    {
        id:5,
        name: "On Purpose with Jay Shetty",
        image: pod6,
        desc:"iHeartPodcats"
    },
    {
        id:6,
        name: "The Desi Crime Podcast",
        image: pod7,
        desc:"Desi Studios"
    }
]

