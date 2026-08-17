import type { AnimeDetail, AnimeSummary } from "./types";

/**
 * ---------------------------------------------------------------------------
 * VIDEO_SOURCE_MAP
 * ---------------------------------------------------------------------------
 * This app never fetches or proxies third-party/pirated streams. Instead you
 * plug in URLs to video you have the rights to serve: self-hosted MP4/HLS
 * files, a licensed partner CDN, or a signed URL from your own backend.
 *
 * Shape: { [anilistId]: { [episodeNumber]: "https://.../master.m3u8" } }
 * Anything not listed here falls back to the public HLS.js demo stream so
 * the player UI is fully testable out of the box.
 * ---------------------------------------------------------------------------
 */
export const VIDEO_SOURCE_MAP: Record<number, Record<number, string>> = {
  1: { 1: "https://gdmirrorbot.nl/embed/hhz2udb" },
  2: { 1: "https://rumble.com/embed/v79ewfy/?pub=4pw4c8" },
  3: {
    1: "https://gdmirrorbot.nl/embed/en2l9r6",
    2: "https://gdmirrorbot.nl/embed/taup63d",
    3: "https://gdmirrorbot.nl/embed/jonuq1e",
    4: "https://gdmirrorbot.nl/embed/vru4xh8",
    5: "https://gdmirrorbot.nl/embed/vi3jlvm",
    6: "https://gdmirrorbot.nl/embed/zag1uao"
  },
  4: {
    1: "https://rumble.com/embed/v79suxe/?pub=4pw4c8",
    2: "https://desidubanime.p2pplay.pro/#kl5eju"
  },
  5: { 1: "https://rumble.com/embed/v7a58uo/?pub=4pw4c8" },
  6: { 1: "https://rumble.com/embed/v7a5feq/?pub=4pw4c8" },
  7: { 1: "https://rumble.com/embed/v7a7bfm/?pub=4pw4c8" },
  8: { 1: "https://rumble.com/embed/v7a7no8/?pub=4pw4c8" },
  9: { 1: "https://rumble.com/embed/v7a7myg/?pub=4pw4c8" },
  10: { 1: "https://rumble.com/embed/v7a7myu/?pub=4pw4c8" },
  11: { 1: "https://rumble.com/embed/v7a7mz6/?pub=4pw4c8" },
  12: { 1: "https://rumble.com/embed/v7a7mzg/?pub=4pw4c8" },
  13: { 1: "https://rumble.com/embed/v7a7nok/?pub=4pw4c8" },
  14: { 1: "https://rumble.com/embed/v7a7noi/?pub=4pw4c8" },
  15: { 1: "https://rumble.com/embed/v7a7np0/?pub=4pw4c8" },
  16: { 1: "https://rumble.com/embed/v7a7mzw/?pub=4pw4c8" },
  17: { 1: "https://rumble.com/embed/v7a7n0e/?pub=4pw4c8" },
  18: { 1: "https://rumble.com/embed/v7a7mzy/?pub=4pw4c8" },
  19: { 1: "https://rumble.com/embed/v7a7n0s/?pub=4pw4c8" },
  20: { 1: "https://rumble.com/embed/v7a7n1e/?pub=4pw4c8" },
  21: { 1: "https://rumble.com/embed/v7a7n1i/?pub=4pw4c8" },
  22: { 1: "https://rumble.com/embed/v7a7npa/?pub=4pw4c8" },
  23: { 1: "https://rumble.com/embed/v7a7n1u/?pub=4pw4c8" },
  24: {
    1: "https://rumble.com/embed/v7a7a8u/?pub=4pw4c8",
    2: "https://rumble.com/embed/v7a7a92/?pub=4pw4c8",
    3: "https://rumble.com/embed/v7a7a9i/?pub=4pw4c8",
    4: "https://rumble.com/embed/v7a7a9m/?pub=4pw4c8",
    5: "https://rumble.com/embed/v7a7a9w/?pub=4pw4c8",
    6: "https://rumble.com/embed/v7a7aa0/?pub=4pw4c8",
    7: "https://rumble.com/embed/v7a7aam/?pub=4pw4c8",
    8: "https://rumble.com/embed/v7a7aau/?pub=4pw4c8",
    9: "https://rumble.com/embed/v7a7ab4/?pub=4pw4c8",
    10: "https://rumble.com/embed/v7a7aba/?pub=4pw4c8",
    11: "https://rumble.com/embed/v7a7abg/?pub=4pw4c8",
    12: "https://rumble.com/embed/v7a7abm/?pub=4pw4c8"
  },
  25: {
    1: "https://bysedikamoum.com/e/ognkzpn5dyt8",
    2: "https://bysedikamoum.com/e/ema30vorhehz",
    3: "https://bysedikamoum.com/e/we8fb60802g2",
    4: "https://bysedikamoum.com/e/8v433bmzopxz",
    5: "https://bysedikamoum.com/e/74xsjbznxb1v",
    6: "https://bysedikamoum.com/e/2ylgi82s6pa0",
    7: "https://bysedikamoum.com/e/40av4r58mobr",
    8: "https://bysedikamoum.com/e/43vqxgmhyznv",
    9: "https://bysedikamoum.com/e/7lrijyh1rnjv",
    10: "https://bysedikamoum.com/e/y09hscov1cmd",
    11: "https://bysedikamoum.com/e/8kgn4x3hkrll",
    12: "https://bysedikamoum.com/e/qppr5vptvmet"
  },
  26: {
    1: "https://rumble.com/embed/v7a72to/?pub=4pw4c8",
    2: "https://rumble.com/embed/v7a7336/?pub=4pw4c8",
    3: "https://rumble.com/embed/v7a7318/?pub=4pw4c8",
    4: "https://rumble.com/embed/v7a72zk/?pub=4pw4c8",
    5: "https://rumble.com/embed/v7a7396/?pub=4pw4c8",
    6: "https://rumble.com/embed/v7a732u/?pub=4pw4c8",
    7: "https://rumble.com/embed/v7a739i/?pub=4pw4c8",
    8: "https://rumble.com/embed/v7a730u/?pub=4pw4c8",
    9: "https://rumble.com/embed/v7a7386/?pub=4pw4c8",
    10: "https://rumble.com/embed/v7a738o/?pub=4pw4c8",
    11: "https://rumble.com/embed/v7a73am/?pub=4pw4c8",
    12: "https://rumble.com/embed/v7a73by/?pub=4pw4c8",
    13: "https://rumble.com/embed/v7a73ce/?pub=4pw4c8"
  },
  27: {
    1: "https://bysedikamoum.com/e/8f04g3o6qx6u",
    2: "https://bysedikamoum.com/e/ivxry5iv89ne",
    3: "https://bysedikamoum.com/e/tbupu0p51dk2",
    4: "https://bysedikamoum.com/e/9b33l280ptl0",
    5: "https://bysedikamoum.com/e/kb0gdzpswtx8",
    6: "https://bysedikamoum.com/e/uyrpjfuks3pc",
    7: "https://bysedikamoum.com/e/r7p7h8bgdw3q",
    8: "https://bysedikamoum.com/e/0z37mydrk8ts",
    9: "https://bysedikamoum.com/e/cxfenlnw2l36",
    10: "https://bysedikamoum.com/e/o0d99354d04a",
    11: "https://bysedikamoum.com/e/6lc9dtjdyjh3",
    12: "https://bysedikamoum.com/e/i08nxpowsn00"
  },
  28: {
    1: "https://bysedikamoum.com/e/tn8vgw3204qi",
    2: "https://bysedikamoum.com/e/vvhd16i6nxrq",
    3: "https://bysedikamoum.com/e/1ih7s285jngv",
    4: "https://bysedikamoum.com/e/3vp79rjjy9kc",
    5: "https://bysedikamoum.com/e/1793ujdovbf7",
    6: "https://bysedikamoum.com/e/kl2kswih25is",
    7: "https://bysedikamoum.com/e/bpdf2cfhmydq",
    8: "https://bysedikamoum.com/e/rg4tzcak9bry",
    9: "https://bysedikamoum.com/e/kffc5bbu6stv",
    10: "https://bysedikamoum.com/e/0ra5m43sz4ok",
    11: "https://bysedikamoum.com/e/iclkp740adbt",
    12: "https://bysedikamoum.com/e/hubqhlgw0ft7"
  },
  29: {
    1: "https://bysedikamoum.com/e/dpx7guw6ijd2/the-angel-next-door-spoils-me-rotten-s01e01-hindi",
    2: "https://bysedikamoum.com/e/c0hf3qwn5l42/the-angel-next-door-spoils-me-rotten-s01e02-hindi",
    3: "https://bysedikamoum.com/e/3d02eu2fvak2/the-angel-next-door-spoils-me-rotten-s01e03-hindi",
    4: "https://bysedikamoum.com/e/30ibw9s3vn0a/the-angel-next-door-spoils-me-rotten-s01e04-hindi",
    5: "https://bysedikamoum.com/e/t3gs2odbm4cq/the-angel-next-door-spoils-me-rotten-s01e05-hindi",
    6: "https://bysedikamoum.com/e/z12ircpz5ntm/the-angel-next-door-spoils-me-rotten-s01e06-hindi",
    7: "https://bysedikamoum.com/e/iecggnp4rw5x/the-angel-next-door-spoils-me-rotten-s01e07-hindi",
    8: "https://bysedikamoum.com/e/5b3jbgxvw9ee/the-angel-next-door-spoils-me-rotten-s01e08-hindi",
    9: "https://bysedikamoum.com/e/rp7bzfa986g5/the-angel-next-door-spoils-me-rotten-s01e09-hindi",
    10: "https://bysedikamoum.com/e/qmwk9re0x2rr/the-angel-next-door-spoils-me-rotten-s01e10-hindi",
    11: "https://bysedikamoum.com/e/9zufdzmltoko/the-angel-next-door-spoils-me-rotten-s01e11-hindi",
    12: "https://bysedikamoum.com/e/ylre9g296nqf/the-angel-next-door-spoils-me-rotten-s01e12-hindi",
    13: "https://bysedikamoum.com/e/jz9dtmewvgpf/the-angel-next-door-spoils-me-rotten-s02e01-hindi",
    14: "https://bysedikamoum.com/e/uoc2dbchbgeq/the-angel-next-door-spoils-me-rotten-s02e02-hindi",
    15: "https://bysedikamoum.com/e/mu511m6kv42g/the-angel-next-door-spoils-me-rotten-s02e03-hindi",
    16: "https://bysedikamoum.com/e/1riiddo0gqby/the-angel-next-door-spoils-me-rotten-s02e04-hindi",
    17: "https://bysedikamoum.com/e/imetc3dtszbk/the-angel-next-door-spoils-me-rotten-s02e05-hindi",
    18: "https://bysedikamoum.com/e/im7aquj3i7p5/the-angel-next-door-spoils-me-rotten-s02e06-hindi",
    19: "https://bysedikamoum.com/e/jkanu8yx4qr5/the-angel-next-door-spoils-me-rotten-s02e07-hindi",
    20: "https://bysedikamoum.com/e/59p2rm9u46dg/the-angel-next-door-spoils-me-rotten-s02e08-hindi",
    21: "https://bysedikamoum.com/e/0e4wywuhet74/the-angel-next-door-spoils-me-rotten-s02e09-hindi",
    22: "https://bysedikamoum.com/e/b2k8qk081qfv/the-angel-next-door-spoils-me-rotten-s02e10-hindi",
    23: "https://bysedikamoum.com/e/p976fd7h2wtc/the-angel-next-door-spoils-me-rotten-s02e11-hindi",
    24: "https://bysedikamoum.com/e/9po8w4s68xyl/the-angel-next-door-spoils-me-rotten-s02e12-hindi"
  },
  30: {
    1: "https://bysedikamoum.com/e/cvw3z9kbyvbd",
    2: "https://bysedikamoum.com/e/l65ezbzzr5oi",
    3: "https://bysedikamoum.com/e/yrskkftrbvgl",
    4: "https://bysedikamoum.com/e/dr7zqoff0kmx",
    5: "https://bysedikamoum.com/e/l2cg6ku53mzw",
    6: "https://bysedikamoum.com/e/3o93dghd4k8z",
    7: "https://bysedikamoum.com/e/mre65mpe5au0",
    8: "https://bysedikamoum.com/e/auy804lcm88y",
    9: "https://bysedikamoum.com/e/08fhwhshm42l",
    10: "https://bysedikamoum.com/e/2d2e0ga3ifvi",
    11: "https://bysedikamoum.com/e/k0q3q350veip",
    12: "https://bysedikamoum.com/e/qmzn1bh659b4",
    13: "https://bysedikamoum.com/e/3u6p2c2vuxh3",
    14: "https://bysedikamoum.com/e/6k930jka2wbz"
  },
  31: {
    1: "https://bysedikamoum.com/e/tpjw6o5pkw13",
    2: "https://bysedikamoum.com/e/cb1lun3gc948",
    3: "https://bysedikamoum.com/e/t4ixc5fk4v4d",
    4: "https://bysedikamoum.com/e/0yigez5wad7a",
    5: "https://bysedikamoum.com/e/jynuch9515bp",
    6: "https://bysedikamoum.com/e/6tpfswrv22aw",
    7: "https://bysedikamoum.com/e/78d0exhnct1x",
    8: "https://bysedikamoum.com/e/qed2t7t5zdwl",
    9: "https://bysedikamoum.com/e/8fpbykp8d3js",
    10: "https://bysedikamoum.com/e/3uzepi5v0jyc",
    11: "https://bysedikamoum.com/e/r3037sub2kof",
    12: "https://bysedikamoum.com/e/geuixckic83r"
  }
};

