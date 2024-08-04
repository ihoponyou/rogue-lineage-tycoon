import { Sex } from "shared/store/slices/identity";
import { RaceGlossary } from "./races";

export const NAMES: { [category: string]: Array<string> } = {
	Azael: [
		"Arumanfi",
		"Asura",
		"Abaddon",
		"Abraxas",
		"Agares",
		"Akkadian",
		"Asmodeus",
		"Astaroth",
		"Baal",
		"Balam",
		"Caim",
		"Cimaris",
		"Diablo",
		"Djal",
		"Dzoa",
		"Eligos",
		"Focalor",
		"Gremory",
		"Halphas",
		"Iblis",
		"Ifrit",
		"Lechies",
		"Malphas",
		"Mammon",
		"Marax",
		"Masih",
		"Mephistopholes",
		"Naamah",
		"Namtar",
		"Naberus",
		"Orcus",
		"Orias",
		"Phenex",
		"Paimon",
		"Raum",
		"Shax",
		"Tannin",
		"Ur",
		"Valac",
		"Vanith",
		"Valefor",
		"Weritas",
		"Wissam",
		"Zagan",
		"Zepar",
	],
	Cameo: [
		"Acedia",
		"Affliction",
		"Agony",
		"Alpha",
		"Andromeda",
		"Beta",
		"Bereft",
		"Cinder",
		"Dark",
		"Delta",
		"Discord",
		"Dissonance",
		"Ember",
		"Empty",
		"End",
		"Epoch",
		"Eternal",
		"Euphoria",
		"Fallen",
		"Fear",
		"Full",
		"Gamma",
		"Glory",
		"Gratitude",
		"Grief",
		"Harmony",
		"Harrow",
		"Hate",
		"Haven",
		"Hollow",
		"Hope",
		"Hopeless",
		"Ire",
		"Joy",
		"Lambda",
		"Lament",
		"Liar",
		"Light",
		"Lost",
		"Lull",
		"Mask",
		"Melody",
		"Mirth",
		"Nadir",
		"Null",
		"Omega",
		"Omicron",
		"Ophiuchus",
		"Orion",
		"Ouroboros",
		"Pleasure",
		"Prime",
		"Prodigy",
		"Requiem",
		"Respite",
		"Rhapsody",
		"Risen",
		"Scourge",
		"Serendipity",
		"Shell",
		"Sigma",
		"Solace",
		"Sorrow",
		"Truth",
		"Unity",
		"Vainglory",
		"Vessel",
		"Zenith",
	],
	Feminine: [
		"Abigail",
		"Ada",
		"Alexandra",
		"Alice",
		"Alvida",
		"Ann",
		"Anna",
		"Anne",
		"April",
		"Ari",
		"Ariel",
		"Auri",
		"Ayra",
		"Azula",
		"Azura",
		"Beatrice",
		"Berta",
		"Beth",
		"Bianca",
		"Blanche",
		"Calypso",
		"Cassandra",
		"Catherine",
		"Catria",
		"Celia",
		"Charlotte",
		"Connie",
		"Cynthia",
		"Dana",
		"Denna",
		"Deirdre",
		"Devi",
		"Diana",
		"Dorothy",
		"Eleanor",
		"Emily",
		"Emma",
		"Erin",
		"Esther",
		"Ethel",
		"Ethlyn",
		"Eva",
		"Eve",
		"Farlyn",
		"Finley",
		"Francesca",
		"Gabriella",
		"Gael",
		"Gemma",
		"Gertrude",
		"Giana",
		"Gillian",
		"Giovanna",
		"Gloria",
		"Grace",
		"Gretchen",
		"Gretel",
		"Hannah",
		"Hecate",
		"Helen",
		"Helena",
		"Hillary",
		"Holly",
		"Iris",
		"Isabel",
		"Isabella",
		"Ivy",
		"Jane",
		"Jennifer",
		"Jemima",
		"Jess",
		"Jessie",
		"Jessica",
		"Joan",
		"Joanna",
		"Juliet",
		"July",
		"June",
		"Katara",
		"Katarina",
		"Kate",
		"Katie",
		"Katherine",
		"Kay",
		"Kayleigh",
		"Korra",
		"Lachesis",
		"Lomberta",
		"Lotte",
		"Lena",
		"Lucile",
		"Lucy",
		"Marceline",
		"Marcille",
		"Margaret",
		"Maria",
		"Maude",
		"May",
		"Mia",
		"Midir",
		"Miranda",
		"Morgan",
		"Nia",
		"Norne",
		"November",
		"Nyna",
		"Olivia",
		"Ophelia",
		"Palla",
		"Patricia",
		"Penny",
		"Quinn",
		"Rachel",
		"Rebecca",
		"Robin",
		"Rose",
		"Ruby",
		"Sabrina",
		"Saffron",
		"Samantha",
		"Sandra",
		"Sarah",
		"Sashenka",
		"Satu",
		"Serena",
		"Sidura",
		"Silvia",
		"Solara",
		"Solveig",
		"Sylvia",
		"Sophie",
		"Susanna",
		"Tabitha",
		"Taliah",
		"Tallulah",
		"Tami",
		"Tanya",
		"Tatiana",
		"Taylor",
		"Thalassa",
		"Theodora",
		"Theresa",
		"Titania",
		"Toph",
		"Tracey",
		"Ulla",
		"Uma",
		"Ursa",
		"Ursula",
		"Usha",
		"Valda",
		"Valencia",
		"Valentina",
		"Valerie",
		"Vanessa",
		"Vega",
		"Victoria",
		"Viola",
		"Violet",
		"Vivian",
		"Wendelin",
		"Wendy",
		"White",
		"Whitney",
		"Willa",
		"Winnie",
		"Xena",
		"Yara",
		"Yana",
		"Yvette",
		"Zemora",
		"Zoe",
		"Zoey",
	],
	GreaterNavaran: [
		"One",
		"Two",
		"Three",
		"Four",
		"Five",
		"Six",
		"Seven",
		"Eight",
		"Nine",
		"Ten",
	],
	Kasparan: [
		"Aelgr",
		"Aslaugr",
		"Atlatr",
		"Atomsk",
		"Audr",
		"Baldr",
		"Bantu",
		"Brymstyrr",
		"Brun",
		"Caldr",
		"Canti",
		"Dagr",
		"Dalris",
		"Dorgr",
		"Drakr",
		"Efried",
		"Elgr",
		"Eir",
		"Fildr",
		"Frigg",
		"Gandr",
		"Gastr",
		"Gundr",
		"Hagon",
		"Himdur",
		"Hurakr",
		"Igg",
		"Ingr",
		"Imdrakr",
		"Jast",
		"Jaldr",
		"Kaspr",
		"Khozen",
		"Landrakr",
		"Martr",
		"Midh",
		"Mir",
		"Morzas",
		"Morva",
		"Nidh",
		"Naradrakr",
		"Ogr",
		"Omanr",
		"Ourobr",
		"Parthr",
		"Raath",
		"Raego",
		"Rargr",
		"Rildrakr",
		"Sagr",
		"Saigr",
		"Sargr",
		"Shul",
		"Tul",
		"Telbrieg",
		"Uthr",
		"Utlieg",
		"Vainr",
		"Van",
		"Vengir",
		"Virgl",
		"Weldrakr",
		"Wygr",
		"Xandir",
		"Xergr",
		"Yaldabaoth",
		"Yaldr",
		"Ygg",
		"Zardr",
		"Zekk",
	],
	LesserNavaran: [
		"Eleven",
		"Twelve",
		"Thirteen",
		"Fourteen",
		"Fifteen",
		"Sixteen",
		"Seventeen",
		"Eighteen",
		"Nineteen",
		"Twenty",
	],
	Lich: [
		"Bone",
		"Vertebrae",
		"Sternum",
		"Rib",
		"Cranium",
		"Occipital",
		"Parietal",
		"Temporal",
		"Frontal",
		"Ethmoid",
		"Maxillae",
		"Lacrimal",
		"Zygomatic",
		"Palatine",
		"Concha",
		"Vomer",
		"Hyoid",
		"Mandible",
		"Malleus",
		"Incus",
		"Stapes",
		"Humerus",
		"Scapula",
		"Clavicle",
		"Ulna",
		"Radius",
		"Carpals",
		"Lunate",
		"Triquetral",
		"Pisiform",
		"Trapezium",
		"Trapezoid",
		"Capitate",
		"Hamate",
		"Metacarpal",
		"Phalanges",
		"Distal",
		"Femur",
		"Patella",
		"Tibia",
		"Fibula",
		"Tarsals",
		"Calcaneus",
		"Talus",
		"Navicular",
		"Cuneiform",
		"Metatarsal",
		"Marrow",
	],
	Masculine: [
		"Aang",
		"Abel",
		"Adam",
		"Abraham",
		"Adrian",
		"Aesop",
		"Agravain",
		"Ahab",
		"Ajax",
		"Alan",
		"Alexander",
		"Alonso",
		"Alphonse",
		"Ambrose",
		"Amir",
		"Amon",
		"Andrew",
		"Angus",
		"Anthony",
		"Antonio",
		"Aristotle",
		"Arthur",
		"Ash",
		"Askeladd",
		"Astram",
		"Attila",
		"Atmere",
		"Austin",
		"Baam",
		"Barnaby",
		"Bartholomew",
		"Balthasar",
		"Beevor",
		"Bertram",
		"Benjamin",
		"Boris",
		"Bors",
		"Black",
		"Blake",
		"Bradley",
		"Brandon",
		"Brent",
		"Brian",
		"Brutus",
		"Bob",
		"Burton",
		"Caesar",
		"Cadogan",
		"Cador",
		"Cain",
		"Caius",
		"Caleb",
		"Caliban",
		"Camus",
		"Cameron",
		"Canute",
		"Carl",
		"Carlyle",
		"Caspian",
		"Cassius",
		"Cedric",
		"Chad",
		"Charles",
		"Christopher",
		"Claude",
		"Claudius",
		"Colt",
		"Connie",
		"Connor",
		"Cornelius",
		"Cuthbert",
		"Dalinar",
		"Damian",
		"Daniel",
		"Devon",
		"Daryl",
		"David",
		"Declan",
		"Derek",
		"Deez",
		"Diego",
		"Dietrich",
		"Dominic",
		"Donovan",
		"Drake",
		"Dustin",
		"Deandre",
		"Deshawn",
		"Dwayne",
		"Dylan",
		"Edward",
		"Edgar",
		"Egbert",
		"Egg",
		"Elbert",
		"Eldigan",
		"Elijah",
		"Elliot",
		"Elodin",
		"Elwyn",
		"Emile",
		"Emmanuel",
		"Eric",
		"Ethan",
		"Etzel",
		"Ezekiel",
		"Ezra",
		"Fabian",
		"Falco",
		"Fang",
		"Faust",
		"Felix",
		"Fenris",
		"Ferdinand",
		"Ferguson",
		"Finley",
		"Finn",
		"Fisher",
		"Fitzgerald",
		"Fox",
		"Francis",
		"Franklin",
		"Fraser",
		"Frederick",
		"Friedrich",
		"Fritz",
		"Gabriel",
		"Gaius",
		"Gaheris",
		"Galahad",
		"Gareth",
		"Garret",
		"Gavin",
		"Gawain",
		"George",
		"Gerald",
		"Gil",
		"Gilbert",
		"Giovania",
		"Grant",
		"Graham",
		"Gregor",
		"Gregory",
		"Grim",
		"Grit",
		"Gunther",
		"Hal",
		"Hamilton",
		"Hamish",
		"Hamlet",
		"Hank",
		"Hannibal",
		"Hans",
		"Harley",
		"Harry",
		"Harold",
		"Harvey",
		"Havelock",
		"Havel",
		"Hawk",
		"Hayes",
		"Heathcliff",
		"Herbert",
		"Hermes",
		"Hershel",
		"Henry",
		"Homer",
		"Horatio",
		"Howl",
		"Hubert",
		"Huey",
		"Hugh",
		"Hugo",
		"Humphrey",
		"Hutch",
		"Iago",
		"Ian",
		"Icarus",
		"Igor",
		"Ike",
		"Isaac",
		"Isaiah",
		"Ivan",
		"Jack",
		"Jacob",
		"Jacques",
		"James",
		"Jason",
		"Jay",
		"Jean",
		"Jenova",
		"Jamaal",
		"Jeffrey",
		"Jegran",
		"John",
		"Jonathan",
		"Joseph",
		"Joshua",
		"Jovanni",
		"Julian",
		"Julius",
		"Kaius",
		"Kaladin",
		"Keith",
		"Kelsier",
		"Kent",
		"Kenneth",
		"Kevin",
		"Kieran",
		"Kirbles",
		"Kirk",
		"Kyle",
		"Laius",
		"Lance",
		"Lancelot",
		"Landrick",
		"Lamorak",
		"Lawrence",
		"Layle",
		"Layton",
		"Lee",
		"Leo",
		"Leonardo",
		"Lewis",
		"Liam",
		"Lloyd",
		"Logan",
		"Ludwig",
		"Luke",
		"Luther",
		"Maes",
		"Malachi",
		"Malcolm",
		"Manfred",
		"Marco",
		"Marcus",
		"Martin",
		"Marquise",
		"Mark",
		"Mason",
		"Matthew",
		"Max",
		"Maximillian",
		"Maximus",
		"Merlin",
		"Micah",
		"Michael",
		"Michalis",
		"Milo",
		"Mordred",
		"Morien",
		"Mustang",
		"Nathan",
		"Neil",
		"Neville",
		"Nicholas",
		"Nikolai",
		"Noah",
		"Oberon",
		"Octavian",
		"Odysseus",
		"Oliver",
		"Orlando",
		"Orpheus",
		"Orsino",
		"Osborne",
		"Oscar",
		"Oswald",
		"Othello",
		"Otto",
		"Owen",
		"Parker",
		"Pascal",
		"Patrick",
		"Pedro",
		"Percival",
		"Peter",
		"Philip",
		"Pierro",
		"Plato",
		"Prospero",
		"Pyron",
		"Quan",
		"Quake",
		"Quentin",
		"Quenton",
		"Ragnar",
		"Ralph",
		"Randolf",
		"Remus",
		"Ricardo",
		"Rickard",
		"Richard",
		"Robert",
		"Robin",
		"Romeo",
		"Romulus",
		"Ronald",
		"Ross",
		"Rowan",
		"Roy",
		"Rupert",
		"Ryan",
		"Ryude",
		"Samson",
		"Samuel",
		"Scar",
		"Scott",
		"Sean",
		"Sebastian",
		"Selim",
		"Sergei",
		"Seth",
		"Shem",
		"Shylock",
		"Siegfried",
		"Siegmund",
		"Sigurd",
		"Simon",
		"Socrates",
		"Sokka",
		"Solomon",
		"Solaire",
		"Sorin",
		"Stanley",
		"Stephen",
		"Stuart",
		"Storm",
		"Sullivan",
		"Sven",
		"Swift",
		"Sylvester",
		"Taborlin",
		"Tarsus",
		"Terrance",
		"Terrell",
		"Thaddeus",
		"Theodore",
		"Theophilus",
		"Thiago",
		"Thomas",
		"Thor",
		"Thorn",
		"Trayvon",
		"Tidus",
		"Timothy",
		"Trevor",
		"Tristan",
		"Tyler",
		"Tyrone",
		"Ulysses",
		"Ulrich",
		"Urban",
		"Uther",
		"Valentine",
		"Victor",
		"Vincent",
		"Virgil",
		"Vlad",
		"Volke",
		"Vulcan",
		"Vyland",
		"Wade",
		"Wallace",
		"Walter",
		"Watson",
		"Wesley",
		"White",
		"Will",
		"William",
		"Wilhelm",
		"Wilson",
		"Winfred",
		"Winston",
		"Wolfram",
		"Woodrow",
		"Xander",
		"Xerxes",
		"Xavier",
		"Ywain",
		"Zachary",
		"Zephyr",
		"Zuko",
	],
	Scroom: [
		"Fung",
		"Funga",
		"Fungabello",
		"Funganissa",
		"Fungard",
		"Fungarina",
		"Fungbert",
		"Fungberto",
		"Fungbeth",
		"Fungdalla",
		"Fungdilla",
		"Fungder",
		"Fungdra",
		"Fungdred",
		"Funge",
		"Fungebob",
		"Fungelot",
		"Fungerina",
		"Fungerine",
		"Fungfried",
		"Fungfact",
		"Fungfung",
		"Fungi",
		"Fungian",
		"Fungiana",
		"Fungilus",
		"Fungimer",
		"Fungissa",
		"Fungissimo",
		"Fungius",
		"Fungjay",
		"Fungjack",
		"Fungjazza",
		"Funglay",
		"Fungler",
		"Funglert",
		"Fungo",
		"Fungopher",
		"Fungolomeo",
		"Fungolomew",
		"Fungolor",
		"Fungolothew",
		"Fungory",
		"Fungria",
		"Fungryo",
		"Fungrath",
		"Fungso",
		"Fungster",
		"Fungstus",
		"Fungtori",
		"Fungterry",
		"Fungtop",
		"Funguel",
		"Fungustus",
		"Fungula",
		"Fungulus",
		"Fungy",
		"Fungyver",
		"Fungyir",
		"Fungzy",
		"Fungzen",
		"Fungzel",
		"Fungza",
	],
	Vind: [
		"Batari",
		"Fukari",
		"Inari",
		"Judari",
		"Kari",
		"Librari",
		"Makari",
		"Melarie",
		"Melkari",
		"Moktari",
		"Musari",
		"Naktari",
		"Pimtari",
		"Rito",
		"Renari",
		"Sukari",
		"Tani",
		"Vaati",
	],
};

export function getRandomFirstName(
	raceName: keyof RaceGlossary,
	sex: Sex,
): string {
	let names: Array<string> = NAMES[raceName];
	if (!names) {
		switch (raceName) {
			case "Metascroom":
				names = NAMES.Scroom;
				break;
			case "Fischeran":
				names = NAMES.Vind;
				break;
			case "Dinakeri":
				names = NAMES.Azael;
				break;
			default:
				names = sex === "Male" ? NAMES.Masculine : NAMES.Feminine;
		}
	}
	return names[math.random(0, names.size() - 1)];
}
