export const abbreviations = {
    "1 Nephi": "bofm/1-ne",
    "2 Nephi": "bofm/2-ne",
    "Jacob": "bofm/jacob",
    "Enos": "bofm/enos",
    "Jarom": "bofm/jarom",
    "Omni": "bofm/omni",
    "Words of Mormon": "bofm/w-of-m",
    "Mosiah": "bofm/mosiah",
    "Alma": "bofm/alma",
    "Helaman": "bofm/hel",
    "3 Nephi": "bofm/3-ne",
    "4 Nephi": "bofm/4-ne",
    "Mormon": "bofm/morm",
    "Ether": "bofm/ether",
    "Moroni": "bofm/moro",
    "Joseph Smith History": "pgp/js-h",
    "Moses": "pgp/moses",
    "Abraham": "pgp/abr",
    "D&C": "dc-testament/dc",
    "Genesis": "ot/gen",
    "Exodus": "ot/ex",
    "Joshua": "ot/josh",
}

export function link(text) {
    for (const name in abbreviations) {
        if (text.match(name)) {
            const link = abbreviations[name]
            const match = text.match(/([0-9]+)(?:(?::([0-9]+))(?:-([0-9]+)))?/)
            if (!match) return
            const [, chapter, start, end] = match
            return `https://www.churchofjesuschrist.org/study/scriptures/${link}/${chapter}${start ? `.p${start}` : ""}${end ? `-${end}` : ""}${start ? `#p${start}` : ""}`
        }
    }
}

// import all from "./come-follow-me-db.js"
// for (const year in all) {
//     const part = all[year]
//     for (const month in part) {
//         const list = part[month]
//         for (const day in list) {
//             const text = list[day]
//             console.log(text, link(text))
//         }
//     }
// }