const DEMO_HLS_STREAM = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export function getMockVideoUrl(animeId: number, episodeNumber: number): string {
  return VIDEO_SOURCE_MAP[animeId]?.[episodeNumber] || DEMO_HLS_STREAM;
}

// Updated mapping function to correctly handle real variables
function summary(
  id: number, 
  title: string, 
  score: number, 
  episodes: number, 
  year: number,
  format: string,
  status: string,
  genres: string[],
  coverImage: string,
  bannerImage: string
): AnimeSummary {
  return {
    id,
    title: { romaji: title, english: title, native: null },
    coverImage,
    bannerImage,
    averageScore: score,
    episodes,
    format,
    status,
    seasonYear: year,
    genres,
    audio: ["SUB", "DUB"]
  };
}

export const MOCK_TRENDING: AnimeSummary[] = [
  summary(1, "David", 85, 1, 2024, "MOVIE", "FINISHED", ["Anime Movie", "Animation", "Drama", "Family", "History"], "https://image.tmdb.org/t/p/original/bESlrLOrsQ9gKzaGQGHXKOyIUtX.jpg", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9voxPeFire-ZL891AvdaQsr6Mp6Oq3gB97zPxdzq3Nr9tE_Yu"),
  summary(2, "Indias Got Latent Season 2", 80, 1, 2024, "TV", "RELEASING", ["Hindi"], "https://image.tmdb.org/t/p/w500/eml0QA3zUMizBvrlfQKhWI0swVh.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ph3mdIF2vDiuTw_u60mzyEiS9yHHk5putAZ2-7E_AQ&s=10"),
  summary(3, "Farming Life in Another World X", 78, 6, 2024, "TV", "FINISHED", ["Fantasy", "Slice of Life", "Isekai"], "https://cdn.myanimelist.net/images/anime/1983/132329l.jpg", "https://i.pinimg.com/1200x/55/2c/77/552c7795a79cb12d7d9f5876ac0e3884.jpg"),
  summary(4, "Dr STONE", 85, 2, 2024, "TV", "FINISHED", ["Season 1"], "https://i.postimg.cc/T10gjyVx/upscalemedia-transformed-(10).png", "https://i.pinimg.com/736x/ad/b6/fb/adb6fb0027aa429bff47cbca65265baa.jpg"),
  summary(5, "Chainsaw Man – The Movie: Reze Arc", 90, 1, 2025, "MOVIE", "FINISHED", ["Animation", "Action", "Romance", "Fantasy", "Anime Movie"], "https://image.tmdb.org/t/p/w500/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg", "https://i.pinimg.com/736x/fc/30/0c/fc300c9d8978039c7208b3de2d39beaf.jpg"),
  summary(6, "Your Name", 93, 1, 2016, "MOVIE", "FINISHED", ["Animation", "Romance", "Fantasy", "Anime Movie", "Drama"], "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg", "https://i.pinimg.com/1200x/9f/a5/74/9fa574f9013017a4568880cfa0106fa6.jpg"),
  summary(7, "Weathering with You", 89, 1, 2019, "MOVIE", "FINISHED", ["Animation", "Romance", "Fantasy", "Anime Movie", "Drama"], "https://i.postimg.cc/kXppfS5s/qgrk7r1f-V4Ijuoei-GS5HOh-XNd-LJ.webp", "https://i.postimg.cc/vmdXNtwh/ad7897ecffd637efb49a4472d8f33a9cc108bafb5f0ad89178d0b3a39d6e41c7-SX1080-FMjpg.jpg"),
  summary(8, "Black Clover: Sword of the Wizard King", 84, 1, 2023, "MOVIE", "FINISHED", ["Animation", "Action", "Fantasy", "Anime Movie", "Adventure"], "https://image.tmdb.org/t/p/w500/9YEGawvjaRgnyW6QVcUhFJPFDco.jpg", "https://sm.ign.com/t/ign_in/screenshot/default/enus-blackclover-main-vertical-rgb-pre_rtsf.1280.jpg"),
  summary(9, "Haikyu!! The Dumpster Battle", 91, 1, 2024, "MOVIE", "FINISHED", ["Animation", "Comedy", "Anime Movie"], "https://image.tmdb.org/t/p/w500/ntRU0OA4etGGiMMmH1Yw0bnaMdW.jpg", "https://sm.ign.com/t/ign_in/news/c/crunchyrol/crunchyroll-acquires-haikyu-blue-lock-and-overlord-films-rev_e5m8.1280.jpg"),
  summary(10, "Demon Slayer Kimetsu no Yaiba Infinity Castle", 92, 1, 2025, "MOVIE", "RELEASING", ["Animation", "Action", "Fantasy", "Anime Movie"], "https://image.tmdb.org/t/p/w500/fWVSwgjpT2D78VUh6X8UBd2rorW.jpg", "https://movieswetextedabout.com/wp-content/uploads/2025/09/Demon-Slayer-Infinity-Castle-Banner.jpg"),
  summary(11, "Jujutsu Kaisen", 88, 1, 2024, "MOVIE", "FINISHED", ["Animation", "Action", "Fantasy", "Anime Movie"], "https://image.tmdb.org/t/p/original/yzkgx79vj1KsZBzxFBIsQBwBkPE.jpg", "https://cdn.nerdist.com/wp-content/uploads/2022/03/12181901/JJK_Movie_16x9_Twitter-Post-V2.jpg"),
  summary(12, "Lost in Starlight", 82, 1, 2024, "MOVIE", "FINISHED", ["Animation", "Romance", "Science Fiction", "Anime Movie", "Drama"], "https://image.tmdb.org/t/p/w500/dXlUIfwejWa9YvugU9V773dUASY.jpg", "https://www.acmodasi.in/amdb/images/movie/m/y/lost-in-starlight-2025-IPKIdM.jpg"),
  summary(13, "My Hero Academia You're Next", 85, 1, 2024, "MOVIE", "FINISHED", ["Animation", "Action", "Adventure", "Anime Movie", "Science Fiction"], "https://image.tmdb.org/t/p/w500/tTrI6PwqzxkgO3dvQ7BEKXM7SYR.jpg", "https://dx35vtwkllhj9.cloudfront.net/toho-international/my-hero-academia-youre-next/images/regions/us/share.png"),
  summary(14, "My.Hero.Academia.Two.Heroes", 83, 1, 2018, "MOVIE", "FINISHED", ["Animation", "Action", "Adventure", "Anime Movie", "Fantasy"], "https://image.tmdb.org/t/p/w500/hC4nTxdhXqFWzgqynGvvXVMiMNp.jpg", "https://i.ytimg.com/vi/bF6r_JPYUkA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBU3YqhIRcc4MeWwKnRXEGc1Jffgg"),
  summary(15, "My Hero Academia: World Heroes Mission", 84, 1, 2021, "MOVIE", "FINISHED", ["Animation", "Science Fiction", "Adventure", "Anime Movie", "Action"], "https://image.tmdb.org/t/p/w500/AsTlA7dj2ySGY1pzGSD0MoHFhEF.jpg", "https://images7.alphacoders.com/120/thumb-1920-1209322.png"),
  summary(16, "My Hero Academia: Heroes Rising", 86, 1, 2019, "MOVIE", "FINISHED", ["Animation", "Action", "Adventure", "Anime Movie", "Fantasy"], "https://image.tmdb.org/t/p/w500/kpWsIkfXrnQ1pmR79qAHHq7DPxc.jpg", "https://thebannercsi.com/wp-content/uploads/2020/03/mha_hero.jpg"),
  summary(17, "One Piece: The Movie", 78, 1, 2000, "MOVIE", "FINISHED", ["Animation", "Fantasy", "Comedy", "Anime Movie", "Adventure", "Action"], "https://image.tmdb.org/t/p/w500/aRqQNSuXpcE3dkJC43aEg9f2HXd.jpg", "https://image.tmdb.org/t/p/w500/aRqQNSuXpcE3dkJC43aEg9f2HXd.jpg"),
  summary(18, "One Piece Clockwork Island Adventure", 79, 1, 2001, "MOVIE", "FINISHED", ["Animation", "Adventure", "Action", "Anime Movie"], "https://image.tmdb.org/t/p/w500/phrVSY5cpUkybc0gU41crWi2XIP.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0pnP75ug8lHxZoFMNXHwGQ4x2HLYf66qcGdRW6QRHGg&s=10"),
  summary(19, "Re ZERO Starting Life in Another World Memory Snow", 80, 1, 2018, "MOVIE", "FINISHED", ["Animation", "Adventure", "Fantasy", "Anime Movie"], "https://image.tmdb.org/t/p/w500/y7XwmyE5ue9hjk65fEWpO2hGU2B.jpg", "https://m.media-amazon.com/images/M/MV5BYzQ1YjVlMDgtYmQ4Mi00ZWM3LTgxYTItN2VkZjhmNjkyZTZkXkEyXkFqcGc@._V1_.jpg"),
  summary(20, "Re ZERO Starting Life in Another World The Frozen Bond", 82, 1, 2019, "MOVIE", "FINISHED", ["Animation", "Fantasy", "Anime Movie", "Drama"], "https://image.tmdb.org/t/p/w500/ca2ZsUa4Qeik2IwlXFzV51hdxh0.jpg", "https://i.ytimg.com/vi/nUVSklUurTI/maxresdefault.jpg"),
  summary(21, "Scarlet", 80, 1, 2024, "MOVIE", "FINISHED", ["Animation", "Action", "Science Fiction", "Anime Movie", "Drama"], "https://image.tmdb.org/t/p/original/6YWZ8HwZLhLb3D1qmtfBab2a2Bw.jpg", "https://occ-0-8407-448.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABfygoBMGV9QtpFOEXIy7-G-q5UBX_aHdoh9yOe9pOlgSBP_wVli_kNErxmwfhiKpQs4UOITcpj7cu8_4rb153veYVeASZba82KN7.jpg?r=01d"),
  summary(22, "Spy x Family Code White", 87, 1, 2023, "MOVIE", "FINISHED", ["Animation", "Action", "Adventure", "Anime Movie", "Comedy"], "https://image.tmdb.org/t/p/w500/xlIQf4y9eB14iYzNN142tROIWON.jpg", "https://www.impericon.com/cdn/shop/articles/Spy_family_Code_White_1200x1200_crop_center.webp?v=1718270858"),
  summary(23, "Suzume", 88, 1, 2022, "MOVIE", "FINISHED", ["Animation", "Adventure", "Fantasy", "Anime Movie", "Drama"], "https://image.tmdb.org/t/p/w500/yStW1TXF5s7Tbtu9KjIZEaWl6HL.jpg", "https://sm.ign.com/t/ign_in/photo/default/suzume-blogroll-1680555973534_yf74.1280.jpg"),
  summary(24, "A Condition Called Love", 81, 12, 2024, "TV", "FINISHED", ["Animation", "Comedy", "Season 1", "Drama"], "https://image.tmdb.org/t/p/w500/aaYPPivWuebwIKQvFYuWkp9m0q5.jpg", "https://butwhytho.net/wp-content/uploads/2024/06/A-Condition-Called-Love-Season-1-But-Why-Tho-4.jpg"),
  summary(25, "MF Ghost", 83, 12, 2023, "TV", "FINISHED", ["Animation", "Action", "Racing", "Adventure", "Season 1"], "https://i.postimg.cc/FK5KMRkT/pinterest-pin-1783786079299.jpg", "https://i.postimg.cc/q7317mR6/pinterest-pin-1783786961779.jpg"),
  summary(26, "Horimiya", 87, 13, 2021, "TV", "FINISHED", ["Animation", "Comedy", "Drama", "Season 1"], "https://image.tmdb.org/t/p/w500/iSOKGl5KIeOCAtigUDCfFZe2cOi.jpg", "https://i.postimg.cc/V66qxrSz/download.jpg"),
  summary(27, "Jack of All Trades Party of None", 76, 12, 2024, "TV", "FINISHED", ["Animation", "Action & Adventure", "Sci-Fi & Fantasy", "Season 1"], "https://image.tmdb.org/t/p/w500/qRvICaz6LJXz96DaYcpTjQf6QN8.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8al2XZ6xu1hfZfY_-45cDkd0M_tPvImLMC1sX9UnV1g&s"),
  summary(28, "365 Days to the Wedding", 80, 12, 2024, "TV", "FINISHED", ["Animation", "Comedy", "Season 1"], "https://image.tmdb.org/t/p/w500/lMVkOrMaWEkHZLdPksKGcdi6hJg.jpg", "https://i.ytimg.com/vi/LzNpU_ckjTs/maxresdefault.jpg"),
  summary(29, "The Angel Next Door Spoils Me Rotten", 84, 24, 2023, "TV", "FINISHED", ["Animation", "Comedy", "Season 2", "Season 1"], "https://image.tmdb.org/t/p/original/pjNFTabj2mXUGquE8Oj3buPeKvQ.jpg", "https://image.tmdb.org/t/p/original/pjNFTabj2mXUGquE8Oj3buPeKvQ.jpg"),
  summary(30, "The Ramparts of Ice", 82, 14, 2024, "TV", "FINISHED", ["Animation", "Comedy", "Drama", "Season 1"], "https://image.tmdb.org/t/p/w500/rke9UC2QrogvxiQD9TGpbvqDosi.jpg", "https://image.tmdb.org/t/p/w500/rke9UC2QrogvxiQD9TGpbvqDosi.jpg"),
  summary(31, "With You Our Love Will Make It Through", 85, 12, 2024, "TV", "FINISHED", ["Animation", "Sci-Fi & Fantasy", "Drama", "Season 1"], "https://image.tmdb.org/t/p/w500/uQb3NkDWEXQ9m1w49PzEy04uFn1.jpg", "https://image.tmdb.org/t/p/w500/uQb3NkDWEXQ9m1w49PzEy04uFn1.jpg")
];

export const MOCK_DETAIL: AnimeDetail = {
  ...summary(5, "Chainsaw Man – The Movie: Reze Arc", 90, 1, 2025, "MOVIE", "FINISHED", ["Animation", "Action", "Romance", "Fantasy", "Anime Movie"], "https://image.tmdb.org/t/p/w500/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg", "https://i.pinimg.com/736x/fc/30/0c/fc300c9d8978039c7208b3de2d39beaf.jpg"),
  description:
    "In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.",
  studios: ["MAPPA"], 
  season: "SUMMER", 
  trailerId: null,
  characters: [
    {
      characterName: "Denji",
      characterImage: "https://picsum.photos/seed/denji/200/280",
      role: "MAIN",
      vaName: "Kikunosuke Toya", 
      vaImage: "https://picsum.photos/seed/kiku/200/280",
      vaLanguage: "Japanese"
    },
    {
      characterName: "Reze",
      characterImage: "https://picsum.photos/seed/reze/200/280",
      role: "MAIN",
      vaName: "Reina Ueda", 
      vaImage: "https://picsum.photos/seed/reina/200/280",
      vaLanguage: "Japanese"
    }
  ],
  episodeList: [
    {
      number: 1,
      title: "Movie",
      thumbnail: "https://image.tmdb.org/t/p/w500/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg",
      durationSec: 6000,
      videoUrl: getMockVideoUrl(5, 1),
      introStartSec: 0,
      introEndSec: 90,
      outroStartSec: 5800
    }
  ],
  recommendations: MOCK_TRENDING.slice(9, 15) // Recommends titles like Demon Slayer and JJK
}; 
