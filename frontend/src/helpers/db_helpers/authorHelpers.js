import { getData, postData } from "../apiHelpers";

// Change Later: Multiple names or people with more than just their firstname/surname are given to splitName

export function splitName (name) {
    
    let splitter = name.includes(', ') ? ', ' : name.includes('. ') ? '. ' : name.includes(' ') ? ' ' : undefined;

    // Get authors first and last name in respective variables
    if (splitter === ', ') {
        let [first, last] = name.split(splitter)
        return [last, first]
    } else if (splitter === ' ') {
        return name.split(splitter);
    } else if (splitter === '. ') {
        let [first, last] = name.split(splitter)
        first = first + "."
        return [first, last]
    } else {
        return [name]
    }
}

export async function addAuthor (name) {

    if (await authorExists(name)) return false

    const body = { name: name }

    const author_id = await postData('authors', body);

    return author_id.insertedId;
}

export function isAuthorEqual (givenName, itemName) {

    let splitGiven = splitName(givenName)
    let splitItem = splitName(itemName)

    return arraysEqual(splitGiven, splitItem)
}

export async function authorExists (name) {

    const authors = await getData("authors")

    const filteredAuthorData = authors.filter(item => isAuthorEqual(name, item.name))

    return filteredAuthorData[0] !== undefined ? filteredAuthorData[0]._id : false; 
}

export async function getOrAddAuthors (authors) {

    const author_ids = []
    
    for (const author of authors) {

        let author_id = await authorExists(author);

        // if author is not in manga db
        if (!author_id) author_id = await addAuthor(author)
        
        author_ids.push(author_id);
    }

    return author_ids;
}

function arraysEqual (a, b) {

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }