export const SUBSCRIPTIONS_CATEGORIES = {
	streaming: {
		name: "Streaming",
		slug: "streaming",
	},
	news: {
		name: "News",
		slug: "news",
	},
	code: {
		name: "Code",
		slug: "code",
	},
	music: {
		name: "Music",
		slug: "music",
	},
	gaming: {
		name: "Gaming",
		slug: "gaming",
	},
	cloud: {
		name: "Cloud",
		slug: "cloud",
	},
	domain: {
		name: "Domain",
		slug: "domain",
	},
	other: {
		name: "Other",
		slug: "other",
	},
} as const;

export const SUBSCRIPTION_SERVICES = [
	{
		name: "Netflix",
		slug: "netflix",
		url: "https://www.netflix.com/browse",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Prime Video",
		slug: "prime-video",
		url: "https://www.primevideo.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Disney+",
		slug: "disney-plus",
		url: "https://www.disneyplus.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "HBO Max",
		slug: "hbo-max",
		url: "https://www.hbomax.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Hulu",
		slug: "hulu",
		url: "https://www.hulu.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Apple TV+",
		slug: "apple-tv-plus",
		url: "https://www.apple.com/apple-tv-plus/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Canal+",
		slug: "canal-plus",
		url: "https://www.canalplus.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Peacock",
		slug: "peacock",
		url: "https://www.peacocktv.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Paramount+",
		slug: "paramount-plus",
		url: "https://www.paramountplus.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Discovery+",
		slug: "discovery-plus",
		url: "https://www.discoveryplus.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "ESPN+",
		slug: "espn-plus",
		url: "https://www.espn.com/watch/espnplus/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Showtime",
		slug: "showtime",
		url: "https://www.showtime.com/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "YouTube Premium",
		slug: "youtube-premium",
		url: "https://tv.youtube.com/welcome/",
		category: SUBSCRIPTIONS_CATEGORIES.streaming.slug,
	},
	{
		name: "Le Monde",
		slug: "le-monde",
		url: "https://www.lemonde.fr/",
		category: SUBSCRIPTIONS_CATEGORIES.news.slug,
	},
	{
		name: "The New York Times",
		slug: "the-new-york-times",
		url: "https://www.nytimes.com/",
		category: SUBSCRIPTIONS_CATEGORIES.news.slug,
	},
	{
		name: "The Washington Post",
		slug: "the-washington-post",
		url: "https://www.washingtonpost.com/",
		category: SUBSCRIPTIONS_CATEGORIES.news.slug,
	},
	{
		name: "Github Copilot",
		slug: "github-copilot",
		url: "https://copilot.github.com/",
		category: SUBSCRIPTIONS_CATEGORIES.code.slug,
	},
	{
		name: "Spotify",
		slug: "spotify",
		url: "https://www.spotify.com/",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "Apple Music",
		slug: "apple-music",
		url: "https://www.apple.com/apple-music/",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "Deezer",
		slug: "deezer",
		url: "https://www.deezer.com/",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "Tidal",
		slug: "tidal",
		url: "https://www.tidal.com/",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "SoundCloud",
		slug: "soundcloud",
		url: "https://soundcloud.com/",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "YouTube Music",
		slug: "youtube-music",
		url: "https://music.youtube.com/",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "Amazon Music",
		slug: "amazon-music",
		url: "https://www.amazon.com/music/unlimited",
		category: SUBSCRIPTIONS_CATEGORIES.music.slug,
	},
	{
		name: "Plex",
		slug: "plex",
		url: "https://www.plex.tv/",
		category: SUBSCRIPTIONS_CATEGORIES.other.slug,
	},
	{
		name: "Twitch",
		slug: "twitch",
		url: "https://www.twitch.tv/",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "Nintendo Switch Online",
		slug: "nintendo-switch-online",
		url: "https://www.nintendo.com/switch/online-service/",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "PlayStation Plus",
		slug: "playstation-plus",
		url: "https://www.playstation.com/en-us/ps-plus/",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "Xbox Game Pass",
		slug: "xbox-game-pass",
		url: "https://www.xbox.com/en-US/xbox-game-pass",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "EA Play",
		slug: "ea-play",
		url: "https://www.ea.com/ea-play",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "Apple Arcade",
		slug: "apple-arcade",
		url: "https://www.apple.com/apple-arcade/",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "Google Play Pass",
		slug: "google-play-pass",
		url: "https://play.google.com/about/play-pass/",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "Xbox Live Gold",
		slug: "xbox-live-gold",
		url: "https://www.xbox.com/en-US/live/gold",
		category: SUBSCRIPTIONS_CATEGORIES.gaming.slug,
	},
	{
		name: "Heroku",
		slug: "heroku",
		url: "https://www.heroku.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "DigitalOcean",
		slug: "digitalocean",
		url: "https://www.digitalocean.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Amazon Web Services",
		slug: "amazon-web-services",
		url: "https://aws.amazon.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Google Cloud",
		slug: "google-cloud",
		url: "https://cloud.google.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Microsoft Azure",
		slug: "microsoft-azure",
		url: "https://azure.microsoft.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Netlify",
		slug: "netlify",
		url: "https://www.netlify.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Vercel",
		slug: "vercel",
		url: "https://vercel.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Cloudflare",
		slug: "cloudflare",
		url: "https://www.cloudflare.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Fastly",
		slug: "fastly",
		url: "https://www.fastly.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Railway",
		slug: "railway",
		url: "https://railway.app/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Render",
		slug: "render",
		url: "https://render.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Firebase",
		slug: "firebase",
		url: "https://firebase.google.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "MongoDB Atlas",
		slug: "mongodb-atlas",
		url: "https://www.mongodb.com/cloud/atlas",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Google Domains",
		slug: "google-domains",
		url: "https://domains.google/",
		category: SUBSCRIPTIONS_CATEGORIES.domain.slug,
	},
	{
		name: "Namecheap",
		slug: "namecheap",
		url: "https://www.namecheap.com/",
		category: SUBSCRIPTIONS_CATEGORIES.domain.slug,
	},
	{
		name: "OVHcloud",
		slug: "ovhcloud",
		url: "https://www.ovhcloud.com/",
		category: SUBSCRIPTIONS_CATEGORIES.domain.slug,
	},
	{
		name: "Cloudinary",
		slug: "cloudinary",
		url: "https://cloudinary.com/",
		category: SUBSCRIPTIONS_CATEGORIES.cloud.slug,
	},
	{
		name: "Ionos",
		slug: "ionos",
		url: "https://www.ionos.com/",
		category: SUBSCRIPTIONS_CATEGORIES.domain.slug,
	},
] as const;

export const SUBSCRIPTION_TYPES = [
	{
		name: "Monthly",
		slug: "monthly",
	},
	{
		name: "Yearly",
		slug: "yearly",
	},
] as const;

export type SubscriptionsCategories =
	typeof SUBSCRIPTIONS_CATEGORIES[keyof typeof SUBSCRIPTIONS_CATEGORIES];
export type SubscriptionService = typeof SUBSCRIPTION_SERVICES[number];
export type SubscriptionTypes = typeof SUBSCRIPTION_TYPES[number];
export type FieldsetType = {
	id: number | undefined;
	category: SubscriptionsCategories["slug"] | undefined;
	service: SubscriptionService["slug"] | undefined;
	price: number;
	type: SubscriptionTypes["slug"];
};
