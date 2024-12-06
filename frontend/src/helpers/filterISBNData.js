export function filterISBNData (response, series, volume) {

    return response.data.filter(item => item.language === "en" && 
                                        item.binding !== "Kindle Edition" && 
                                        item.title.toLowerCase().startsWith(series.toLowerCase()) && 
                                        (
                                            item.title.includes(` ${volume} `)  || 
                                            item.title.includes(` ${volume}:`)  || 
                                            item.title.endsWith(` ${volume}`)   || 
                                            item.title.endsWith(` (${volume})`) || 
                                            item.title.includes(` ${volume}-`)  || 
                                            item.title.includes(`-${volume}-`)  || 
                                            item.title.includes(`-${volume} `)  || 
                                            item.title.endsWith(`-${volume}`)
                                        ) &&
                                        item.authors !== undefined
                               );
}